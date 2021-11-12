import { Component } from '@angular/core';
import { IconPageDirective } from '../shared/components/icon-page/icon-page.component';
import * as cssGgIcons from '@ng-icons/css.gg';

@Component({
  selector: 'app-css-gg',
  templateUrl: '../shared/components/icon-page/icon-page.component.html',
})
export class CssGgComponent extends IconPageDirective {
  iconset = cssGgIcons;
  library = 'css.gg';
  website = 'https://css.gg/';
  license = 'MIT';
}
