/**
 * Display metadata for each icon set, keyed by package name.
 *
 * Licences and websites are the ones the previous documentation site shipped
 * (they are the maintained source of truth); display names follow the redesign.
 * A package missing from here still appears in the browser, it just falls back
 * to a title-cased name and no website link.
 */
export interface SetMeta {
  name: string;
  website?: string;
  license: string;
}

export const SET_META: Record<string, SetMeta> = {
  '@ng-icons/akar-icons': {
    name: 'Akar Icons',
    website: 'akaricons.com',
    license: 'MIT',
  },
  '@ng-icons/bootstrap-icons': {
    name: 'Bootstrap Icons',
    website: 'icons.getbootstrap.com',
    license: 'MIT',
  },
  '@ng-icons/boxicons': {
    name: 'Boxicons',
    website: 'boxicons.com',
    license: 'MIT',
  },
  '@ng-icons/circum-icons': {
    name: 'Circum Icons',
    website: 'circumicons.com',
    license: 'MPL-2.0',
  },
  '@ng-icons/coolicons': {
    name: 'Coolicons',
    website: 'coolicons.cool',
    license: 'CC-BY-4.0',
  },
  '@ng-icons/cryptocurrency-icons': {
    name: 'Cryptocurrency Icons',
    website: 'cryptoicons.co',
    license: 'CC0-1.0',
  },
  '@ng-icons/css.gg': { name: 'CSS.gg', website: 'css.gg', license: 'MIT' },
  '@ng-icons/devicon': {
    name: 'Devicon',
    website: 'github.com/devicons/devicon',
    license: 'MIT',
  },
  '@ng-icons/dripicons': {
    name: 'Dripicons',
    website: 'github.com/amitjakhu/dripicons',
    license: 'CC-BY-SA-4.0',
  },
  '@ng-icons/feather-icons': {
    name: 'Feather Icons',
    website: 'feathericons.com',
    license: 'MIT',
  },
  '@ng-icons/flag-icons': {
    name: 'Flag Icons',
    website: 'flagicons.lipis.dev',
    license: 'MIT',
  },
  '@ng-icons/fluent-ui': {
    name: 'Fluent UI',
    website: 'fluenticons.co',
    license: 'MIT',
  },
  '@ng-icons/font-awesome': {
    name: 'Font Awesome',
    website: 'fontawesome.com',
    license: 'CC BY 4.0',
  },
  '@ng-icons/game-icons': {
    name: 'Game Icons',
    website: 'game-icons.net',
    license: 'CC-BY-3.0',
  },
  '@ng-icons/heroicons': {
    name: 'Heroicons',
    website: 'heroicons.com',
    license: 'MIT',
  },
  '@ng-icons/huge-icons': {
    name: 'Huge Icons',
    website: 'hugeicons.com',
    license: 'CC0-1.0',
  },
  '@ng-icons/iconoir': {
    name: 'Iconoir',
    website: 'iconoir.com',
    license: 'MIT',
  },
  '@ng-icons/iconsax': {
    name: 'Iconsax',
    website: 'iconsax.io',
    license: 'Custom',
  },
  '@ng-icons/ionicons': {
    name: 'Ionicons',
    website: 'ionic.io/ionicons',
    license: 'MIT',
  },
  '@ng-icons/jam-icons': {
    name: 'Jam Icons',
    website: 'jam-icons.com',
    license: 'MIT',
  },
  '@ng-icons/lets-icons': {
    name: 'Lets Icons',
    website: 'figma.com/community/file/125859360975033444',
    license: 'CC BY 4.0',
  },
  '@ng-icons/lobe-icons': {
    name: 'Lobe Icons',
    website: 'lobehub.com/icons',
    license: 'MIT',
  },
  '@ng-icons/lucide': { name: 'Lucide', website: 'lucide.dev', license: 'ISC' },
  '@ng-icons/material-file-icons': {
    name: 'Material File Icons',
    website: 'github.com/PKief/vscode-material-icon-theme',
    license: 'MIT',
  },
  '@ng-icons/material-icons': {
    name: 'Material Icons',
    website: 'fonts.google.com/icons',
    license: 'Apache 2.0',
  },
  '@ng-icons/material-symbols': {
    name: 'Material Symbols',
    website: 'marella.github.io/material-symbols',
    license: 'Apache 2.0',
  },
  '@ng-icons/mono-icons': {
    name: 'Mono Icons',
    website: 'icons.mono.company',
    license: 'MIT',
  },
  '@ng-icons/mynaui': {
    name: 'MynaUI',
    website: 'mynaui.com',
    license: 'MIT',
  },
  '@ng-icons/octicons': {
    name: 'Octicons',
    website: 'github.com/primer/octicons',
    license: 'MIT',
  },
  '@ng-icons/phosphor-icons': {
    name: 'Phosphor Icons',
    website: 'phosphoricons.com',
    license: 'MIT',
  },
  '@ng-icons/primeicons': {
    name: 'PrimeIcons',
    website: 'primeng.org/icons',
    license: 'MIT',
  },
  '@ng-icons/radix-icons': {
    name: 'Radix Icons',
    website: 'icons.radix-ui.com',
    license: 'MIT',
  },
  '@ng-icons/remixicon': {
    name: 'Remix Icon',
    website: 'remixicon.com',
    license: 'Apache 2.0',
  },
  '@ng-icons/simple-icons': {
    name: 'Simple Icons',
    website: 'simpleicons.org',
    license: 'CC0-1.0',
  },
  '@ng-icons/solar-icons': {
    name: 'Solar Icons',
    website: 'github.com/480-Design/Solar-Icon-Set',
    license: 'CC-BY-4.0',
  },
  '@ng-icons/svgl': { name: 'SVGL', website: 'svgl.app', license: 'MIT' },
  '@ng-icons/tabler-icons': {
    name: 'Tabler Icons',
    website: 'tabler.io/icons',
    license: 'MIT',
  },
  '@ng-icons/tdesign-icons': {
    name: 'TDesign Icons',
    website: 'tdesign.tencent.com',
    license: 'MIT',
  },
  '@ng-icons/typicons': {
    name: 'Typicons',
    website: 's-ings.com/typicons',
    license: 'CC-BY-SA-4.0',
  },
  '@ng-icons/ux-aspects': {
    name: 'UX Aspects',
    website: 'uxaspects.github.io/UXAspects',
    license: 'Apache 2.0',
  },
};
