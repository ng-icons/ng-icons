import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import md from '!!html-loader!markdown-loader!../../../../../README.md';
import { DomSanitizer } from '@angular/platform-browser';
import hljs from 'highlight.js';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GettingStartedComponent implements AfterViewInit {
  content = this.domSanitizer.bypassSecurityTrustHtml(md);

  constructor(private readonly domSanitizer: DomSanitizer) {}

  ngAfterViewInit(): void {
    hljs.highlightAll();
  }
}
