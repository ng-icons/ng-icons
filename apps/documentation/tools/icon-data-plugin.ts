import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import type { Plugin } from 'vite';
import {
  buildIconData,
  discoverIconSets,
  newestSource,
  readVersion,
  setNamesFile,
  variantBodiesFile,
} from './icon-data';

const STATS_ID = 'virtual:icon-stats';

/**
 * Generates the icon browser's data from the workspace's icon packages.
 *
 * The packages together are ~40 MB of SVG, far too much to import into the
 * bundle, so they are written out as static JSON under `src/public` where Vite
 * serves them in dev and copies them in a build:
 *
 *   assets/icons/sets.json                 every set, its variants and counts
 *   assets/icons/<set>.names.json          icon names per variant, for search
 *   assets/icons/<set>.<variant>.json      icon bodies, fetched when rendered
 *
 * It also exposes `virtual:icon-stats` so the prerendered pages can state the
 * real icon count, set count and version instead of hardcoding them.
 *
 * ponytail: one file per variant, so selecting Material Symbols Outline pulls
 * ~3 MB (well compressed, then cached). If that first paint ever matters,
 * shard each variant into fixed-size pages keyed by index in `names.json`.
 */
export function iconData(workspaceRoot: string, appRoot: string): Plugin {
  const outputDir = join(appRoot, 'src/public/assets/icons');
  let stats = { iconCount: 0, setCount: 0, version: '0.0.0' };

  const generate = () => {
    const sources = discoverIconSets(workspaceRoot);
    const version = readVersion(workspaceRoot);
    const setsFile = join(outputDir, 'sets.json');

    if (
      existsSync(setsFile) &&
      statSync(setsFile).mtimeMs > newestSource(sources)
    ) {
      const generated = JSON.parse(
        readFileSync(setsFile, 'utf8'),
      ) as ReturnType<typeof buildIconData>['sets'];
      stats = {
        setCount: generated.length,
        iconCount: generated.reduce((total, set) => total + set.count, 0),
        version,
      };
      return;
    }

    const data = buildIconData(sources);
    mkdirSync(outputDir, { recursive: true });

    for (const set of data.sets) {
      writeFileSync(
        join(outputDir, setNamesFile(set.slug)),
        JSON.stringify(data.names[set.slug]),
      );
      for (const variant of set.variants) {
        writeFileSync(
          join(outputDir, variantBodiesFile(set.slug, variant.id)),
          JSON.stringify(data.bodies[`${set.slug}/${variant.id}`]),
        );
      }
    }

    // Written last, because its mtime is what the check above trusts. Written
    // first, an interrupted build would leave a fresh `sets.json` alongside
    // missing icon files and every later build would skip regenerating them.
    writeFileSync(setsFile, JSON.stringify(data.sets));

    stats = {
      setCount: data.sets.length,
      iconCount: data.sets.reduce((total, set) => total + set.count, 0),
      version,
    };
  };

  return {
    name: 'ng-icons:icon-data',
    enforce: 'pre',
    buildStart: generate,
    resolveId: id => (id === STATS_ID ? `\0${STATS_ID}` : null),
    load(id) {
      if (id !== `\0${STATS_ID}`) {
        return null;
      }
      return `export const iconStats = ${JSON.stringify(stats)};`;
    },
  };
}
