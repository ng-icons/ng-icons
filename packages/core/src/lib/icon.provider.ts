import { InjectionToken, Provider } from '@angular/core';
import { IconService } from './icon.service';

export function provideIcons(icons: Record<string, string>): Provider[] {
  return [
    {
      provide: ICONS_TOKEN,
      useFactory: () => IconService.addIcons(icons),
    },
  ];
}

const ICONS_TOKEN = new InjectionToken('noop icons token');
