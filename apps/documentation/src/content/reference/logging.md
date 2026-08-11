---
title: Logging
section: Configuration
order: 12
lead: By default, warnings and errors are logged to the console, most commonly when an icon is used without being registered.
---

For stricter checks, enable the exception logger. It throws an error instead of logging a warning, so a missing icon fails loudly in development and in tests.

```ts
import { provideNgIconsConfig, withExceptionLogger } from '@ng-icons/core';

bootstrapApplication(App, {
  providers: [provideNgIconsConfig({}, withExceptionLogger())],
});
```
