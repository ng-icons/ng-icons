import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * /docs on its own has nothing to show, so it lands on the introduction.
 *
 * A component rather than a `redirectTo` route: Analog's route metadata cannot
 * set `pathMatch`, which an empty-path redirect beneath a layout needs.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
})
export default class DocsIndexPage {
  constructor() {
    void inject(Router).navigate(['/docs/introduction'], { replaceUrl: true });
  }
}
