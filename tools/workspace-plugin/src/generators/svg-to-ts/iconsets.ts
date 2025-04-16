/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { names } from '@nx/devkit';
import { dirname } from 'path';
import type { CustomPlugin } from 'svgo';
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
    glob: 'node_modules/@tabler/icons/icons/outline/**/*.svg',
    output: 'packages/tabler-icons/src/index.ts',
    getIconName: (name: string) => `tabler${name}`,
  },
  {
    glob: 'node_modules/@tabler/icons/icons/filled/**/*.svg',
    output: 'packages/tabler-icons/fill/src/index.ts',
    getIconName: (name: string) => `tabler${name}Fill`,
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
    glob: 'node_modules/devicon/icons/**/*.svg',
    filter: name =>
      name.endsWith('plain.svg') || name.endsWith('plain-wordmark.svg'),
    output: 'packages/devicon/plain/src/index.ts',
    getIconName: (name: string) => {
      return `di${name}`;
    },
    svg: {
      removeColor: true,
    },
  },
  {
    glob: 'node_modules/devicon/icons/**/*.svg',
    filter: name =>
      name.endsWith('original.svg') || name.endsWith('original-wordmark.svg'),
    output: 'packages/devicon/original/src/index.ts',
    getIconName: (name: string) => {
      return `di${name}`;
    },
  },
  {
    glob: 'node_modules/devicon/icons/**/*.svg',
    filter: name =>
      name.endsWith('line.svg') || name.endsWith('line-wordmark.svg'),
    output: 'packages/devicon/line/src/index.ts',
    getIconName: (name: string) => {
      return `di${name}`;
    },
    svg: {
      colorAttr: 'stroke',
      removeColor: true,
    },
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
    glob: 'node_modules/cryptocurrency-icons/svg/color/**/*.svg',
    output: 'packages/cryptocurrency-icons/colored/src/index.ts',
    getIconName: (name: string) => `crypto${name}Colored`,
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
    glob: 'node_modules/material-icon-theme/icons/!(folder)*.svg',
    output: 'packages/material-file-icons/uncolored/src/index.ts',
    getIconName: (name: string) => `matf${name}Uncolored`,
    svg: {
      removeColor: true,
      removeBackground: true,
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
    getIconName: (name: string) => {
      return `sax${name}Bold`;
    },
    svg: {
      removeColor: true,
    },
  },
  {
    glob: 'node_modules/iconsax/bulk/**/*.svg',
    output: 'packages/iconsax/bulk/src/index.ts',
    getIconName: (name: string) => {
      return `sax${name}Bulk`;
    },
    svg: {
      removeColor: true,
    },
  },
  {
    glob: 'node_modules/iconsax/outline/**/*.svg',
    output: 'packages/iconsax/outline/src/index.ts',
    getIconName: (name: string) => {
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
    glob: 'node_modules/lets-icons/icons/*-light.svg',
    output: 'packages/lets-icons/light/src/index.ts',
    getIconName: (name: string) => `lets${names(name).className}`,
  },
  {
    glob: 'node_modules/lets-icons/icons/*-fill.svg',
    output: 'packages/lets-icons/fill/src/index.ts',
    getIconName: (name: string) => `lets${names(name).className}`,
  },
  {
    glob: 'node_modules/lets-icons/icons/*-duotone.svg',
    output: 'packages/lets-icons/duotone/src/index.ts',
    getIconName: (name: string) => `lets${names(name).className}`,
  },
  {
    glob: 'node_modules/lets-icons/icons/*-duotone-line.svg',
    output: 'packages/lets-icons/duotone-line/src/index.ts',
    getIconName: (name: string) => `lets${names(name).className}`,
  },
  {
    glob: 'node_modules/lets-icons/icons/*.svg',
    filter: name =>
      !name.endsWith('-fill.svg') &&
      !name.endsWith('-light.svg') &&
      !name.endsWith('-duotone.svg') &&
      !name.endsWith('-duotone-line.svg'),
    output: 'packages/lets-icons/regular/src/index.ts',
    getIconName: (name: string) => `lets${names(name).className}`,
  },
  {
    glob: 'node_modules/@ng-icons/svgs/huge-icons/*.svg',
    output: 'packages/huge-icons/src/index.ts',
    getIconName: (name: string) =>
      `huge${names(name).className.replace('StrokeRounded', '')}`,
    svg: {
      colorAttr: 'stroke',
      removeStroke: true,
    },
  },
  {
    glob: 'node_modules/game-icons/**/*.svg',
    output: 'packages/game-icons/src/index.ts',
    getIconName: (name: string) => `game${name}`,
    svg: {
      removeColor: true,
      removeBackground: true,
    },
  },
  {
    glob: 'node_modules/flag-icons/flags/4x3/**/*.svg',
    output: 'packages/flag-icons/src/index.ts',
    getIconName: (name: string) => `flag${name}`,
  },
  {
    glob: 'node_modules/flag-icons/flags/1x1/**/*.svg',
    output: 'packages/flag-icons/square/src/index.ts',
    getIconName: (name: string) => `flag${name}Square`,
  },
  {
    glob: 'node_modules/solar-icons/icons/SVG/Bold/**/*.svg',
    output: 'packages/solar-icons/bold/src/index.ts',
    getIconName: (name: string) => `solar${name}Bold`,
    svg: {
      removeColor: true,
    },
  },
  {
    glob: 'node_modules/solar-icons/icons/SVG/Line Duotone/**/*.svg',
    output: 'packages/solar-icons/duotone/src/index.ts',
    getIconName: (name: string) => `solar${name}Duotone`,
    svg: {
      strokeCurrentColor: true,
    },
  },
  {
    glob: 'node_modules/solar-icons/icons/SVG/Outline/**/*.svg',
    output: 'packages/solar-icons/outline/src/index.ts',
    getIconName: (name: string) => `solar${name}`,
    svg: {
      removeColor: true,
    },
  },
  {
    glob: 'node_modules/solar-icons/icons/SVG/Bold Duotone/**/*.svg',
    output: 'packages/solar-icons/bold-duotone/src/index.ts',
    getIconName: (name: string) => `solar${name}BoldDuotone`,
    svg: {
      removeColor: true,
    },
  },
  {
    glob: 'node_modules/solar-icons/icons/SVG/Broken/**/*.svg',
    output: 'packages/solar-icons/broken/src/index.ts',
    getIconName: (name: string) => `solar${name}Broken`,
    svg: {
      strokeCurrentColor: true,
      fillCurrentColor: true,
    },
  },
  {
    glob: 'node_modules/solar-icons/icons/SVG/Linear/**/*.svg',
    output: 'packages/solar-icons/linear/src/index.ts',
    getIconName: (name: string) => `solar${name}Linear`,
    svg: {
      strokeCurrentColor: true,
      fillCurrentColor: true,
    },
  },
  {
    glob: 'node_modules/@pheralb/svgl/static/library/**/*.svg',
    output: 'packages/svgl/src/index.ts',
    getIconName: (name: string) => `svgl${name}`,
  },
  {
    glob: 'node_modules/@mynaui/icons/icons/**/*.svg',
    output: 'packages/mynaui/outline/src/index.ts',
    getIconName: (name: string) => `myna${name}`,
  },
  {
    glob: 'node_modules/@mynaui/icons/icons-solid/**/*.svg',
    output: 'packages/mynaui/solid/src/index.ts',
    getIconName: (name: string) => `myna${name}Solid`,
  },
  {
    glob: 'node_modules/@material-symbols/svg-400/outlined/**/*.svg',
    output: 'packages/material-symbols/outline/src/index.ts',
    getIconName: (name: string, path: string) => {
      const iconName = names(dirname(path).split(/[\\/]/).pop()!).className;
      return `mat${iconName}Outline`;
    },
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/@material-symbols/svg-400/rounded/**/*.svg',
    output: 'packages/material-symbols/round/src/index.ts',
    getIconName: (name: string, path: string) => {
      const iconName = names(dirname(path).split(/[\\/]/).pop()!).className;
      return `mat${iconName}Round`;
    },
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/@material-symbols/svg-400/sharp/**/*.svg',
    output: 'packages/material-symbols/sharp/src/index.ts',
    getIconName: (name: string, path: string) => {
      const iconName = names(dirname(path).split(/[\\/]/).pop()!).className;
      return `mat${iconName}Sharp`;
    },
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/boxicons/svg/regular/**/*.svg',
    output: 'packages/boxicons/regular/src/index.ts',
    getIconName: (name: string) => `box${name.substring(2)}`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/boxicons/svg/solid/**/*.svg',
    output: 'packages/boxicons/solid/src/index.ts',
    getIconName: (name: string) => `box${name.substring(3)}Solid`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/boxicons/svg/logos/**/*.svg',
    output: 'packages/boxicons/logos/src/index.ts',
    getIconName: (name: string) => `box${name.substring(3)}Logo`,
    svg: {
      colorAttr: 'fill',
    },
  },
  {
    glob: 'node_modules/mono-icons/svg/**/*.svg',
    output: 'packages/mono-icons/src/index.ts',
    getIconName: (name: string) => `mono${name}`,
    svg: {
      strokeCurrentColor: true,
      fillCurrentColor: true,
    },
  },
];
export interface Iconset {
  glob: string;
  filter?: (name: string) => boolean;
  getIconName: (name: string, path: string) => string;
  output: string;
  svg?: SvgOptions;
  deprecated?: boolean;
  deprecatedMessage?: string;
  plugins?: CustomPlugin[];
}
export interface SvgOptions {
  colorAttr?: 'fill' | 'stroke';
  removeStroke?: boolean;
  removeColor?: boolean;
  removeBackground?: boolean;
  strokeCurrentColor?: boolean;
  fillCurrentColor?: boolean;
}
