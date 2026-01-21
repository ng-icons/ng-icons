import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { NgAddOptions } from './schema';
import { readFileSync } from 'fs';
import { join } from 'path';

function getPackageVersion(): string {
  try {
    // Try to read the package.json from the distributed package
    const packagePath = join(__dirname, '../../package.json');
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));
    return `^${packageJson.version}`;
  } catch {
    // Fallback version if package.json can't be read
    return '^33.0.0';
  }
}

export function ngAdd(options: NgAddOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Adding ng-icons to your project...');

    const version = getPackageVersion();

    // Add the core dependency
    const coreDependency: NodeDependency = {
      type: NodeDependencyType.Default,
      name: '@ng-icons/core',
      version,
      overwrite: true,
    };

    addPackageJsonDependency(tree, coreDependency);
    context.logger.info('Added @ng-icons/core dependency');

    // Add selected iconset dependencies
    if (options.iconsets && options.iconsets.length > 0) {
      for (const iconset of options.iconsets) {
        const iconsetDependency: NodeDependency = {
          type: NodeDependencyType.Default,
          name: `@ng-icons/${iconset}`,
          version,
          overwrite: true,
        };

        addPackageJsonDependency(tree, iconsetDependency);
        context.logger.info(`Added @ng-icons/${iconset} dependency`);
      }
    }

    // Schedule package installation
    context.addTask(new NodePackageInstallTask());

    return tree;
  };
}
