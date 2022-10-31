import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { SegmentComponent } from '../components/segment/segment.component';
import { SnippetComponent } from '../components/snippet/snippet.component';
import { TerminalComponent } from '../components/terminal/terminal.component';
import { FadeInContainerDirective } from '../directives/fade-in/fade-in-container.directive';
import { FadeInDirective } from '../directives/fade-in/fade-in.directive';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    TerminalComponent,
    SnippetComponent,
    FadeInContainerDirective,
    FadeInDirective,
    SegmentComponent,
  ],
})
export class GettingStartedComponent {
  selectedIndex = 0;

  year = new Date().getFullYear();
}
