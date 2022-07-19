# Migration Guide

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
