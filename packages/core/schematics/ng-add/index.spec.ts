import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NgAddOptions } from './schema';

// Mock the angular schematics utilities
vi.mock('@schematics/angular/utility/dependencies', () => ({
  addPackageJsonDependency: vi.fn(),
  NodeDependencyType: {
    Default: 'dependencies',
  },
}));

// Mock fs to return a consistent version
vi.mock('fs', () => ({
  default: {},
  readFileSync: vi.fn(() => JSON.stringify({ version: '33.0.0' })),
}));

// Mock path
vi.mock('path', () => ({
  default: {},
  join: vi.fn((...paths) => paths.join('/')),
}));

// Import after mock
import { ngAdd } from './index';

describe('ng-add schematic', () => {
  let tree: Tree;
  let context: SchematicContext;
  let mockAddPackageJsonDependency: any;

  beforeEach(async () => {
    // Reset mocks
    vi.clearAllMocks();

    // Get the mocked function
    const deps = await vi.importMock(
      '@schematics/angular/utility/dependencies',
    );
    mockAddPackageJsonDependency = deps.addPackageJsonDependency;

    // Create a mock tree
    tree = {
      read: vi.fn(),
      exists: vi.fn(),
      overwrite: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
      rename: vi.fn(),
      actions: [],
      getDir: vi.fn(),
      visit: vi.fn(),
    } as unknown as Tree;

    // Create a mock context
    context = {
      logger: {
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
        debug: vi.fn(),
      },
      addTask: vi.fn(),
    } as unknown as SchematicContext;
  });

  it('should add @ng-icons/core dependency', () => {
    const options: NgAddOptions = {};
    const rule = ngAdd(options);

    rule(tree, context);

    expect(mockAddPackageJsonDependency).toHaveBeenCalledWith(
      tree,
      expect.objectContaining({
        type: 'dependencies',
        name: '@ng-icons/core',
        version: '^33.0.0',
        overwrite: true,
      }),
    );
  });

  it('should add selected iconset dependencies', () => {
    const options: NgAddOptions = {
      iconsets: ['lucide', 'heroicons'],
    };
    const rule = ngAdd(options);

    rule(tree, context);

    expect(mockAddPackageJsonDependency).toHaveBeenCalledWith(
      tree,
      expect.objectContaining({
        type: 'dependencies',
        name: '@ng-icons/core',
        version: '^33.0.0',
        overwrite: true,
      }),
    );

    expect(mockAddPackageJsonDependency).toHaveBeenCalledWith(
      tree,
      expect.objectContaining({
        type: 'dependencies',
        name: '@ng-icons/lucide',
        version: '^33.0.0',
        overwrite: true,
      }),
    );

    expect(mockAddPackageJsonDependency).toHaveBeenCalledWith(
      tree,
      expect.objectContaining({
        type: 'dependencies',
        name: '@ng-icons/heroicons',
        version: '^33.0.0',
        overwrite: true,
      }),
    );
  });

  it('should work with empty iconsets array', () => {
    const options: NgAddOptions = {
      iconsets: [],
    };
    const rule = ngAdd(options);

    rule(tree, context);

    expect(mockAddPackageJsonDependency).toHaveBeenCalledTimes(1);
    expect(mockAddPackageJsonDependency).toHaveBeenCalledWith(
      tree,
      expect.objectContaining({
        name: '@ng-icons/core',
      }),
    );
  });

  it('should schedule package installation task', () => {
    const options: NgAddOptions = {};
    const rule = ngAdd(options);

    rule(tree, context);

    expect(context.addTask).toHaveBeenCalledWith(
      expect.any(NodePackageInstallTask),
    );
  });

  it('should log appropriate messages', () => {
    const options: NgAddOptions = {
      iconsets: ['lucide'],
    };
    const rule = ngAdd(options);

    rule(tree, context);

    expect(context.logger.info).toHaveBeenCalledWith(
      'Adding ng-icons to your project...',
    );
    expect(context.logger.info).toHaveBeenCalledWith(
      'Added @ng-icons/core dependency',
    );
    expect(context.logger.info).toHaveBeenCalledWith(
      'Added @ng-icons/lucide dependency',
    );
  });

  it('passes iconset slugs through to package names verbatim', () => {
    // `css.gg` is the one published set whose slug contains a dot, and getting
    // it wrong is silent: the install just fails to resolve the package.
    const iconsets = ['lucide', 'heroicons', 'css.gg', 'material-symbols'];
    const rule = ngAdd({ iconsets });

    rule(tree, context);

    expect(mockAddPackageJsonDependency).toHaveBeenCalledTimes(
      1 + iconsets.length,
    );

    for (const iconset of iconsets) {
      expect(mockAddPackageJsonDependency).toHaveBeenCalledWith(
        tree,
        expect.objectContaining({
          name: `@ng-icons/${iconset}`,
          version: '^33.0.0',
        }),
      );
    }
  });
});
