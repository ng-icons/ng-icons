import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

/**
 * Renders one of the browsed icons from its SVG string.
 *
 * `NgIcon`'s `svg` input takes the markup directly, which is exactly what the
 * catalog serves, so no registration is needed for the 100,000+ icons a visitor
 * might look at.
 */
@Component({
  selector: 'app-svg-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  template: `
    @if (svg()) {
      <ng-icon [svg]="svg()!" [size]="size() + 'px'" aria-hidden="true" />
    } @else {
      <span
        class="skeleton block rounded"
        [style.width.px]="size()"
        [style.height.px]="size()"
      ></span>
    }
  `,
  host: { class: 'flex shrink-0' },
})
export class SvgIcon {
  readonly svg = input<string | undefined>();
  readonly size = input(24);
}
