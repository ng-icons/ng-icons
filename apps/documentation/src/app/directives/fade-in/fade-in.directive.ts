import { Directive, signal } from '@angular/core';

@Directive({
  selector: '[appFadeIn]',
  standalone: true,
  host: {
    '[class.fade-in]': 'true',
    '[style.animation-delay.ms]': 'delay()',
  },
})
export class FadeInDirective {
  delay = signal(0);
}
