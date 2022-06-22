import { Provider } from '@angular/core';
import { IconService } from './icon.service';

export function provideIcons(icons: Record<string, string>): Provider[] {
  IconService.addIcons(icons);

  return [];
}
