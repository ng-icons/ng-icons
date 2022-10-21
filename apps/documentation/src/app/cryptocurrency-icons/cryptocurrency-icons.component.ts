import { Component } from '@angular/core';
import * as iconset from '@ng-icons/cryptocurrency-icons';
@Component({
  selector: 'app-cryptocurrency-icons',
  templateUrl: './cryptocurrency-icons.component.html',
  styleUrls: ['./cryptocurrency-icons.component.css'],
})
export class CryptocurrencyIconsComponent {
  iconset = iconset;
}
