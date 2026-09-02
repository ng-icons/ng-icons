/**
 * The registry of icon names that are available to `ng-icon`.
 *
 * Every icon package augments this interface with the icons that entry point
 * exports, so `IconName` only ever contains icons that are actually installed
 * rather than every icon ng-icons ships. Contribute your own names the same way
 * to get autocomplete for a custom icon set:
 *
 * ```ts
 * declare module '@ng-icons/core' {
 *   interface NgIconNameMap {
 *     myCompanyLogo: true;
 *   }
 * }
 * ```
 *
 * Every member is `true` so that a name exported by more than one package - the
 * `mat*` names shared by `material-icons` and `material-symbols`, for instance -
 * merges instead of colliding.
 */
// Empty by design: the packages fill it in.
// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
export interface NgIconNameMap {}

type InstalledIconNames = keyof NgIconNameMap;

/**
 * The names of the icons exported by the icon packages you have imported.
 *
 * Falls back to `string` when nothing has contributed a name, which does two
 * things. A project with no icon package - one rendering everything through an
 * icon loader, say - has nothing to be strict about, and gets a usable type
 * rather than `never`. And because the fallback is a conditional, the union in
 * `IconType` no longer reduces when the map is empty, so declaration emit keeps
 * writing the alias by name. That matters outside this repository: a library
 * wrapping `ng-icon` would otherwise bake the reduced type into its own
 * `.d.ts` and cost its consumers their autocomplete.
 */
export type IconName = [InstalledIconNames] extends [never]
  ? string
  : InstalledIconNames;

/**
 * The name of an icon to render.
 *
 * Any string is accepted, because an icon can also come from a loader, a custom
 * icon set, or an alias registered with `provideIcons`. The `IconName` half is
 * what keeps autocomplete working for the icons that are installed - the
 * intersection with `{}` stops TypeScript collapsing the union to `string` and
 * throwing those suggestions away.
 */
export type IconType = IconName | (string & {});
