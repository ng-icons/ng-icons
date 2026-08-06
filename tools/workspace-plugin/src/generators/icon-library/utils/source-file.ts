import { Tree } from '@nx/devkit';
import * as ts from 'typescript';

export function getSourceFile(tree: Tree, path: string): ts.SourceFile {
  const contents = tree.read(path);
  if (!contents) {
    throw new Error(`Could not find source file: ${path}`);
  }
  const sourceFile = contents.toString();
  return ts.createSourceFile(path, sourceFile, ts.ScriptTarget.Latest, true);
}

export function writeSourceFile(
  tree: Tree,
  path: string,
  sourceFile: ts.SourceFile,
) {
  const printer = ts.createPrinter();
  tree.write(path, printer.printFile(sourceFile));

  console.log(printer.printFile(sourceFile));
}
