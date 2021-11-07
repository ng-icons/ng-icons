import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'a[app-sidebar-item]',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarItemComponent {
  /**
   * The icon to display.
   */
  @Input() icon!: string;
}
