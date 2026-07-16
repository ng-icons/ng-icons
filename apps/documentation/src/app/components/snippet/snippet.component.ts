import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-snippet',
  imports: [],
  templateUrl: './snippet.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./snippet.component.scss'],
})
export class SnippetComponent {}
