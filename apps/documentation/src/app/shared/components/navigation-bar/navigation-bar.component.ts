import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarComponent {
  constructor(public readonly searchService: SearchService) {}
}
