---
title: Global configuration
section: Configuration
order: 9
lead: provideNgIconsConfig sets application-wide defaults for every icon.
---

```ts
import { provideNgIconsConfig } from '@ng-icons/core';

bootstrapApplication(App, {
  providers: [
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
});
```

Individual icons can still override any default by setting the matching input in the template.
