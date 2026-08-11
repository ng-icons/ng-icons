---
title: Dynamically loading icons
section: Usage
order: 7
lead: Registering icons individually is the most common approach, but you may want to load them lazily from a URL or generate an SVG on the fly. An icon loader does that.
---

## Providing a loader

A loader is a function that receives the name of the requested icon and returns the SVG to render, as a string, a Promise or an Observable. It runs inside the injection context, so you can inject dependencies such as `HttpClient`.

```ts
import { provideNgIconLoader } from '@ng-icons/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

bootstrapApplication(App, {
  providers: [
    provideNgIconLoader(name => {
      const http = inject(HttpClient);
      return http.get(`/assets/icons/${name}.svg`, { responseType: 'text' });
    }),
  ],
});
```

<blockquote class="warning">
A loader does not reduce total bundle size on its own. It makes the icons load lazily, so they may appear blank until they have arrived.
</blockquote>

## Caching results

Add `withCaching` to the loader to avoid requesting the same icon more than once.

```ts
provideNgIconLoader(name => fetchIcon(name), withCaching());
```
