---
title: Quick start
section: Getting started
order: 3
lead: Register an icon in a component, then reference it by name in the template. That is the whole workflow.
---

## Install

```bash
ng add @ng-icons/core
```

The schematic installs the core package and prompts you for the icon sets you want. See [Installation](/docs/installation) for the manual equivalent.

## Find an icon

Search the browser across every set at once, or narrow to the sets you already use. Each icon shows its constant name, its package and a ready-made import.

## Register it where you need it

`provideIcons` can be placed anywhere providers are accepted. The component providers array is usually the best place, because the icon is then registered only for the component that uses it.

```ts
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';

@Component({
  imports: [NgIcon],
  providers: [provideIcons({ featherAirplay })],
  template: `<ng-icon name="featherAirplay" />`,
})
export class Player {}
```

<blockquote class="warning">
The name in the template must match the key you registered. If it does not, the icon renders nothing and a warning is logged to the console.
</blockquote>
