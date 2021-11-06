import { Component } from '@angular/core';
import * as jamIcons from '@ng-icons/jam-icons';
import { map } from 'rxjs/operators';
import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'app-jam-icons',
  templateUrl: './jam-icons.component.html',
  styleUrls: ['./jam-icons.component.css'],
})
export class JamIconsComponent {
  icons$ = this.searchService.search$.pipe(
    map(query =>
      Object.keys(jamIcons).filter(key =>
        key.toLowerCase().includes(query.toLowerCase()),
      ),
    ),
  );

  constructor(private readonly searchService: SearchService) {}

  trackByFn(_: number, name: string): string {
    return name;
  }
}
