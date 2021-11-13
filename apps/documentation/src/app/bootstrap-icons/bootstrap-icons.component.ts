import { Component } from '@angular/core';
import * as bootstrapIcons from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-bootstrap-icons',
  templateUrl: './bootstrap-icons.component.html',
  styleUrls: ['./bootstrap-icons.component.css'],
})
export class BootstrapIconsComponent {
  iconset = bootstrapIcons;
}
