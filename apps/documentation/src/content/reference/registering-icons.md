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
