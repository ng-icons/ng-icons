import { names } from '@nrwl/devkit';
import { dirname, sep } from 'path';

export const iconsets: Iconset[] = [
  {
    variants: [
      { glob: 'node_modules/heroicons/outline/**/*.svg' },
      {
        glob: 'node_modules/heroicons/solid/**/*.svg',
        formatter: name => name + '-solid',
      },
    ],
    output: 'packages/heroicons/src/index.ts',
    prefix: 'hero',
  },
  {
    variants: [{ glob: 'node_modules/feather-icons/dist/icons/**/*.svg' }],
    output: 'packages/feather-icons/src/index.ts',
    prefix: 'feather',
  },
  {
    variants: [{ glob: 'node_modules/jam-icons/svg/**/*.svg' }],
    output: 'packages/jam-icons/src/index.ts',
    prefix: 'jam',
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    variants: [{ glob: 'node_modules/octicons/build/svg/**/*.svg' }],
    output: 'packages/octicons/src/index.ts',
    prefix: 'oct',
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    variants: [{ glob: 'packages/radix-icons/svg/**/*.svg' }],
    output: 'packages/radix-icons/src/index.ts',
    prefix: 'radix',
  },
  {
    variants: [{ glob: 'node_modules/@tabler/icons/icons/**/*.svg' }],
    output: 'packages/tabler-icons/src/index.ts',
    prefix: 'tabler',
  },
  {
    variants: [{ glob: 'node_modules/css.gg/icons/svg/**/*.svg' }],
    output: 'packages/css-gg/src/index.ts',
    prefix: 'css',
  },
  {
    variants: [{ glob: 'packages/akar-icons/svg/**/*.svg' }],
    output: 'packages/akar-icons/src/index.ts',
    prefix: 'akar',
    svg: {
      colorAttr: 'stroke',
      removeStroke: true,
    },
  },
  {
    variants: [{ glob: 'node_modules/bootstrap-icons/icons/**/*.svg' }],
    output: 'packages/bootstrap-icons/src/index.ts',
    prefix: 'bootstrap',
  },
  {
    variants: [{ glob: 'node_modules/ionicons/dist/svg/**/*.svg' }],
    output: 'packages/ionicons/src/index.ts',
    prefix: 'ion',
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    variants: [
      {
        glob: 'node_modules/@material-icons/svg/svg/**/baseline.svg',
        formatter: (name, path, prefix) => {
          const iconName = dirname(path).split(sep).pop();
          return names(prefix + '-' + iconName).fileName;
        },
      },
      {
        glob: 'node_modules/@material-icons/svg/svg/**/outline.svg',
        formatter: (name, path, prefix) => {
          const iconName = dirname(path).split(sep).pop();
          return names(prefix + '-' + iconName + '-outline').fileName;
        },
      },
      {
        glob: 'node_modules/@material-icons/svg/svg/**/round.svg',
        formatter: (name, path, prefix) => {
          const iconName = dirname(path).split(sep).pop();
          return names(prefix + '-' + iconName + '-round').fileName;
        },
      },
      {
        glob: 'node_modules/@material-icons/svg/svg/**/sharp.svg',
        formatter: (name, path, prefix) => {
          const iconName = dirname(path).split(sep).pop();
          return names(prefix + '-' + iconName + '-sharp').fileName;
        },
      },
      {
        glob: 'node_modules/@material-icons/svg/svg/**/twotone.svg',
        formatter: (name, path, prefix) => {
          const iconName = dirname(path).split(sep).pop();
          return names(prefix + '-' + iconName + '-twotone').fileName;
        },
      },
    ],
    output: 'packages/material-icons/src/index.ts',
    prefix: 'mat',
    svg: {
      colorAttr: 'fill',
    },
  },
];

export interface Iconset {
  variants: IconVariant[];
  output: string;
  prefix: string;
  svg?: SvgOptions;
}

export interface IconVariant {
  glob: string;
  formatter?: (name: string, path: string, prefix: string) => string;
}

export interface SvgOptions {
  colorAttr?: 'fill' | 'stroke';
  removeStroke?: boolean;
}
