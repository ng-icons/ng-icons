/**
 * Build the module augmentation an icon entry point prepends to its generated
 * exports.
 *
 * Icon names are contributed to `NgIconNameMap` in `@ng-icons/core` rather than
 * collected into a single union there, so a consumer's `IconName` only contains
 * the icons they installed. A union of every icon ng-icons ships was roughly a
 * third of the types in a typical application's program.
 *
 * The `import type {}` is load-bearing. TypeScript resolves the augmented
 * module specifier fine without it, but reports "Invalid module name in
 * augmentation" unless the file being augmented is also part of the program,
 * and nothing else in a generated icon file references `@ng-icons/core`. Being
 * type-only it is erased from the JavaScript, so the package gains no runtime
 * dependency, and `prettier-plugin-organize-imports` keeps it because an
 * empty-named type import is the idiom for "load this module's types".
 */
export function createIconNameAugmentation(iconNames: string[]): string {
  // Sorted so regenerating a package produces a stable diff, deduplicated
  // because two source icons can resolve to the same name.
  const names = Array.from(new Set(iconNames)).sort((a, b) =>
    a.localeCompare(b),
  );

  if (names.length === 0) {
    return '';
  }

  // Every member is `true` rather than something package-specific: names shared
  // between packages (the `mat*` names in material-icons and material-symbols)
  // may only merge while their declared types are identical.
  const members = names.map(name => `    ${name}: true;`).join('\n');

  return [
    `import type {} from '@ng-icons/core';`,
    ``,
    `declare module '@ng-icons/core' {`,
    `  interface NgIconNameMap {`,
    members,
    `  }`,
    `}`,
  ].join('\n');
}
