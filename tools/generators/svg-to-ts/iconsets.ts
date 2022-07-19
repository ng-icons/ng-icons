import { names } from '@nrwl/devkit';
import { dirname } from 'path';

export const iconsets: Iconset[] = [
  {
    glob: 'node_modules/heroicons/outline/**/*.svg',
    output: 'packages/heroicons/outline/src/index.ts',
    getIconName: (name: string) => `Hero${name}`,
  },
  {
    glob: 'node_modules/heroicons/solid/**/*.svg',
    output: 'packages/heroicons/solid/src/index.ts',
    getIconName: (name: string) => `Hero${name}Solid`,
  },
  {
    glob: 'node_modules/feather-icons/dist/icons/**/*.svg',
    output: 'packages/feather-icons/src/index.ts',
    getIconName: (name: string) => `Feather${name}`,
  },
  {
    glob: 'node_modules/jam-icons/svg/**/*.svg',
    output: 'packages/jam-icons/src/index.ts',
    getIconName: (name: string) => `Jam${name}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/@primer/octicons/build/svg/**/*-16.svg',
    output: 'packages/octicons/src/index.ts',
    getIconName: (name: string) => `Oct${name.replace('16', '')}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/@primer/octicons/build/svg/**/*-24.svg',
    output: 'packages/octicons/large/src/index.ts',
    getIconName: (name: string) => `Oct${name.replace('24', '')}Large`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'svg/radix-icons/**/*.svg',
    output: 'packages/radix-icons/src/index.ts',
    getIconName: (name: string) => `Radix${name}`,
  },
  {
    glob: 'node_modules/@tabler/icons/icons/**/*.svg',
    output: 'packages/tabler-icons/src/index.ts',
    getIconName: (name: string) => `Tabler${name}`,
  },
  {
    glob: 'node_modules/css.gg/icons/svg/**/*.svg',
    output: 'packages/css-gg/src/index.ts',
    getIconName: (name: string) => `Css${name}`,
  },
  {
    glob: 'svg/akar-icons/**/*.svg',
    output: 'packages/akar-icons/src/index.ts',
    getIconName: (name: string) => `Akar${name}`,
    svg: {
      colorAttr: 'stroke',
      removeStroke: true,
    },
  },
  {
    glob: 'node_modules/bootstrap-icons/icons/**/*.svg',
    output: 'packages/bootstrap-icons/src/index.ts',
    getIconName: (name: string) => `Bootstrap${name}`,
  },
  {
    glob: 'node_modules/ionicons/dist/svg/**/*.svg',
    output: 'packages/ionicons/src/index.ts',
    getIconName: (name: string) => `Ion${name}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/@material-icons/svg/svg/**/baseline.svg',
    output: 'packages/material-icons/baseline/src/index.ts',
    getIconName: (name: string, path: string) => {
      const iconName = names(dirname(path).split(/[\\/]/).pop()!).className;
      return `Mat${iconName}`;
    },
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/@material-icons/svg/svg/**/outline.svg',
    output: 'packages/material-icons/outline/src/index.ts',
    getIconName: (name: string, path: string) => {
      const iconName = names(dirname(path).split(/[\\/]/).pop()!).className;
      return `Mat${iconName}Outline`;
    },
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/@material-icons/svg/svg/**/round.svg',
    output: 'packages/material-icons/round/src/index.ts',
    getIconName: (name: string, path: string) => {
      const iconName = names(dirname(path).split(/[\\/]/).pop()!).className;
      return `Mat${iconName}Round`;
    },
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/@material-icons/svg/svg/**/sharp.svg',
    output: 'packages/material-icons/sharp/src/index.ts',
    getIconName: (name: string, path: string) => {
      const iconName = names(dirname(path).split(/[\\/]/).pop()!).className;
      return `Mat${iconName}Sharp`;
    },
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/iconoir/icons/**/*.svg',
    output: 'packages/iconoir/src/index.ts',
    getIconName: (name: string) => `Iconoir${name}`,
  },
  {
    glob: 'node_modules/@svg-icons/crypto/**/*.svg',
    output: 'packages/cryptocurrency-icons/src/index.ts',
    getIconName: (name: string) => `Crypto${name}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/@svg-icons/simple-icons/**/*.svg',
    output: 'packages/simple-icons/src/index.ts',
    getIconName: (name: string) => `Simple${name}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/@svg-icons/typicons/**/*.svg',
    output: 'packages/typicons/src/index.ts',
    getIconName: (name: string) => `Typ${name}`,
    svg: {
      colorAttr: 'fill',
    },
  },
];

export interface Iconset {
  glob: string;
  getIconName: (name: string, path: string) => string;
  output: string;
  svg?: SvgOptions;
  deprecated?: boolean;
  deprecatedMessage?: string;
}

export interface SvgOptions {
  colorAttr?: 'fill' | 'stroke';
  removeStroke?: boolean;
}
