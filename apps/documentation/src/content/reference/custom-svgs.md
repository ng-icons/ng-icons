---
title: Custom SVGs
section: Usage
order: 9
lead: If you already have an SVG string, set the svg input and skip registration entirely.
---

```ts
import { Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-icon',
  imports: [NgIcon],
  template: `<ng-icon [svg]="icon()" />`,
})
export class Icon {
  icon = input.required<string>();
}
```

This is useful when a parent passes an icon down to a child component, or when the SVG comes from a CMS or an API rather than an icon set.

> Icons supplied this way are rendered as given. The `color`, `size` and `strokeWidth` inputs only apply to icons from Angular Icons icon sets.
