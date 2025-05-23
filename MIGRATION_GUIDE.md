# Migration Guide

## Version 30 to 31

This release now defaults all icons to use aria-hidden. As a precaution we have made this change a major release as the default accessibility behaviour has now slightly changed. In the vast majority of cases this new behaviour is desired, however if an icon has an aria-label (or similar) applied you should also set aria-hidden to false.

## Version 20 to 21

All icon imports have been renamed to lowerCamelCase. For example: `FeatherAirplay` now becomes `featherAirplay`.
We now also recommend using the same casing in your templates, so instead of `feather-airplay` you should use `featherAirplay`.

This allows us to align the names with the import as it was not immediately obvious what name should be used in the template in certain cases.
For example, `HeroSquare2x2`, should that be `hero-square-2x2` or `hero-square-2-x-2` or `hero-square2x2` etc...

To ease the migration we have provided automated migrations. Run the following:

`ng update @ng-icons/schematics`

or if you are using an Nx workspace:

`nx migrate @ng-icons/schematics`

This only updates your Typescript files, so your templates will still use the hyphenated names. They will continue to work as before, however as mentioned are no longer recommeded.

## Version 19 to 20

- Updating iconsets, in particuar Heroicons v2. This may result in some names changing or icons being removed.

## Version 18 to 19

- A few icon names were incorrectly named in the `IconName` type, these have now been corrected.

## Version 17 to 18

- Angular 13 is no longer officially supported.
- `IconComponent` has been renamed to `NgIconComponent`

## Version 16 to 17

Angular 12 is no longer officially supported.

The following iconsets have been updated:

- Tabler Icons
- Material Icons
- Octicons
- Iconoir

As part of these updates a few icons may have been removed or renamed.

## Version 15 to 16

The following iconsets have been updated:

- Feather Icons
- Material Icons
- Tabler Icons
- Iconoir

As part of these updates a few icons may have been removed or renamed.

## Version 14 to 15

The Octicons package has been updated to use `@primer/octicons` instead of `octicons`.
There have been some visual changes to the icons, and some icons may no longer be available.

However, there are new icons that have been added and a `large` variant to provide an additional variant of many icons.

## Version 13 to 14

The following changes are required to upgrade from version 13 to version 14:

### Heroicons

- Outline icons should now be imported from `@ng-icons/heroicons/outline`.
- Solid icons should now be imported from `@ng-icons/heroicons/solid`.

### Material Icons

- Baseline icons should now be imported from `@ng-icons/material-icons/baseline`.
- Outline icons should now be imported from `@ng-icons/material-icons/outline`.
- Round icons should now be imported from `@ng-icons/material-icons/round`.
- Sharp icons should now be imported from `@ng-icons/material-icons/sharp`.
