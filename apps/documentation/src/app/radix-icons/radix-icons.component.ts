import { Component } from '@angular/core';
import * as radixIcons from '@ng-icons/radix-icons';
import { IconPageDirective } from '../shared/components/icon-page/icon-page.component';

@Component({
  selector: 'app-radix-icons',
  templateUrl: '../shared/components/icon-page/icon-page.component.html',
})
export class RadixIconsComponent extends IconPageDirective {
  iconset = radixIcons;
  library = 'radix-icons';
  website = 'https://icons.modulz.app/';
  license = 'MIT';
}
