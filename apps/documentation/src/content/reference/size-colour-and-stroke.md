---
title: Size, colour and stroke
section: Usage
order: 6
lead: Icons inherit the current font size and text colour by default, so most of the time you do not need to set anything at all.
---

```html
<ng-icon name="heroUsers" size="2rem" color="var(--brand)" /> <ng-icon name="featherAirplay" strokeWidth="1.5" />
```

## Setting defaults globally

`provideNgIconsConfig` sets the defaults used by every icon in the application. Add it where you bootstrap, usually `main.ts`:

```ts
import { provideNgIconsConfig } from '@ng-icons/core';

bootstrapApplication(App, {
  providers: [
    provideNgIconsConfig({
      size: '1.5em',
      color: 'red',
    }),
  ],
});
```

<blockquote class="warning">
strokeWidth only has an effect on icon sets drawn with strokes, such as Feather or Lucide. It does nothing on filled sets.
</blockquote>
