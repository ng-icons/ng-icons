import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as ts from 'typescript';

/**
 * These tests type-check real programs with the TypeScript compiler API rather
 * than asserting on types at compile time, because the thing under test is what
 * an *installed* set of packages does to `IconName` - which only exists once
 * more than one file is in the same program.
 *
 * `@ng-icons/core` is mapped to `icon-name.ts` alone rather than to the real
 * package entry point: the icon packages augment the module specifier, and
 * pointing it at the one file that owns the types keeps `@angular/core` out of
 * the fixture program.
 */

const CORE_TYPES = fileURLToPath(new URL('./icon-name.ts', import.meta.url));

const packageSource = (path: string): string =>
  readFileSync(
    fileURLToPath(new URL(`../../../../../${path}`, import.meta.url)),
    'utf8',
  );

/** A real generated icon package, augmentation and all. */
const MONO_ICONS = packageSource('mono-icons/src/index.ts');
const FEATHER_ICONS = packageSource('feather-icons/src/index.ts');

const COMPILER_OPTIONS: ts.CompilerOptions = {
  strict: true,
  noEmit: true,
  skipLibCheck: true,
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  baseUrl: '/',
  paths: { '@ng-icons/core': ['core.ts'] },
};

interface Fixture {
  /** Semantic and syntactic errors reported across every file in the program. */
  errors: string[];
  /** Completions offered where `main.ts` contains the `¦` marker. */
  completions: string[];
}

/**
 * Type-check a program made of the real `icon-name.ts`, the given package
 * sources, and a `main.ts` standing in for consumer code. A `¦` in `main` marks
 * the position completions are requested from.
 */
function check(main: string, packages: Record<string, string> = {}): Fixture {
  const marker = main.indexOf('¦');
  const mainSource = main.replace('¦', '');

  const files: Record<string, string> = {
    '/core.ts': readFileSync(CORE_TYPES, 'utf8'),
    '/main.ts': mainSource,
    ...Object.fromEntries(
      Object.entries(packages).map(([name, source]) => [`/${name}`, source]),
    ),
  };

  const host: ts.LanguageServiceHost = {
    // `core.ts` is deliberately not a root file. It stands in for an installed
    // `@ng-icons/core`, which only enters a program because something imports
    // it - the condition a module augmentation has to satisfy.
    getScriptFileNames: () =>
      Object.keys(files).filter(fileName => fileName !== '/core.ts'),
    getScriptVersion: () => '1',
    getScriptSnapshot: fileName =>
      fileName in files
        ? ts.ScriptSnapshot.fromString(files[fileName])
        : ts.sys.fileExists(fileName)
          ? ts.ScriptSnapshot.fromString(ts.sys.readFile(fileName)!)
          : undefined,
    getCurrentDirectory: () => '/',
    getCompilationSettings: () => COMPILER_OPTIONS,
    getDefaultLibFileName: options => ts.getDefaultLibFilePath(options),
    fileExists: fileName => fileName in files || ts.sys.fileExists(fileName),
    readFile: fileName => files[fileName] ?? ts.sys.readFile(fileName),
    readDirectory: ts.sys.readDirectory,
    directoryExists: ts.sys.directoryExists,
    getDirectories: ts.sys.getDirectories,
  };

  const service = ts.createLanguageService(host);

  // Every file, not just `main.ts`: a package's augmentation can only fail in
  // the package's own file, which is exactly how it breaks the library build.
  const errors = Object.keys(files)
    .flatMap(fileName => [
      ...service.getSemanticDiagnostics(fileName),
      ...service.getSyntacticDiagnostics(fileName),
    ])
    .map(diagnostic =>
      ts.flattenDiagnosticMessageText(diagnostic.messageText, ' '),
    );

  const completions =
    marker === -1
      ? []
      : (service
          .getCompletionsAtPosition('/main.ts', marker, {})
          ?.entries.map(entry => entry.name) ?? []);

  return { errors, completions };
}

describe('IconName', () => {
  it('should be empty when no icon package is imported', () => {
    const { errors } = check(`
      import type { IconName } from '@ng-icons/core';
      export const name: IconName = 'monoAdd';
    `);

    expect(errors).toEqual([
      `Type '"monoAdd"' is not assignable to type 'never'.`,
    ]);
  });

  it('should contain the icons of an imported package', () => {
    const { errors } = check(
      `
      import type { IconName } from '@ng-icons/core';
      import { monoAdd } from './mono';
      void monoAdd;
      export const name: IconName = 'monoAdd';
    `,
      { 'mono.ts': MONO_ICONS },
    );

    expect(errors).toEqual([]);
  });

  it('should not contain the icons of a package that is not imported', () => {
    const { errors } = check(
      `
      import type { IconName } from '@ng-icons/core';
      import { monoAdd } from './mono';
      void monoAdd;
      export const name: IconName = 'featherAirplay';
    `,
      { 'mono.ts': MONO_ICONS },
    );

    expect(errors).toEqual([
      expect.stringContaining(
        `Type '"featherAirplay"' is not assignable to type`,
      ),
    ]);
  });

  it('should compose the icons of every imported package', () => {
    const { errors } = check(
      `
      import type { IconName } from '@ng-icons/core';
      import { monoAdd } from './mono';
      import { featherAirplay } from './feather';
      void monoAdd;
      void featherAirplay;
      export const a: IconName = 'monoAdd';
      export const b: IconName = 'featherAirplay';
    `,
      { 'mono.ts': MONO_ICONS, 'feather.ts': FEATHER_ICONS },
    );

    expect(errors).toEqual([]);
  });

  it('should merge names declared by more than one package', () => {
    // `@ng-icons/material-icons` and `@ng-icons/material-symbols` both export
    // `mat*` names. Declaration merging rejects a member redeclared with a
    // different type, so this only holds while every member is `true`.
    const augmentation = (name: string) => `
      declare module '@ng-icons/core' {
        interface NgIconNameMap {
          ${name}: true;
        }
      }
      export const ${name} = '<svg></svg>';
    `;

    const { errors } = check(
      `
      import type { IconName } from '@ng-icons/core';
      import { mat10kOutline as a } from './material-icons';
      import { mat10kOutline as b } from './material-symbols';
      void a;
      void b;
      export const name: IconName = 'mat10kOutline';
    `,
      {
        'material-icons.ts': augmentation('mat10kOutline'),
        'material-symbols.ts': augmentation('mat10kOutline'),
      },
    );

    expect(errors).toEqual([]);
  });

  it('should be contributed by a package that nothing else pulls core into', () => {
    // How the library build breaks: TypeScript rejects an augmentation whose
    // target is merely resolvable rather than present in the program, so each
    // package has to bring `@ng-icons/core` into the program itself.
    const { errors } = check('export {};', { 'mono.ts': MONO_ICONS });

    expect(errors).toEqual([]);
  });

  it('should accept names contributed by a consumer for their own icons', () => {
    const { errors } = check(`
      import type { IconName } from '@ng-icons/core';

      declare module '@ng-icons/core' {
        interface NgIconNameMap {
          myCompanyLogo: true;
        }
      }

      export const name: IconName = 'myCompanyLogo';
    `);

    expect(errors).toEqual([]);
  });
});

describe('the declaration emitted for NgIcon', () => {
  it('should keep the name input typed as IconType', () => {
    // With no package installed `IconName` is `never`, and `never | (string &
    // {})` reduces to `string & {}`. If the input's type is left to inference,
    // that reduced type - not the alias - is what declaration emit writes into
    // the published `.d.ts`, and every consumer's `<ng-icon name="">`
    // autocomplete is gone no matter what they install. An explicit annotation
    // makes the emitter write the alias by name instead.
    const component = fileURLToPath(
      new URL('./icon.component.ts', import.meta.url),
    );

    let declaration = '';
    const program = ts.createProgram([component], {
      ...COMPILER_OPTIONS,
      baseUrl: undefined,
      paths: undefined,
      noEmit: false,
      declaration: true,
      emitDeclarationOnly: true,
      experimentalDecorators: true,
    });

    program.emit(undefined, (fileName, text) => {
      if (fileName.endsWith('icon.component.d.ts')) {
        declaration = text;
      }
    });

    const name = declaration
      .split('\n')
      .find(line => line.includes('readonly name'));

    expect(name).toContain('IconType');
  });
});

describe('IconType', () => {
  it('should accept an arbitrary string so loaders and custom sets still work', () => {
    const { errors } = check(`
      import type { IconType } from '@ng-icons/core';
      export const name: IconType = 'some-icon-from-a-loader';
    `);

    expect(errors).toEqual([]);
  });

  it('should accept an alias registered against an installed icon', () => {
    const { errors } = check(
      `
      import type { IconType } from '@ng-icons/core';
      import { monoAdd } from './mono';
      void monoAdd;
      export const name: IconType = 'plus';
    `,
      { 'mono.ts': MONO_ICONS },
    );

    expect(errors).toEqual([]);
  });

  it('should not widen away the names of installed packages', () => {
    const { completions } = check(
      `
      import type { IconType } from '@ng-icons/core';
      import { monoAdd } from './mono';
      void monoAdd;
      export const name: IconType = '¦';
    `,
      { 'mono.ts': MONO_ICONS },
    );

    expect(completions).toContain('monoAdd');
  });
});

describe('autocomplete', () => {
  it('should offer the icons of every imported package', () => {
    const { completions } = check(
      `
      import type { IconType } from '@ng-icons/core';
      import { monoAdd } from './mono';
      import { featherAirplay } from './feather';
      void monoAdd;
      void featherAirplay;
      export const name: IconType = '¦';
    `,
      { 'mono.ts': MONO_ICONS, 'feather.ts': FEATHER_ICONS },
    );

    expect(completions).toContain('monoAdd');
    expect(completions).toContain('featherAirplay');
  });

  it('should not offer the icons of a package that is not imported', () => {
    const { completions } = check(
      `
      import type { IconType } from '@ng-icons/core';
      import { monoAdd } from './mono';
      void monoAdd;
      export const name: IconType = '¦';
    `,
      { 'mono.ts': MONO_ICONS },
    );

    expect(completions).toContain('monoAdd');
    expect(completions).not.toContain('featherAirplay');
  });

  it('should offer nothing when no icon package is imported', () => {
    const { completions } = check(`
      import type { IconType } from '@ng-icons/core';
      export const name: IconType = '¦';
    `);

    expect(completions).toEqual([]);
  });

  it('should offer names a consumer contributed for their own icons', () => {
    const { completions } = check(`
      import type { IconType } from '@ng-icons/core';

      declare module '@ng-icons/core' {
        interface NgIconNameMap {
          myCompanyLogo: true;
        }
      }

      export const name: IconType = '¦';
    `);

    expect(completions).toContain('myCompanyLogo');
  });
});
