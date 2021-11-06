import { Component } from '@angular/core';
import * as octIcons from '@ng-icons/octicons';
import { map } from 'rxjs/operators';
import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'app-octicons',
  templateUrl: './octicons.component.html',
  styleUrls: ['./octicons.component.css'],
})
export class OcticonsComponent {
  icons$ = this.searchService.search$.pipe(
    map(query =>
      Object.keys(octIcons).filter(key =>
        key.toLowerCase().includes(query.toLowerCase()),
      ),
    ),
  );

  constructor(private readonly searchService: SearchService) {}

  trackByFn(_: number, name: string): string {
    return name;
  }
}
