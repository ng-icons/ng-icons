---
title: Icon stacking
section: Experimental
order: 12
lead: Icon stacking layers several icons on top of each other, which is useful for building a composite icon out of simpler ones.
---

```html
<ng-icon-stack size="32px">
  <ng-icon name="faCircle" />
  <ng-icon name="faFlag" size="16px" />
</ng-icon-stack>
```

The size must be set on `ng-icon-stack`. Icons inside the stack inherit that size unless they override it.

<blockquote class="warning">
This feature is experimental and does not follow the same versioning as the rest of the library. Breaking changes may be introduced at any time.
</blockquote>
