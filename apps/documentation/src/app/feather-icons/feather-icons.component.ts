import { Component } from '@angular/core';
import * as featherIcons from '@ng-icons/feather-icons';
import { map } from 'rxjs/operators';
import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'app-feather-icons',
  templateUrl: './feather-icons.component.html',
  styleUrls: ['./feather-icons.component.scss'],
})
export class FeatherIconsComponent {
  icons$ = this.searchService.search$.pipe(
    map(query =>
      Object.keys(featherIcons).filter(key =>
        key.toLowerCase().includes(query.toLowerCase()),
      ),
    ),
  );

  constructor(private readonly searchService: SearchService) {}

  trackByFn(_: number, name: string): string {
    return name;
  }
}
