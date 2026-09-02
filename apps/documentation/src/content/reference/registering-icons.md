---
title: Registering icons
section: Usage
order: 5
lead: Icons are plain constants. provideIcons registers them under the names you give, and the injector resolves them when a template asks for one.
---

```ts
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { heroUsers } from '@ng-icons/heroicons/outline';

@Component({
  imports: [NgIcon],
  providers: [provideIcons({ featherAirplay, heroUsers })],
})
export class App {}
```

## Where to register

`provideIcons` can be placed anywhere you can register providers. Registering in a component keeps the icon scoped to that component and lets the bundler split it out with the component itself. Registering at the application level makes an icon available everywhere.

## Renaming an icon

The keys you pass are the names used in templates, so an icon can be registered under a name that suits your application.

```ts
providers: [provideIcons({ menu: featherMenu })];
```

## Name autocomplete

The `name` input suggests the icons you have installed. Each icon package contributes its names to the `NgIconNameMap` interface in `@ng-icons/core`, so the suggestions follow your imports: install `@ng-icons/heroicons` and import from `@ng-icons/heroicons/outline`, and that entry point's icons are offered. Icons from sets you have not installed are not.

Any string is still accepted. A renamed icon, an icon fetched by an [icon loader](/docs/icon-loaders), or one from your own set will never appear in a package's names, and none of them are errors.

Two types come out of this, and they answer different questions:

| Type       | Contains                          | Use it when                                                             |
| ---------- | --------------------------------- | ----------------------------------------------------------------------- |
| `IconName` | Only the icons you have imported  | You want a name checked, e.g. a constant or a lookup table              |
| `IconType` | `IconName`, plus any other string | You accept a name you cannot know ahead of time, e.g. one from a loader |

`name` is an `IconType`, which is why a template never fails on an unknown name. `IconName` falls back to `string` when you have imported no icon package at all, so a project that renders everything through a loader is not left with an unusable type.

> If a set's names do not appear straight after you first import it, restart the TypeScript server in your editor. The names arrive through a type declaration, and editors do not always pick that up until the project is reloaded.

To get the same suggestions for your own icons, add their names to the interface once, anywhere in your application:

```ts
declare module '@ng-icons/core' {
  interface NgIconNameMap {
    companyLogo: true;
    menu: true;
  }
}
```
