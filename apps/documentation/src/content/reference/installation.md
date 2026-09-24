---
title: Installation
section: Getting started
order: 2
lead: Angular Icons ships as a core package plus one package per icon set. Install the core once, then add each set you intend to use.
---

## Add it with the Angular CLI

```bash
ng add @ng-icons/core
```

This installs `@ng-icons/core`, then prompts you to pick the icon sets you want and installs those too. It only adds dependencies, so there is nothing to undo in your own code afterwards.

## Install the core package

If you would rather not use the CLI, install the packages yourself. `@ng-icons/core` is required: it contains the component, the providers and the configuration functions.

```bash
npm i @ng-icons/core
```

## Add the icon sets you need

Each set is a separate package, so nothing you skip ends up in your bundle. Package names are listed on every set page and on every icon in the browser.

```bash
npm i @ng-icons/core @ng-icons/heroicons
```

> Package names do not always match the set name. Material Icons is published as `@ng-icons/material-icons` and Remix Icon as `@ng-icons/remixicon`. Copy the name from the icon panel to be certain.

## Register an icon and render it

Put this in your component, for example `app.ts`:

```ts
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-root',
  imports: [NgIcon],
  providers: [provideIcons({ heroUsers })],
  template: `<ng-icon name="heroUsers" />`,
})
export class App {}
```
