import { Directive } from '@angular/core';
import { map } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import { Dialog } from '@angular/cdk-experimental/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Directive({
  selector: '[appIconPage]',
})
export abstract class IconPageDirective {
  abstract library: string;
  abstract website: string;
  abstract license: string;
  abstract iconset: Record<string, string>;

  icons$ = this.searchService.search$.pipe(
    map(query =>
      Object.keys(this.iconset).filter(key =>
        key.toLowerCase().includes(query.toLowerCase()),
      ),
    ),
  );

  constructor(
    private readonly searchService: SearchService,
    private readonly dialog: Dialog,
  ) {}

  trackByFn(_: number, name: string): string {
    return name;
  }

  showDialog(icon: string): void {
    this.dialog.openFromComponent(DialogComponent, {
      data: {
        icon,
        library: this.library,
      },
    });
  }
}
