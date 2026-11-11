---
title: Licensing
section: Icon sets
order: 15
lead: Each icon set carries the licence of the project it comes from. The core package is MIT.
---

`@ng-icons/core` is MIT licensed. Every icon set package inherits the licence of the project its SVGs come from, which is not always the same thing.

The licence for each set is listed on the [icon sets page](/iconsets) and on every icon in the browser, so it is always visible next to the package name you are about to install.

> Check the licence of a set before shipping it. Attribution requirements differ between CC0, CC BY and Apache licensed sets, and one set (Iconsax) has its own custom terms.

## PrimeIcons is frozen

`@ng-icons/primeicons` is intentionally pinned to `primeicons@7.0.0` and will not receive further icon updates.

PrimeTek released `primeicons` 8.0.0 and later under the PrimeUI Community/Commercial License, which prohibits redistributing the icons. `7.0.0` is the last MIT licensed release, and PrimeTek has confirmed that existing MIT releases stay MIT. The package keeps working as it does today.

For new icons use [`@ng-icons/openng-icons`](/browse?sets=openng-icons), the MIT licensed continuation built from [`@openng/icons`](https://github.com/openng-org/icons). It has the same icons with an `openng` prefix instead of `prime`, so `primeAddressBook` becomes `openngAddressBook`, and both packages can be installed side by side while you migrate. See [ng-icons#268](https://github.com/ng-icons/ng-icons/issues/268) for the discussion.
