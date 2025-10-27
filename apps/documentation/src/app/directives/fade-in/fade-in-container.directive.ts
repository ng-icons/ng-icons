import { contentChildren, Directive, effect } from '@angular/core';
import { FadeInDirective } from './fade-in.directive';

@Directive({
  selector: '[appFadeInContainer]',
  standalone: true,
})
export class FadeInContainerDirective {
  fadeInDirectives = contentChildren<FadeInDirective>(FadeInDirective);

  constructor() {
    effect(() => {
      this.fadeInDirectives().forEach((directive, index) => {
        directive.delay.set((index + 1) * 50);
      });
    });
  }
}
