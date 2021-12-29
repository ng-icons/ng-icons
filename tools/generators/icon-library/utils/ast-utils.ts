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
    ts.factory.createStringLiteral(modulePath),
  );

  // get the content of the source file
  const printer = ts.createPrinter();
  const importString = printer.printNode(
    ts.EmitHint.Unspecified,
    importStatement,
    sourceFile,
  );
  const sourceFileContents = printer.printFile(sourceFile);

  // create a source file from the original source file inserting the import statement
  return ts.createSourceFile(
    sourceFile.fileName,
    [importString, sourceFileContents].join('\n'),
    sourceFile.languageVersion,
    true,
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
          false,
          undefined,
          ts.factory.createIdentifier(symbolName),
        ),
      ]),
    ),
    ts.factory.createStringLiteral(modulePath),
  );

  // get the content of the source file
  const printer = ts.createPrinter();
  const importString = printer.printNode(
    ts.EmitHint.Unspecified,
    importStatement,
    sourceFile,
  );
  const sourceFileContents = printer.printFile(sourceFile);

  // create a source file from the original source file inserting the import statement
  return ts.createSourceFile(
    sourceFile.fileName,
    [importString, sourceFileContents].join('\n'),
    sourceFile.languageVersion,
    true,
  );
}

export function addCallToNgModuleImport(
  sourceFile: ts.SourceFile,
  moduleIdentifier: string,
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
            ts.isIdentifier(element) && element.text === moduleIdentifier,
        );
        if (ngIconsModuleIdentifier) {
          const callExpression = ts.factory.createCallExpression(
            ts.factory.createPropertyAccessExpression(
              ts.factory.createIdentifier(moduleIdentifier),
              ts.factory.createIdentifier(functionName),
            ),
            undefined,
            parameters,
          );

          return ts.factory.createArrayLiteralExpression([
            ...node.elements.filter(
              element => element !== ngIconsModuleIdentifier,
            ),
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

export function insertClassProperty(
  sourceFile: ts.SourceFile,
  propertyName: string,
  propertyValue: string,
): ts.SourceFile {
  // create a typescript transformer inserts a property assignment into a class declaration
  const transformer = (context: ts.TransformationContext) => {
    const visit = (node: ts.Node): ts.Node => {
      if (ts.isClassDeclaration(node)) {
        return ts.factory.createClassDeclaration(
          node.decorators,
          node.modifiers,
          node.name,
          node.typeParameters,
          node.heritageClauses,
          [
            ...node.members,
            ts.factory.createPropertyDeclaration(
              undefined,
              undefined,
              ts.factory.createIdentifier(propertyName),
              undefined,
              undefined,
              ts.factory.createIdentifier(propertyValue),
            ),
          ],
        );
      }
      return ts.visitEachChild(node, visit, context);
    };
    return (node: ts.SourceFile) => ts.visitNode(node, visit);
  };

  // create a new source file by transforming the original source file
  return ts.transform(sourceFile, [transformer]).transformed[0];
}

export function removeNgOnInitImplements(
  sourceFile: ts.SourceFile,
): ts.SourceFile {
  // create a typescript transformer that removes the heritage clause from any classes
  // that implement the ngOnInit lifecycle hook
  const transformer = (context: ts.TransformationContext) => {
    const visit = (node: ts.Node): ts.Node => {
      if (ts.isClassDeclaration(node)) {
        const ngOnInitImplements = node.heritageClauses.find(
          clause =>
            clause.token === ts.SyntaxKind.ImplementsKeyword &&
            clause.types.some(
              type =>
                ts.isIdentifier(type.expression) &&
                type.expression.text === 'OnInit',
            ),
        );
        if (ngOnInitImplements) {
          return ts.factory.createClassDeclaration(
            node.decorators,
            node.modifiers,
            node.name,
            node.typeParameters,
            node.heritageClauses.filter(
              clause => clause !== ngOnInitImplements,
            ),
            node.members,
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

export function removeAllMethods(sourceFile: ts.SourceFile): ts.SourceFile {
  const transformer = (context: ts.TransformationContext) => {
    const visit = (node: ts.Node): ts.Node => {
      if (ts.isConstructorDeclaration(node)) {
        return null;
      }

      if (ts.isMethodDeclaration(node) && ts.isIdentifier(node.name)) {
        if (node.name.text === 'ngOnInit') {
          return null;
        }
      }
      return ts.visitEachChild(node, visit, context);
    };
    return (node: ts.SourceFile) => ts.visitNode(node, visit);
  };

  return ts.transform(sourceFile, [transformer]).transformed[0];
}
