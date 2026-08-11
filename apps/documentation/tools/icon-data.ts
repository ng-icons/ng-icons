import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { SET_META } from './set-meta';

/** The variant id used for a package's root entry point, e.g. `@ng-icons/lucide`. */
export const ROOT_VARIANT = 'default';

export interface IconVariantSource {
  /** `default` for the root entry, otherwise the subpath, e.g. `outline`. */
  id: string;
  /** The import path a consumer writes, e.g. `@ng-icons/heroicons/outline`. */
  subpath: string;
  /** Absolute path of the generated `index.ts` for this entry point. */
  file: string;
}

export interface IconSetSource {
  slug: string;
  pkg: string;
  variants: IconVariantSource[];
}

export interface IconVariant {
  id: string;
  subpath: string;
  count: number;
}

export interface IconSet {
  slug: string;
  name: string;
  pkg: string;
  website?: string;
  license: string;
  count: number;
  variants: IconVariant[];
}

/** One set's icon names, grouped by variant, in declaration order. */
export type SetNames = Record<string, string[]>;

/** One variant's icon bodies, keyed by icon name. */
export type VariantBodies = Record<string, string>;

/**
 * Interpret the escape sequences TypeScript emits inside a template literal.
 *
 * The entry points are read as source text rather than imported, so a tab in an
 * SVG arrives here as the two characters `\` and `t`. Left as-is they end up
 * inside path data, where a backslash is not a valid command or number: the
 * browser stops parsing at that point and the icon renders half-drawn. The
 * `svg-to-ts` generator emits through TypeScript's printer, which escapes every
 * control character, so any set whose source SVGs had formatted path data is
 * affected (UX Aspects and Dripicons most visibly).
 */
export function unescapeTemplateLiteral(raw: string): string {
  return raw.replace(
    /\\(u\{[0-9a-fA-F]+\}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{2}|\r\n|[\s\S])/g,
    (_, sequence: string) => {
      switch (sequence[0]) {
        case 'n':
          return '\n';
        case 'r':
          return '\r';
        case 't':
          return '\t';
        case 'b':
          return '\b';
        case 'f':
          return '\f';
        case 'v':
          return '\v';
        case '0':
          return '\0';
        case 'x':
          return String.fromCodePoint(parseInt(sequence.slice(1), 16));
        case 'u':
          return String.fromCodePoint(
            parseInt(sequence.replace(/[u{}]/g, ''), 16),
          );
        // A backslash before a newline is a line continuation: both go away.
        case '\n':
        case '\r':
          return '';
        // \\ \` \$ and anything else stand for the character itself.
        default:
          return sequence;
      }
    },
  );
}

/**
 * Pull the icon constants out of a generated icon-set entry point.
 *
 * The files are emitted by the `svg-to-ts` generator as one
 * `export const name = `<svg …>`;` per line, so a line-wise match is exact. The
 * body pattern steps over escape pairs so an escaped backtick cannot end the
 * match early, and the captured text is unescaped to the value TypeScript would
 * have compiled.
 *
 * Values that aren't SVG are skipped, which drops non-icon exports such as the
 * glyphset helpers in `@ng-icons/material-symbols`. Some sets (Dripicons) carry
 * an XML declaration before the `<svg`, so the check is a contains rather than a
 * starts-with.
 */
export function parseIconExports(source: string): VariantBodies {
  const icons: VariantBodies = {};
  const pattern =
    /^export const ([A-Za-z0-9_$]+) = `((?:[^`\\]|\\[\s\S])*)`;$/gm;
  for (const [, name, body] of source.matchAll(pattern)) {
    if (body.includes('<svg')) {
      icons[name] = unescapeTemplateLiteral(body);
    }
  }
  return icons;
}

const NON_ICON_PACKAGES = new Set([
  '@ng-icons/core',
  '@ng-icons/schematics',
  '@ng-icons/workspace-plugin',
]);

/**
 * Discover every icon-set entry point from the workspace's TypeScript path
 * mappings, which are generated alongside the packages and so always current.
 */
export function discoverIconSets(workspaceRoot: string): IconSetSource[] {
  const tsconfig = readFileSync(
    join(workspaceRoot, 'tsconfig.base.json'),
    'utf8',
  );
  const paths: Record<string, string[]> = JSON.parse(
    tsconfig.replace(/^\s*\/\/.*$/gm, ''),
  ).compilerOptions.paths;

  const sets = new Map<string, IconSetSource>();

  for (const [importPath, [target]] of Object.entries(paths)) {
    const segments = importPath.split('/');
    const pkg = segments.slice(0, 2).join('/');
    if (!importPath.startsWith('@ng-icons/') || NON_ICON_PACKAGES.has(pkg)) {
      continue;
    }

    const file = join(workspaceRoot, target);
    if (!existsSync(file)) {
      continue;
    }

    const slug = pkg.slice('@ng-icons/'.length);
    const set = sets.get(pkg) ?? { slug, pkg, variants: [] };
    set.variants.push({
      id: segments.length > 2 ? segments.slice(2).join('/') : ROOT_VARIANT,
      subpath: importPath,
      file,
    });
    sets.set(pkg, set);
  }

  return [...sets.values()];
}

export interface IconData {
  sets: IconSet[];
  /** `slug -> names by variant` */
  names: Record<string, SetNames>;
  /** `slug/variantId -> icon bodies` */
  bodies: Record<string, VariantBodies>;
}

/** Read every discovered entry point and shape it into the files we serve. */
export function buildIconData(sources: IconSetSource[]): IconData {
  const data: IconData = { sets: [], names: {}, bodies: {} };

  for (const source of sources) {
    const meta = SET_META[source.pkg];
    const variants: IconVariant[] = [];
    const names: SetNames = {};

    for (const variant of source.variants) {
      const icons = parseIconExports(readFileSync(variant.file, 'utf8'));
      const iconNames = Object.keys(icons);
      if (iconNames.length === 0) {
        continue;
      }
      variants.push({
        id: variant.id,
        subpath: variant.subpath,
        count: iconNames.length,
      });
      names[variant.id] = iconNames;
      data.bodies[`${source.slug}/${variant.id}`] = icons;
    }

    if (variants.length === 0) {
      continue;
    }

    variants.sort((a, b) => a.id.localeCompare(b.id));
    data.sets.push({
      slug: source.slug,
      name: meta?.name ?? titleCase(source.slug),
      pkg: source.pkg,
      website: meta?.website,
      license: meta?.license ?? 'See project',
      count: variants.reduce((total, variant) => total + variant.count, 0),
      variants,
    });
    data.names[source.slug] = names;
  }

  data.sets.sort((a, b) => b.count - a.count);
  return data;
}

function titleCase(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Newest mtime across everything the generated data is derived from.
 *
 * The entry points are the bulk of it, but not all: the display names, websites
 * and licences come from `set-meta.ts`, and which entry points exist at all comes
 * from `tsconfig.base.json`. Keyed on the entry points alone, editing a set's
 * name left the old `sets.json` in place and the site showed stale metadata
 * until the directory was deleted by hand.
 */
export function newestSource(
  sources: IconSetSource[],
  workspaceRoot?: string,
): number {
  let newest = 0;

  for (const source of sources) {
    for (const variant of source.variants) {
      newest = Math.max(newest, statSync(variant.file).mtimeMs);
    }
  }

  for (const path of [
    join(__dirname, 'set-meta.ts'),
    ...(workspaceRoot ? [join(workspaceRoot, 'tsconfig.base.json')] : []),
  ]) {
    if (existsSync(path)) {
      newest = Math.max(newest, statSync(path).mtimeMs);
    }
  }

  return newest;
}

/** Every file the current dataset should consist of, for pruning what it should not. */
export function expectedFiles(sets: IconSet[]): string[] {
  return [
    'sets.json',
    ...sets.flatMap(set => [
      setNamesFile(set.slug),
      ...set.variants.map(variant => variantBodiesFile(set.slug, variant.id)),
    ]),
  ];
}

/** The version the packages are published at, shown in the header. */
export function readVersion(workspaceRoot: string): string {
  const pkg = join(workspaceRoot, 'packages/core/package.json');
  return JSON.parse(readFileSync(pkg, 'utf8')).version;
}

export const setNamesFile = (slug: string) => `${slug}.names.json`;
export const variantBodiesFile = (slug: string, variant: string) =>
  `${slug}.${variant.replace(/\//g, '-')}.json`;
