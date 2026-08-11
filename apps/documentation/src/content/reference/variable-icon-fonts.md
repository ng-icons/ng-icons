---
title: Variable icon fonts
section: Experimental
order: 14
lead: Variable icon fonts are supported through ng-glyph, currently for the Material Symbols icon set only.
---

Unlike the static SVG icons, the icon font is not bundled. Install it and load the `material-symbols` stylesheet yourself, then register the variable fonts you want to use. The first one registered becomes the default.

```ts
import { provideNgGlyphs } from '@ng-icons/core';
import { withMaterialSymbolsOutlined, withMaterialSymbolsRounded } from '@ng-icons/material-symbols';

bootstrapApplication(App, {
  providers: [provideNgGlyphs(withMaterialSymbolsOutlined(), withMaterialSymbolsRounded())],
});
```

```html
<ng-glyph name="settings" />
```

## Inputs

| Name          | Type               | Description                                                                  |
| ------------- | ------------------ | ---------------------------------------------------------------------------- |
| `name`        | `string`           | The name of the icon.                                                        |
| `glyphset`    | `string`           | The glyphset to use. Defaults to the first registered glyphset.              |
| `size`        | `string \| number` | The size as a pixel value or a CSS value. Defaults to the current text size. |
| `opticalSize` | `number`           | The optical size in px. Defaults to 20.                                      |
| `color`       | `string`           | The colour of the icon. Defaults to the current text colour.                 |
| `weight`      | `number`           | The weight of the icon. Defaults to 400.                                     |
| `grade`       | `number`           | The grade of the icon. Defaults to 0.                                        |
| `fill`        | `boolean`          | Whether the icon should be filled. Defaults to false.                        |

<blockquote class="warning">
This feature is experimental and does not follow the same versioning as the rest of the library. Feedback is welcome.
</blockquote>
