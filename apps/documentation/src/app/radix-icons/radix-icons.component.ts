import { Component } from '@angular/core';
import * as radixIcons from '@ng-icons/radix-icons';

@Component({
  selector: 'app-radix-icons',
  templateUrl: './radix-icons.component.html',
  styleUrls: ['./radix-icons.component.css'],
})
export class RadixIconsComponent {
  icons = radixIcons;
}
