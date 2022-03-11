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
    glob: 'node_modules/octicons/build/svg/**/*.svg',
    output: 'packages/octicons/src/index.ts',
    getIconName: (name: string) => `Oct${name}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'packages/radix-icons/svg/**/*.svg',
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
    glob: 'svg/akat-icons/**/*.svg',
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
    getIconName: (name: string) => `Mat${name}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/@material-icons/svg/svg/**/outline.svg',
    output: 'packages/material-icons/outline/src/index.ts',
    getIconName: (name: string) => `Mat${name}Outline`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/@material-icons/svg/svg/**/round.svg',
    output: 'packages/material-icons/round/src/index.ts',
    getIconName: (name: string) => `Mat${name}Round`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/@material-icons/svg/svg/**/sharp.svg',
    output: 'packages/material-icons/sharp/src/index.ts',
    getIconName: (name: string) => `Mat${name}Sharp`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/iconoir/icons/**/*.svg',
    output: 'packages/iconoir/src/index.ts',
    getIconName: (name: string) => `Iconoir${name}`,
  },
];

export interface Iconset {
  glob: string;
  getIconName: (name: string) => string;
  output: string;
  svg?: SvgOptions;
}

export interface SvgOptions {
  colorAttr?: 'fill' | 'stroke';
  removeStroke?: boolean;
}
