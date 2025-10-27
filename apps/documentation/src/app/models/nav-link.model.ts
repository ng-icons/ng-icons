export interface NavLink {
  href: string;
  target: '_self' | '_blank';
  extraClass: string;
  label?: string;
  routerLink?: string;
  iconName?: string;
}
