import { Component } from '@angular/core';
import { SnippetComponent } from '../components/snippet/snippet.component';
import { TerminalComponent } from '../components/terminal/terminal.component';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
  standalone: true,
  imports: [TerminalComponent, SnippetComponent],
})
export class GettingStartedComponent {}
