import { afterRenderEffect, signal, type Signal } from '@angular/core';

/**
 * The width below which the side panels are off-canvas drawers.
 *
 * Mirrors `--breakpoint-xl` in styles.css, which every `xl:` class on those
 * panels resolves against. It is not Tailwind's default 1280, and measuring
 * against that marked a panel inert while it was still displayed as a column.
 * `drawer-viewport.spec.ts` keeps the two in step.
 */
export const DRAWER_BELOW = 1180;

/**
 * The width below which the icon sheet slides up from the bottom rather than in
 * from the side.
 *
 * Mirrors `--breakpoint-mob` in styles.css.
 */
export const SHEET_FROM_BOTTOM_BELOW = 860;

/**
 * True while a side panel is a drawer rather than a column beside the content.
 *
 * Both the documentation sidebar and the browse filters are hidden by being
 * translated off screen, which leaves them in the tab order and in the
 * accessibility tree: Tab walked through the links of a docs drawer that looked
 * shut, and through 46 controls of a closed filters drawer. They need `inert`,
 * which is an attribute rather than a style, so the breakpoint has to be
 * measured in script as well as declared in CSS.
 *
 * Starts false so prerendered HTML carries no `inert` for anyone without
 * JavaScript, and the first render corrects it. Must be called in an injection
 * context.
 */
export function injectDrawerViewport(): Signal<boolean> {
  const narrow = signal(false);

  // After-render, so it never runs while prerendering, where there is no window
  // to measure.
  afterRenderEffect(onCleanup => {
    const sync = () => narrow.set(window.innerWidth < DRAWER_BELOW);

    sync();
    window.addEventListener('resize', sync, { passive: true });
    onCleanup(() => window.removeEventListener('resize', sync));
  });

  return narrow.asReadonly();
}
