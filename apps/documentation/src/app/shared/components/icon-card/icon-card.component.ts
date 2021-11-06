import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-card',
  templateUrl: './icon-card.component.html',
  styleUrls: ['./icon-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconCardComponent {
  /**
   * Icon name
   */
  @Input() icon!: string;
}
