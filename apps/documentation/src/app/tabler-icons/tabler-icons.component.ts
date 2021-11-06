import { Component } from '@angular/core';
import * as tablerIcons from '@ng-icons/tabler-icons';
import { map } from 'rxjs/operators';
import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'app-tabler-icons',
  templateUrl: './tabler-icons.component.html',
  styleUrls: ['./tabler-icons.component.css'],
})
export class TablerIconsComponent {
  icons$ = this.searchService.search$.pipe(
    map(query =>
      Object.keys(tablerIcons).filter(key =>
        key.toLowerCase().includes(query.toLowerCase()),
      ),
    ),
  );

  constructor(private readonly searchService: SearchService) {}

  trackByFn(_: number, name: string): string {
    return name;
  }
}
