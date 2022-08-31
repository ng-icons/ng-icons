import { Dialog } from '@angular/cdk/dialog';
import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-icon-page',
  templateUrl: './icon-page.component.html',
  styleUrls: ['./icon-page.component.scss'],
})
export class IconPageComponent {
  @Input() name!: string;
  @Input() library!: string;
  @Input() website!: string;
  @Input() license!: string;
  @Input() iconset!: Record<string, string>;

  icons$ = this.searchService.search$.pipe(
    map(query =>
      Object.keys(this.iconset).filter(icon =>
        icon.toLowerCase().includes(query.toLowerCase()),
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
    this.dialog.open(DialogComponent, {
      data: {
        icon,
        library: this.library,
      },
    });
  }
}
