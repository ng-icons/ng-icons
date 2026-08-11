---
title: Introduction
section: Getting started
order: 1
lead: Angular Icons is the all-in-one icon library for Angular. It lets you use icons from dozens of icon sets through a single component, with more than 100,000 icons available.
---

Every icon set is published as its own package. You install the core package once, add the sets you want, and register the individual icons you use. Nothing you do not register reaches your bundle.

## How it fits together

The core package provides the `NgIcon` component and the functions used to register icons and configure defaults. Icon set packages export each icon as a named constant containing its SVG.

```ts
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { heroUsers } from '@ng-icons/heroicons/outline';
```

> Icons render as inline SVG. There are no icon fonts, sprite sheets or network requests unless you choose to load icons dynamically.

## Browser support

Angular Icons relies on modern browser features and is designed to work on evergreen browsers. Older browsers such as IE11 are not supported.
