import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ng-icon-stack',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './icon-stack.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--ng-icon__size]': 'size()',
  },
})
export class NgIconStack {
  /** The size of the child icons */
  readonly size = input.required<string>();
}
