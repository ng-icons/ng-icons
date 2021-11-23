import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  /** Store the available icons. */
  private static icons: Readonly<Record<string, string>> = {};

  /** Access the icons in the class. */
  get icons(): Readonly<Record<string, string>> {
    return IconService.icons;
  }

  /**
   * Insert icons into the iconset
   */
  static addIcons(icons: Record<string, string>): void {
    IconService.icons = { ...IconService.icons, ...icons };
  }
}
