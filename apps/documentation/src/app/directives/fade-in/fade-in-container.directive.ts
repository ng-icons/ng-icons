import {
  AfterContentInit,
  ContentChildren,
  Directive,
  QueryList,
} from '@angular/core';
import { FadeInDirective } from './fade-in.directive';

@Directive({
  selector: '[appFadeInContainer]',
  standalone: true,
})
export class FadeInContainerDirective implements AfterContentInit {
  @ContentChildren(FadeInDirective)
  fadeInDirectives?: QueryList<FadeInDirective>;

  ngAfterContentInit(): void {
    this.fadeInDirectives?.forEach((directive, index) => {
      directive.delay = (index + 1) * 250;
    });
  }
}
