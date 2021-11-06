import { Component } from '@angular/core';
import * as radixIcons from '@ng-icons/radix-icons';
import { map } from 'rxjs/operators';
import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'app-radix-icons',
  templateUrl: './radix-icons.component.html',
  styleUrls: ['./radix-icons.component.css'],
})
export class RadixIconsComponent {
  icons$ = this.searchService.search$.pipe(
    map(query =>
      Object.keys(radixIcons).filter(key =>
        key.toLowerCase().includes(query.toLowerCase()),
      ),
    ),
  );

  constructor(private readonly searchService: SearchService) {}

  trackByFn(_: number, name: string): string {
    return name;
  }
}
