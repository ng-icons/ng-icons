import { Component } from '@angular/core';
import * as featherIcons from '@ng-icons/feather-icons';
import * as heroIcons from '@ng-icons/heroicons';

@Component({
  selector: 'ng-icons-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly featherIcons: Record<string, string> = featherIcons;
  readonly heroIcons: Record<string, string> = heroIcons;
}
