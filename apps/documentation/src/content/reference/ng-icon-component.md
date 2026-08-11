---
title: The ng-icon component
section: Usage
order: 4
lead: NgIcon renders a registered icon by name. Add it to a component's imports, or use the NG_ICON_DIRECTIVES constant.
---

```ts
import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  imports: [NgIcon],
  template: `<ng-icon name="heroUsers" />`,
})
export class Profile {}
```

## Inputs

| Name          | Type               | Description                                                             |
| ------------- | ------------------ | ----------------------------------------------------------------------- |
| `name`        | `string`           | The name of a registered icon.                                          |
| `svg`         | `string`           | An SVG string to render directly, instead of a registered icon.         |
| `size`        | `string`           | The size of the icon. Defaults to the current font size.                |
| `color`       | `string`           | The colour of the icon. Defaults to the current text colour.            |
| `strokeWidth` | `string \| number` | The stroke width of the icon. Only works on icon sets that use strokes. |

> Only icons from Angular Icons icon sets support the `color`, `size` and `strokeWidth` inputs.
