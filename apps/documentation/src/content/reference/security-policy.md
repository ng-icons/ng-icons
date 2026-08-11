---
title: Content Security Policy
section: Configuration
order: 11
lead: If your application has a strict Content Security Policy, add withContentSecurityPolicy to your configuration to avoid errors.
---

```ts
import { provideNgIconsConfig, withContentSecurityPolicy } from '@ng-icons/core';

bootstrapApplication(App, {
  providers: [provideNgIconsConfig({}, withContentSecurityPolicy())],
});
```
