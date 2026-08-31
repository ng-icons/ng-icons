import { fileURLToPath } from 'node:url';
import * as prettier from 'prettier';
import * as ts from 'typescript';
import { createIconNameAugmentation } from './icon-name-augmentation';

/** Parse the emitted block and fail loudly if it isn't valid TypeScript. */
function parse(source: string): ts.SourceFile {
  const sourceFile = ts.createSourceFile(
    'index.ts',
    source,
    ts.ScriptTarget.ESNext,
    true,
  );

  const diagnostics = (
    sourceFile as ts.SourceFile & { parseDiagnostics?: ts.Diagnostic[] }
  ).parseDiagnostics;

  expect(diagnostics ?? []).toEqual([]);

  return sourceFile;
}

/** The icon names declared inside the emitted `NgIconNameMap` block. */
function declaredNames(source: string): string[] {
  const names: string[] = [];

  const visit = (node: ts.Node): void => {
    if (ts.isInterfaceDeclaration(node) && node.name.text === 'NgIconNameMap') {
      for (const member of node.members) {
        expect(ts.isPropertySignature(member)).toBe(true);
        names.push((member.name as ts.Identifier).text);
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(parse(source));

  return names;
}

describe('createIconNameAugmentation', () => {
  it('should augment @ng-icons/core rather than declare a local type', () => {
    const output = createIconNameAugmentation(['monoAdd']);

    expect(output).toContain(`declare module '@ng-icons/core'`);
    expect(output).toContain('interface NgIconNameMap');
  });

  it('should declare every icon name as a member of NgIconNameMap', () => {
    const output = createIconNameAugmentation([
      'monoAdd',
      'monoArchive',
      'monoBell',
    ]);

    expect(declaredNames(output)).toEqual([
      'monoAdd',
      'monoArchive',
      'monoBell',
    ]);
  });

  it('should give every name the same type so names shared between packages merge', () => {
    // `material-icons` and `material-symbols` both export `mat*` names. Two
    // packages may only declare the same member if the types are identical,
    // so every member is `true`.
    const output = createIconNameAugmentation(['mat10kOutline']);

    expect(output).toContain('mat10kOutline: true;');
  });

  it('should sort names so regenerating produces a stable diff', () => {
    const output = createIconNameAugmentation([
      'monoBell',
      'monoAdd',
      'monoArchive',
    ]);

    expect(declaredNames(output)).toEqual([
      'monoAdd',
      'monoArchive',
      'monoBell',
    ]);
  });

  it('should deduplicate names', () => {
    const output = createIconNameAugmentation(['monoAdd', 'monoAdd']);

    expect(declaredNames(output)).toEqual(['monoAdd']);
  });

  it('should emit nothing for an entry point that exports no icons', () => {
    // Some packages only exist to host secondary entry points, e.g. the root
    // of `@ng-icons/heroicons`, and have no names to contribute.
    expect(createIconNameAugmentation([])).toBe('');
  });

  it('should import @ng-icons/core so the augmented module is in the program', () => {
    // Resolving the module specifier is not enough: TypeScript reports
    // "Invalid module name in augmentation" unless the file being augmented is
    // part of the program, and nothing else in a generated icon file pulls
    // `@ng-icons/core` in. A type-only import is erased from the JavaScript
    // output, so it costs the package no runtime dependency.
    const output = createIconNameAugmentation(['monoAdd']);

    expect(output).toContain(`import type {} from '@ng-icons/core';`);
  });

  it('should emit prettier-formatted output', async () => {
    // The generated icon files are prettier-clean, and the block is prepended
    // to them verbatim by the migration as well as by the generator, so it has
    // to be formatted the way the repository formats everything else.
    const output = createIconNameAugmentation(['monoAdd', 'monoArchive']);
    const config = await prettier.resolveConfig(fileURLToPath(import.meta.url));

    expect(
      await prettier.format(output, { ...config, parser: 'typescript' }),
    ).toBe(`${output}\n`);
  });
});
