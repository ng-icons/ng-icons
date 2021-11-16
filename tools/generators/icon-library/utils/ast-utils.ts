import * as ts from 'typescript';

export function addNamespaceImport(
  sourceFile: ts.SourceFile,
  modulePath: string,
  symbolName: string,
): ts.SourceFile {
  const importStatement = ts.factory.createImportDeclaration(
    undefined,
    undefined,
    ts.factory.createImportClause(
      false,
      undefined,
      ts.factory.createNamespaceImport(ts.factory.createIdentifier(symbolName)),
    ),
    ts.factory.createStringLiteral(symbolName),
  );

  // create a source file from the original source file inserting the import statement
  return ts.factory.createSourceFile(
    [importStatement, ...sourceFile.statements],
    sourceFile.endOfFileToken,
    sourceFile.flags,
  );
}

export function addImport(
  sourceFile: ts.SourceFile,
  modulePath: string,
  symbolName: string,
): ts.SourceFile {
  const importStatement = ts.factory.createImportDeclaration(
    undefined,
    undefined,
    ts.factory.createImportClause(
      false,
      undefined,
      ts.factory.createNamedImports([
        ts.factory.createImportSpecifier(
          undefined,
          ts.factory.createIdentifier(symbolName),
        ),
      ]),
    ),
    ts.factory.createStringLiteral(modulePath),
  );
  // create a source file from the original source file inserting the import statement
  return ts.factory.createSourceFile(
    [importStatement, ...sourceFile.statements],
    sourceFile.endOfFileToken,
    sourceFile.flags,
  );
}

export function addCallToNgModuleImport(
  sourceFile: ts.SourceFile,
  functionName: string,
  parameters: ts.Expression[],
): ts.SourceFile {
  // create a typescript transformer that finds an identifier called NgIconsModule in an array
  // literal expression and wraps it in a call expression
  const transformer = (context: ts.TransformationContext) => {
    const visit = (node: ts.Node): ts.Node => {
      if (ts.isArrayLiteralExpression(node)) {
        const ngIconsModuleIdentifier = node.elements.find(
          element =>
            ts.isIdentifier(element) && element.text === 'NgIconsModule',
        );
        if (ngIconsModuleIdentifier) {
          const callExpression = ts.factory.createCallExpression(
            ts.factory.createIdentifier(functionName),
            undefined,
            parameters,
          );
          return ts.factory.createArrayLiteralExpression([
            ngIconsModuleIdentifier,
            callExpression,
          ]);
        }
      }
      return ts.visitEachChild(node, visit, context);
    };
    return (node: ts.SourceFile) => ts.visitNode(node, visit);
  };

  // create a new source file by transforming the original source file
  return ts.transform(sourceFile, [transformer]).transformed[0];
}

export function addImportToNgModule(
  sourceFile: ts.SourceFile,
  modulePath: string,
  symbolName: string,
): ts.SourceFile {
  sourceFile = addImport(sourceFile, modulePath, symbolName);

  // create a typescript transformer that inserts a symbol into a property assignment with the identifier imports
  const transformer = (context: ts.TransformationContext) => {
    const visit = (node: ts.Node): ts.Node => {
      if (
        ts.isPropertyAssignment(node) &&
        ts.isIdentifier(node.name) &&
        ts.isArrayLiteralExpression(node.initializer)
      ) {
        if (node.name.text === 'imports') {
          return ts.factory.createPropertyAssignment(
            node.name,
            ts.factory.createArrayLiteralExpression(
              [
                ...node.initializer.elements,
                ts.factory.createIdentifier(symbolName),
              ],
              true,
            ),
          );
        }
      }
      return ts.visitEachChild(node, visit, context);
    };
    return (node: ts.SourceFile) => ts.visitNode(node, visit);
  };

  // create a new source file by transforming the original source file
  return ts.transform(sourceFile, [transformer]).transformed[0];
}
