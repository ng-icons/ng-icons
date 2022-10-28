import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appFadeIn]',
  standalone: true,
  host: {
    '[class.fade-in]': 'true',
  },
})
export class FadeInDirective {
  @HostBinding('style.animation-delay.ms')
  delay = 0;
}
