import { NavLink } from '../models/nav-link.model';

export const NAV_LINKS: NavLink[] = [
  {
    label: 'Getting Started',
    routerLink: '/getting-started',
    href: '#',
    target: '_self',
    extraClass: 'text-sm',
  },
  {
    label: 'Browse Icons',
    routerLink: '/browse-icons',
    href: '#',
    target: '_self',
    extraClass: 'text-sm',
  },
  {
    routerLink: undefined,
    href: 'https://github.com/ng-icons/ng-icons',
    target: '_blank',
    extraClass: 'ml-2 text-3xl',
    iconName: 'bootstrapGithub',
  },
];
