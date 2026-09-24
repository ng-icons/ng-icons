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

If your policy enforces Trusted Types (`require-trusted-types-for 'script'`), Ng Icons creates a Trusted Types policy named `ng-icons` to insert the SVG markup. Allow it alongside any other policies your application uses:

```
Content-Security-Policy: require-trusted-types-for 'script'; trusted-types angular ng-icons
```

The policy passes markup through unchanged. Icons registered with `provideIcons` are constants bundled with your application, but markup returned from `provideNgIconLoader` or passed to the `svg` input is inserted as-is, so only use sources you trust.
