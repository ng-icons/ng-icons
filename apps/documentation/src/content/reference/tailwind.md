---
title: Tailwind CSS
section: Usage
order: 7
lead: Tailwind's text colour utilities work on an ng-icon, but only once ng-icons' cascade layer is declared in the right place. Sizing utilities never apply, and there is a reason for that too.
---

```html
<ng-icon name="heroUsers" class="text-red-500 hover:text-red-700" />
```

## Colour icons with text utilities

Colour icons with `text-*`, not `stroke-*` or `fill-*`. Every icon in every set is normalised to `currentColor` when it is generated, so a text colour reaches all of them. Sets are not drawn the same way: some use strokes, some use fills, and often both within one icon, so a `stroke-*` utility would colour part of some sets and nothing at all in others.

Inheriting the text colour also means an icon looks right inside a button or a heading without you setting anything.

## Declare the ng-icon layer

`@ng-icons/core` styles the component like this:

```css
@layer ng-icon {
  :host {
    color: var(--ng-icon__color, currentColor);
  }
}
```

The layer exists so that your own styles win. Any declaration outside a layer beats one inside it, however specific each is, so a plain `color` in a global stylesheet overrides the component without `!important`.

Tailwind 4 puts its utilities in real cascade layers, which changes the picture. A layer's precedence comes from **where it is first declared**, not from where its rules are written, and Angular injects component styles after your stylesheet has loaded. If `ng-icon` is first declared by the component, it lands above Tailwind's `utilities` layer and wins every `text-*` class. Icons then silently fall back to inheriting their parent's colour.

Naming the layer before importing Tailwind fixes it, because that is where its position is decided:

```css
@layer ng-icon;
@import 'tailwindcss';
```

That single line is the whole integration. Nothing else needs configuring.

### Tailwind 3

Tailwind 3 emits `@tailwind utilities` outside any native cascade layer, so its utilities already beat the layered declaration and there is nothing to do.

The exception is if you have wrapped Tailwind in explicit layers yourself, which is common when pairing it with a component library. List `ng-icon` first:

```css
@layer ng-icon, tailwind-base, primeng, tailwind-utilities;

@layer tailwind-base {
  @tailwind base;
}

@layer tailwind-utilities {
  @tailwind components;
  @tailwind utilities;
}
```

## Sizing needs the input, not a utility

`size-*`, `w-*` and `h-*` have no effect on an `ng-icon`. Only the colour declaration is inside the layer; the component sets its own width and height outside one, so those declarations beat any utility class:

```css
:host {
  width: var(--ng-icon__size, 1em);
  height: var(--ng-icon__size, 1em);
}
```

Use the `size` input, which accepts any CSS length:

```html
<ng-icon name="heroUsers" size="2rem" />
```

Or set the custom property, which an arbitrary-property utility can do inline, including at a breakpoint:

```html
<ng-icon name="heroUsers" class="[--ng-icon__size:1.25rem] md:[--ng-icon__size:2rem]" />
```

Because the default is `1em`, `text-lg` and friends already scale an icon along with the text around it. Reach for an explicit size only when an icon should not track its surrounding type.

<blockquote class="warning">
Stroke width is written as an inline style on the icon's SVG, so Tailwind's stroke utilities cannot override it whichever element they land on. Use the strokeWidth input or the --ng-icon__stroke-width custom property instead.
</blockquote>

## When a colour class does nothing

Check the order of the layers rather than the class. In the browser's style inspector the `color` declaration on the host will show as winning from `@layer ng-icon`, with your `text-*` class listed below it as overridden. That means the layer was first declared by the component, so move the `@layer ng-icon;` statement above your Tailwind import.

It is worth pinning this down in a test if you can, because nothing fails loudly when it regresses: icons keep rendering, just in the wrong colour.
