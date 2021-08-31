import { Clipboard } from '@angular/cdk/clipboard';
import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import * as featherIcons from '@ng-icons/feather-icons';
import * as heroIcons from '@ng-icons/heroicons';
import * as jamIcons from '@ng-icons/jam-icons';
import * as octIcons from '@ng-icons/octicons';
import * as radixIcons from '@ng-icons/radix-icons';
import { dasherize } from './pipes/dasherize.pipe';

@Component({
  selector: 'ng-icons-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly iconsets = [
    {
      title: 'Feather Icons',
      icons: featherIcons,
    },
    {
      title: 'Herocons',
      icons: heroIcons,
    },
    {
      title: 'Jam Icons',
      icons: jamIcons,
    },
    {
      title: 'Octicons',
      icons: octIcons,
    },
    {
      title: 'Radix UI Icons',
      icons: radixIcons,
    },
  ];

  filter = '';

  constructor(private readonly clipboard: Clipboard) {}

  trackBy(_: number, icon: KeyValue<string, unknown>): string {
    return icon.key;
  }

  copy(icon: string): void {
    this.clipboard.copy(`<ng-icon name="${dasherize(icon)}"></ng-icon>`);
  }
}
