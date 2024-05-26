import { names } from '@nx/devkit';
import { dirname } from 'path';

export const iconsets: Iconset[] = [
  {
    glob: 'node_modules/heroicons/24/outline/**/*.svg',
    output: 'packages/heroicons/outline/src/index.ts',
    getIconName: (name: string) => `hero${name}`,
  },
  {
    glob: 'node_modules/heroicons/24/solid/**/*.svg',
    output: 'packages/heroicons/solid/src/index.ts',
    getIconName: (name: string) => `hero${name}Solid`,
  },
  {
    glob: 'node_modules/heroicons/20/solid/**/*.svg',
    output: 'packages/heroicons/mini/src/index.ts',
    getIconName: (name: string) => `hero${name}Mini`,
  },
  {
    glob: 'node_modules/feather-icons/dist/icons/**/*.svg',
    output: 'packages/feather-icons/src/index.ts',
    getIconName: (name: string) => `feather${name}`,
  },
  {
    glob: 'node_modules/jam-icons/svg/**/*.svg',
    output: 'packages/jam-icons/src/index.ts',
    getIconName: (name: string) => `jam${name}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/@primer/octicons/build/svg/**/*-16.svg',
    output: 'packages/octicons/src/index.ts',
    getIconName: (name: string) => `oct${name.replace('16', '')}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/@primer/octicons/build/svg/**/*-24.svg',
    output: 'packages/octicons/large/src/index.ts',
    getIconName: (name: string) => `oct${name.replace('24', '')}Large`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/@radix-ui/react-icons/icons/**/*.svg',
    output: 'packages/radix-icons/src/index.ts',
    getIconName: (name: string) => `radix${name}`,
  },
  {
    glob: 'node_modules/@tabler/icons/icons/**/*.svg',
    output: 'packages/tabler-icons/src/index.ts',
    getIconName: (name: string) => `tabler${name}`,
  },
  {
    glob: 'node_modules/css.gg/icons/svg/**/*.svg',
    output: 'packages/css-gg/src/index.ts',
    getIconName: (name: string) => `css${name}`,
  },
  {
    glob: 'node_modules/akar-icons-app/**/*.svg',
    output: 'packages/akar-icons/src/index.ts',
    getIconName: (name: string) => `akar${name}`,
    svg: {
      colorAttr: 'stroke',
      removeStroke: true,
    },
  },
  {
    glob: 'node_modules/bootstrap-icons/icons/**/*.svg',
    output: 'packages/bootstrap-icons/src/index.ts',
    getIconName: (name: string) => `bootstrap${name}`,
  },
  {
    glob: 'node_modules/ionicons/dist/svg/**/*.svg',
    output: 'packages/ionicons/src/index.ts',
    getIconName: (name: string) => `ion${name}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/@material-icons/svg/svg/**/baseline.svg',
    output: 'packages/material-icons/baseline/src/index.ts',
    getIconName: (name: string, path: string) => {
      const iconName = names(dirname(path).split(/[\\/]/).pop()!).className;
      return `mat${iconName}`;
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
      return `mat${iconName}Outline`;
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
      return `mat${iconName}Round`;
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
      return `mat${iconName}Sharp`;
    },
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/iconoir/icons/**/*.svg',
    output: 'packages/iconoir/src/index.ts',
    getIconName: (name: string) => `iconoir${name}`,
  },
  {
    glob: 'node_modules/cryptocurrency-icons/svg/black/**/*.svg',
    output: 'packages/cryptocurrency-icons/src/index.ts',
    getIconName: (name: string) => `crypto${name}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/simple-icons/icons/**/*.svg',
    output: 'packages/simple-icons/src/index.ts',
    getIconName: (name: string) => `simple${name}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/typicons.font/src/svg**/*.svg',
    output: 'packages/typicons/src/index.ts',
    getIconName: (name: string) => `typ${name}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/dripicons/**/*.svg',
    output: 'packages/dripicons/src/index.ts',
    getIconName: (name: string) => `drip${name}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/UXAspects/**/*.svg',
    output: 'packages/ux-aspects/src/index.ts',
    getIconName: (name: string) => `aspects${name}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/@klarr-agency/circum-icons/**/*.svg',
    output: 'packages/circum-icons/src/index.ts',
    getIconName: (name: string) => `circum${name}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/material-icon-theme/icons/*.svg',
    output: 'packages/material-file-icons/colored/src/index.ts',
    getIconName: (name: string) => `matf${name}Colored`,
  },
  {
    // folder icons looks ugly without colors
    glob: 'node_modules/material-icon-theme/icons/!(folder)*.svg',
    output: 'packages/material-file-icons/uncolored/src/index.ts',
    getIconName: (name: string) => `matf${name}Uncolored`,
    svg: {
      removeColor: true,
    },
  },
  {
    glob: 'node_modules/lucide-static/icons/*.svg',
    output: 'packages/lucide/src/index.ts',
    getIconName: (name: string) => `lucide${name}`,
  },
  {
    glob: 'node_modules/remixicon/icons/**/*.svg',
    output: 'packages/remixicon/src/index.ts',
    getIconName: (name: string) => `remix${name}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/font-awesome-solid/*.svg',
    output: 'packages/font-awesome/solid/src/index.ts',
    getIconName: (name: string) => `faSolid${name}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/font-awesome-regular/*.svg',
    output: 'packages/font-awesome/regular/src/index.ts',
    getIconName: (name: string) => `fa${name}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/font-awesome-brands/*.svg',
    output: 'packages/font-awesome/brands/src/index.ts',
    getIconName: (name: string) => `faBrand${name}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/iconsax/bold/**/*.svg',
    output: 'packages/iconsax/bold/src/index.ts',
    getIconName: (name: string, path: string) => {
      return `sax${name}Bold`;
    },
    svg: {
      removeColor: true,
    },
  },
  {
    glob: 'node_modules/iconsax/bulk/**/*.svg',
    output: 'packages/iconsax/bulk/src/index.ts',
    getIconName: (name: string, path: string) => {
      return `sax${name}Bulk`;
    },
    svg: {
      removeColor: true,
    },
  },
  {
    glob: 'node_modules/iconsax/outline/**/*.svg',
    output: 'packages/iconsax/outline/src/index.ts',
    getIconName: (name: string, path: string) => {
      return `sax${name}Outline`;
    },
    svg: {
      removeColor: true,
    },
  },
  {
    glob: 'node_modules/tdesign-icons-svg/src/**/*.svg',
    output: 'packages/tdesign-icons/src/index.ts',
    getIconName: (name: string) => `tdesign${name}`,
  },
  {
    glob: 'node_modules/@phosphor-icons/core/assets/bold/*-bold.svg',
    output: 'packages/phosphor-icons/bold/src/index.ts',
    getIconName: (name: string) => `phosphor${names(name).className}`,
  },
  {
    glob: 'node_modules/@phosphor-icons/core/assets/duotone/*-duotone.svg',
    output: 'packages/phosphor-icons/duotone/src/index.ts',
    getIconName: (name: string) => `phosphor${names(name).className}`,
  },
  {
    glob: 'node_modules/@phosphor-icons/core/assets/fill/*-fill.svg',
    output: 'packages/phosphor-icons/fill/src/index.ts',
    getIconName: (name: string) => `phosphor${names(name).className}`,
  },
  {
    glob: 'node_modules/@phosphor-icons/core/assets/light/*-light.svg',
    output: 'packages/phosphor-icons/light/src/index.ts',
    getIconName: (name: string) => `phosphor${names(name).className}`,
  },
  {
    glob: 'node_modules/@phosphor-icons/core/assets/regular/*.svg',
    output: 'packages/phosphor-icons/regular/src/index.ts',
    getIconName: (name: string) => `phosphor${names(name).className}`,
  },
  {
    glob: 'node_modules/@phosphor-icons/core/assets/thin/*-thin.svg',
    output: 'packages/phosphor-icons/thin/src/index.ts',
    getIconName: (name: string) => `phosphor${names(name).className}`,
  },
  {
    glob: 'node_modules/lets-icons/icons/*.svg',
    output: 'packages/lets-icons/src/index.ts',
    getIconName: (name: string) => `lets${names(name).className}`,
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
  removeColor?: boolean;
}
