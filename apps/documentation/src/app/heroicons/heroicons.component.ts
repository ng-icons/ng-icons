import { Component } from '@angular/core';
import * as heroIcons from '@ng-icons/heroicons';
import { SearchService } from '../shared/services/search.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-heroicons',
  templateUrl: './heroicons.component.html',
  styleUrls: ['./heroicons.component.scss'],
})
export class HeroiconsComponent {
  icons$ = this.searchService.search$.pipe(
    map(query =>
      Object.keys(heroIcons).filter(key =>
        key.toLowerCase().includes(query.toLowerCase()),
      ),
    ),
  );

  constructor(private readonly searchService: SearchService) {}

  trackByFn(_: number, name: string): string {
    return name;
  }
}
