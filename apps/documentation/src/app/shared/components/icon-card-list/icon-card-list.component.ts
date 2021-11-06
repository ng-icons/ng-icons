import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-icon-card-list',
  templateUrl: './icon-card-list.component.html',
  styleUrls: ['./icon-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconCardListComponent {}
