import * as iconset from '@ng-icons/typicons';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-typicons',
  templateUrl: './typicons.component.html',
  styleUrls: ['./typicons.component.css'],
})
export class TypiconsComponent {
  iconset = iconset;
}
