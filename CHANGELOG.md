# 36.0.0 (2026-09-02)

### 🚀 Features

- ⚠️  **core:** scope IconName to the icon packages you install ([#272](https://github.com/ng-icons/ng-icons/pull/272), [#243](https://github.com/ng-icons/ng-icons/issues/243))

### ⚠️  Breaking Changes

- **core:** scope IconName to the icon packages you install  ([#272](https://github.com/ng-icons/ng-icons/pull/272), [#243](https://github.com/ng-icons/ng-icons/issues/243))
  IconName no longer contains every icon ng-icons ships, only
  the ones you import. Annotating a value as IconName with a name from a set
  you have not installed is now an error; the ng-icon name input still accepts
  any string.
  * feat(core): fall back to string when no icon package contributes a name
  `keyof` an empty NgIconNameMap is `never`, which made every IconName
  annotation an error in a project that legitimately has no icon package, such
  as one rendering everything through an icon loader.
  Making the fallback a conditional also stops the union in IconType reducing
  when the map is empty, which fixes a second and quieter problem outside this
  repository: a library wrapping ng-icon that writes input<IconType>() rather
  than annotating would otherwise bake the reduced type into its own .d.ts and
  cost its consumers their autocomplete, with nothing to warn it.
  Adds the guards for the failure modes that stay silent:
  - the emitted declaration keeps the IconType alias for an inferring library
  - every icon package declares the @ng-icons/core peer dependency, which is
    what stops a package manager resolving a second copy of core and detaching
    the augmentation from the core the application imports
  - a post-build check that ng-packagr still carries each entry point's
    declare module block into the published types
  * docs: explain IconName and IconType, and the editor reload caveat
  The two types answer different questions and neither was documented. Also
  notes that a newly imported set's names arrive through a type declaration,
  which editors do not always pick up until the TypeScript server restarts.
  * fix(repo): stage the files the pre-commit hook formats
  The hook runs `nx format:write`, which rewrites files in the working tree
  but does not stage them. For any staged file that needed formatting the
  commit therefore kept the unformatted version and left the formatted one
  behind as an unstaged change, so CI failed `format:check` on exactly what
  the hook had just fixed.
  Only paths that were already staged are re-added, so the hook still cannot
  pull unrelated work into a commit.
  * fix(ci): stop the release workflow failing on a redundant commit step
  Every release since #243 has finished with a red X. The release itself
  succeeded each time: nx release changelog commits, tags, pushes and creates
  the GitHub Release, so by the time the hand-written 'Commit and tag release'
  step ran there was nothing left to commit and git exited 1.
  #243 moved createRelease into nx.json, which turned on those git operations,
  but kept the step that had been doing them by hand. Removing it lets the run
  report what actually happened, and stops a genuine future failure being lost
  among runs that are always red.
  Push to main stays as a no-op safety net in case that push is ever disabled."
  M	.github/workflows/ci.yml
  M	.github/workflows/release.yml
  M	.husky/pre-commit
  M	apps/documentation/src/content/reference/ng-icon-component.md
  M	apps/documentation/src/content/reference/registering-icons.md
  M	packages/akar-icons/package.json
  M	packages/akar-icons/src/index.ts
  M	packages/bootstrap-icons/package.json
  M	packages/bootstrap-icons/src/index.ts
  M	packages/boxicons/logos/src/index.ts
  M	packages/boxicons/package.json
  M	packages/boxicons/regular/src/index.ts
  M	packages/boxicons/solid/src/index.ts
  M	packages/circum-icons/package.json
  M	packages/circum-icons/src/index.ts
  M	packages/coolicons/package.json
  M	packages/coolicons/src/index.ts
  M	packages/core/eslint.config.js
  M	packages/core/src/lib/components/icon/icon-name.ts
  A	packages/core/src/lib/components/icon/icon-name.type-spec.ts
  M	packages/core/src/lib/components/icon/icon-theming.spec.ts
  M	packages/core/src/lib/components/icon/icon.component.spec.ts
  M	packages/core/src/lib/components/icon/icon.component.ts
  M	packages/core/vite.config.mts
  M	packages/cryptocurrency-icons/colored/src/index.ts
  M	packages/cryptocurrency-icons/package.json
  M	packages/cryptocurrency-icons/src/index.ts
  M	packages/css-gg/package.json
  M	packages/css-gg/src/index.ts
  M	packages/devicon/line/src/index.ts
  M	packages/devicon/original/src/index.ts
  M	packages/devicon/package.json
  M	packages/devicon/plain/src/index.ts
  M	packages/dripicons/package.json
  M	packages/dripicons/src/index.ts
  M	packages/feather-icons/package.json
  M	packages/feather-icons/src/index.ts
  M	packages/flag-icons/package.json
  M	packages/flag-icons/square/src/index.ts
  M	packages/flag-icons/src/index.ts
  M	packages/fluent-ui/filled/src/index.ts
  M	packages/fluent-ui/package.json
  M	packages/fluent-ui/src/index.ts
  M	packages/font-awesome/brands/src/index.ts
  M	packages/font-awesome/package.json
  M	packages/font-awesome/regular/src/index.ts
  M	packages/font-awesome/solid/src/index.ts
  M	packages/game-icons/package.json
  M	packages/game-icons/src/index.ts
  M	packages/heroicons/micro/src/index.ts
  M	packages/heroicons/mini/src/index.ts
  M	packages/heroicons/outline/src/index.ts
  M	packages/heroicons/package.json
  M	packages/heroicons/solid/src/index.ts
  M	packages/huge-icons/package.json
  M	packages/huge-icons/src/index.ts
  M	packages/iconoir/package.json
  M	packages/iconoir/regular/src/index.ts
  M	packages/iconoir/solid/src/index.ts
  M	packages/iconsax/bold/src/index.ts
  M	packages/iconsax/bulk/src/index.ts
  M	packages/iconsax/outline/src/index.ts
  M	packages/iconsax/package.json
  M	packages/ionicons/package.json
  M	packages/ionicons/src/index.ts
  M	packages/jam-icons/package.json
  M	packages/jam-icons/src/index.ts
  M	packages/keyline-icons/duotone/src/index.ts
  M	packages/keyline-icons/fill/src/index.ts
  M	packages/keyline-icons/package.json
  M	packages/keyline-icons/src/index.ts
  M	packages/lets-icons/duotone-line/src/index.ts
  M	packages/lets-icons/duotone/src/index.ts
  M	packages/lets-icons/fill/src/index.ts
  M	packages/lets-icons/light/src/index.ts
  M	packages/lets-icons/package.json
  M	packages/lets-icons/regular/src/index.ts
  M	packages/lobe-icons/color/src/index.ts
  M	packages/lobe-icons/package.json
  M	packages/lobe-icons/src/index.ts
  M	packages/lucide/package.json
  M	packages/lucide/src/index.ts
  M	packages/material-file-icons/colored/src/index.ts
  M	packages/material-file-icons/package.json
  M	packages/material-file-icons/uncolored/src/index.ts
  M	packages/material-icons/baseline/src/index.ts
  M	packages/material-icons/outline/src/index.ts
  M	packages/material-icons/package.json
  M	packages/material-icons/round/src/index.ts
  M	packages/material-icons/sharp/src/index.ts
  M	packages/material-symbols/outline/src/index.ts
  M	packages/material-symbols/round/src/index.ts
  M	packages/material-symbols/sharp/src/index.ts
  M	packages/mono-icons/package.json
  M	packages/mono-icons/src/index.ts
  M	packages/mynaui/outline/src/index.ts
  M	packages/mynaui/package.json
  M	packages/mynaui/solid/src/index.ts
  M	packages/octicons/large/src/index.ts
  M	packages/octicons/package.json
  M	packages/octicons/src/index.ts
  M	packages/phosphor-icons/bold/src/index.ts
  M	packages/phosphor-icons/duotone/src/index.ts
  M	packages/phosphor-icons/fill/src/index.ts
  M	packages/phosphor-icons/light/src/index.ts
  M	packages/phosphor-icons/package.json
  M	packages/phosphor-icons/regular/src/index.ts
  M	packages/phosphor-icons/thin/src/index.ts
  M	packages/primeicons/package.json
  M	packages/primeicons/src/index.ts
  M	packages/radix-icons/package.json
  M	packages/radix-icons/src/index.ts
  M	packages/reicon/duotone/src/index.ts
  M	packages/reicon/fill/src/index.ts
  M	packages/reicon/package.json
  M	packages/reicon/src/index.ts
  M	packages/remixicon/package.json
  M	packages/remixicon/src/index.ts
  M	packages/simple-icons/package.json
  M	packages/simple-icons/src/index.ts
  M	packages/solar-icons/bold-duotone/src/index.ts
  M	packages/solar-icons/bold/src/index.ts
  M	packages/solar-icons/broken/src/index.ts
  M	packages/solar-icons/duotone/src/index.ts
  M	packages/solar-icons/linear/src/index.ts
  M	packages/solar-icons/outline/src/index.ts
  M	packages/solar-icons/package.json
  M	packages/svgl/package.json
  M	packages/svgl/src/index.ts
  M	packages/tabler-icons/fill/src/index.ts
  M	packages/tabler-icons/package.json
  M	packages/tabler-icons/src/index.ts
  M	packages/tdesign-icons/package.json
  M	packages/tdesign-icons/src/index.ts
  M	packages/typicons/package.json
  M	packages/typicons/src/index.ts
  M	packages/ux-aspects/package.json
  M	packages/ux-aspects/src/index.ts
  A	tools/check-published-icon-types.mjs
  M	tools/workspace-plugin/src/generators/icon-library/utils/add-package-json-fields.ts
  A	tools/workspace-plugin/src/generators/svg-to-ts/icon-name-augmentation.spec.ts
  A	tools/workspace-plugin/src/generators/svg-to-ts/icon-name-augmentation.ts
  A	tools/workspace-plugin/src/generators/svg-to-ts/icon-packages.spec.ts
  M	tools/workspace-plugin/src/generators/svg-to-ts/index.ts

### ❤️ Thank You

- Ashley Hunter

## 35.1.0 (2026-08-27)

### 🚀 Features

- **core:** add Keyline Icons and Reicon ([#269](https://github.com/ng-icons/ng-icons/pull/269))
- **documentation:** rebuild the docs site with AnalogJS ([#265](https://github.com/ng-icons/ng-icons/pull/265))

### ❤️ Thank You

- Ashley Hunter

## 35.0.1 (2026-08-06)

### 🩹 Fixes

- **core:** repair ng-add packaging ([#264](https://github.com/ng-icons/ng-icons/pull/264))

### ❤️ Thank You

- Ashley Hunter

# 35.0.0 (2026-08-06)

### 🩹 Fixes

- address review feedback on Angular v22 upgrade ([#263](https://github.com/ng-icons/ng-icons/pull/263), [#262](https://github.com/ng-icons/ng-icons/issues/262))

### ❤️ Thank You

- Ashley Hunter

# 34.0.0 (2026-07-09)

### 🚀 Features

- **icons:** update icon sets to latest upstream versions ([#258](https://github.com/ng-icons/ng-icons/pull/258))
- **lucide:** update to v1.23 ([#256](https://github.com/ng-icons/ng-icons/pull/256))

### 🩹 Fixes

- unblock release (peer-dep ranges) and remove broken nx distribution ([#260](https://github.com/ng-icons/ng-icons/pull/260))

### 🔥 Performance

- **ci:** speed up CI - pin sources, cache playwright, drift-check icons ([#259](https://github.com/ng-icons/ng-icons/pull/259))

### ❤️ Thank You

- Ashley Hunter
- Marc Stammerjohann @marcjulian

## 33.4.0 (2026-07-07)

### 🚀 Features

- **core:** add PrimeIcons ([#254](https://github.com/ng-icons/ng-icons/pull/254))

### ❤️ Thank You

- Ashley Hunter

## 33.3.0 (2026-06-20)

### 🚀 Features

- **core:** add Fluent UI icons ([#252](https://github.com/ng-icons/ng-icons/pull/252))

### ❤️ Thank You

- Ashley Hunter

## 33.2.4 (2026-06-12)

### 🩹 Fixes

- **core:** restore inline style on root svg element when CSP is enabled ([#250](https://github.com/ng-icons/ng-icons/pull/250), [#246](https://github.com/ng-icons/ng-icons/issues/246))

### ❤️ Thank You

- Ashley Hunter

## 33.2.3 (2026-05-29)

### 🩹 Fixes

- **iconoir:** split regular and solid into separate entry points ([#249](https://github.com/ng-icons/ng-icons/pull/249), [#248](https://github.com/ng-icons/ng-icons/issues/248))

### ❤️ Thank You

- Ashley Hunter

## 33.2.2 (2026-04-20)

### 🩹 Fixes

- **docs:** disable Google Fonts inlining in production build ([#244](https://github.com/ng-icons/ng-icons/pull/244))
- **material-symbols:** correct icon name generation and regenerate exports ([#245](https://github.com/ng-icons/ng-icons/pull/245))

### ❤️ Thank You

- Ashley Hunter
- Claude
- Claude Opus 4.6 (1M context)

## 33.2.1 (2026-04-12)

### 🚀 Features

- **core:** add Lobe Icons and remove Jest dependencies ([#236](https://github.com/ng-icons/ng-icons/pull/236))

### 🩹 Fixes

- add repository field to schematics and material-symbols packages ([#241](https://github.com/ng-icons/ng-icons/pull/241))
- correct package versions and commit release changes ([#242](https://github.com/ng-icons/ng-icons/pull/242))
- remove stale peerDependency and fix release changelog configuration ([#243](https://github.com/ng-icons/ng-icons/pull/243))
- **lobe-icons:** remove custom release config blocking nx release version ([#240](https://github.com/ng-icons/ng-icons/pull/240))
- **solar-icons:** #237 - honor currentColor in Line Duotone variant ([#238](https://github.com/ng-icons/ng-icons/pull/238), [#237](https://github.com/ng-icons/ng-icons/issues/237))

### ❤️ Thank You

- Ashley Hunter
- Claude
- Claude Opus 4.6 (1M context)

# 33.0.0 (2025-11-21)

### 🚀 Features

- angular 21 ([#214](https://github.com/ng-icons/ng-icons/pull/214))

### ❤️ Thank You

- Ashley Hunter

## 32.5.0 (2025-11-18)

This was a version bump only, there were no code changes.

## 32.4.0 (2025-11-07)

- fix: resolve angular 20 localization extraction issue ([#209](https://github.com/ng-icons/ng-icons/pull/209))

### ❤️ Thank You

- Florian Sey @sey

## 32.3.0 (2025-11-04)

### 🩹 Fixes

- icons with ids ([#206](https://github.com/ng-icons/ng-icons/pull/206))

### ❤️ Thank You

- Ashley Hunter

## 32.2.0 (2025-10-13)

### 🚀 Features

- update lucide ([0020400](https://github.com/ng-icons/ng-icons/commit/0020400))

### ❤️ Thank You

- Ashley Hunter

## 32.1.0 (2025-07-20)

### 🚀 Features

- auto-scroll to info section when iconset is selected ([#191](https://github.com/ng-icons/ng-icons/pull/191))

- fix iconsax type

### ❤️ Thank You

- Jeevan @JeevanMahesha
- @lprevidente

# 32.0.0 (2025-06-09)

### 🚀 Features

- add angular v20 support ([#186](https://github.com/ng-icons/ng-icons/pull/186))
- icon updates ([#187](https://github.com/ng-icons/ng-icons/pull/187))

### ❤️ Thank You

- Ashley Hunter
- Jeevan Mahesha

## 31.4.0 (2025-05-14)

### 🚀 Features

- heroicons micro ([#184](https://github.com/ng-icons/ng-icons/pull/184))

### ❤️ Thank You

- Ashley Hunter

## 31.3.0 (2025-04-16)

This was a version bump only, there were no code changes.

## 31.2.0 (2025-03-13)

### 🚀 Features

- adding boxicons iconset ([#180](https://github.com/ng-icons/ng-icons/pull/180))

### ❤️ Thank You

- Ashley Hunter

## 31.1.0 (2025-03-12)

### 🚀 Features

- material symbols ([#178](https://github.com/ng-icons/ng-icons/pull/178))

### 🩹 Fixes

- material icon background ([c7a9096](https://github.com/ng-icons/ng-icons/commit/c7a9096))
- game icon background ([e4514ab](https://github.com/ng-icons/ng-icons/commit/e4514ab))

### ❤️ Thank You

- Ashley Hunter @ashley-hunter

# 31.0.0 (2025-03-08)

### 🚀 Features

- mynaui ([#170](https://github.com/ng-icons/ng-icons/pull/170))
- ⚠️  add role='img' and aria-hidden='true' to icon by default ([#173](https://github.com/ng-icons/ng-icons/pull/173))

### ⚠️  Breaking Changes

- aria-hidden changed from undefined to true by default  Closes #172"

### ❤️ Thank You

- Ashley Hunter
- lukonik @lukonik

## 30.3.0 (2025-02-13)

### 🚀 Features

- **glyph:** support ng module ([#167](https://github.com/ng-icons/ng-icons/pull/167))

### ❤️  Thank You

- Ashley Hunter

## 30.2.0 (2024-12-31)

### 🚀 Features

- svgl icons ([#161](https://github.com/ng-icons/ng-icons/pull/161))

### ❤️ Thank You

- Ashley Hunter

## 30.1.0 (2024-12-28)

### 🚀 Features

- solar icons ([#160](https://github.com/ng-icons/ng-icons/pull/160))

### ❤️ Thank You

- Ashley Hunter

# 30.0.0 (2024-12-28)

### 🚀 Features

- add angular v19 support ([#158](https://github.com/ng-icons/ng-icons/pull/158))

### ❤️ Thank You

- Enea Jahollari @eneajaho

## 29.10.0 (2024-11-19)

### 🚀 Features

- flag icons ([#157](https://github.com/ng-icons/ng-icons/pull/157))

### ❤️  Thank You

- Ashley Hunter

## 29.9.0 (2024-11-11)

### 🚀 Features

- crypto colored icons ([#152](https://github.com/ng-icons/ng-icons/pull/152))
- adding game icons ([#154](https://github.com/ng-icons/ng-icons/pull/154))

### ❤️  Thank You

- Ashley Hunter

## 29.8.0 (2024-11-10)

### 🚀 Features

- crypto colored icons ([#152](https://github.com/ng-icons/ng-icons/pull/152))

### ❤️  Thank You

- Ashley Hunter

## 29.7.0 (2024-11-09)

### 🚀 Features

- **core:** icon stack ([#150](https://github.com/ng-icons/ng-icons/pull/150))

### ❤️  Thank You

- Ashley Hunter

## 29.6.1 (2024-11-01)

### 🩹 Fixes

- **core:** icon color should allow override in global styles ([#147](https://github.com/ng-icons/ng-icons/pull/147))

### ❤️  Thank You

- Ashley Hunter

## 29.6.0 (2024-10-31)

### 🚀 Features

- icon color variable ([#145](https://github.com/ng-icons/ng-icons/pull/145))

### ❤️  Thank You

- Ashley Hunter

## 29.5.2 (2024-10-25)

### 🩹 Fixes

- **core:** allow sizing variable inheritance ([#144](https://github.com/ng-icons/ng-icons/pull/144))

### ❤️  Thank You

- Ashley Hunter

## 29.5.1 (2024-09-28)


### 🚀 Features

- updating iconsets ([#143](https://github.com/ng-icons/ng-icons/pull/143))

### ❤️  Thank You

- Ashley Hunter

## 29.5.0 (2024-08-20)


### 🩹 Fixes

- duplicate icon in ssr ([#138](https://github.com/ng-icons/ng-icons/pull/138))

### ❤️  Thank You

- Ashley Hunter

## 29.4.0 (2024-08-16)


### 🚀 Features

- add strokeWidth to global configuration ([#135](https://github.com/ng-icons/ng-icons/pull/135))

### ❤️  Thank You

- Clara Castillo
