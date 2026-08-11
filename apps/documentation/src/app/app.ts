import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommandPalette } from './components/command-palette';
import { MobileNav } from './components/mobile-nav';
import { SiteHeader } from './components/site-header';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, SiteHeader, MobileNav, CommandPalette],
  template: `
    <app-site-header (menu)="navOpen.set(true)" (openSearch)="openPalette()" />

    @if (navOpen()) {
      <app-mobile-nav (closed)="navOpen.set(false)" />
    }

    <router-outlet />

    @if (paletteOpen()) {
      <app-command-palette (closed)="paletteOpen.set(false)" />
    }
  `,
  host: { class: 'block min-h-screen bg-bg-0 text-strong' },
})
export class App {
  protected readonly navOpen = signal(false);
  protected readonly paletteOpen = signal(false);

  /**
   * Only one overlay at a time.
   *
   * On a narrow viewport the drawer and the palette could both be open, and
   * choosing a result closed only the palette: the drawer was left sitting over
   * the page that had just been navigated to.
   */
  protected openPalette(): void {
    this.navOpen.set(false);
    this.paletteOpen.set(true);
  }

  @HostListener('document:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (this.paletteOpen()) {
        this.paletteOpen.set(false);
      } else {
        this.openPalette();
      }
    }
    if (event.key === 'Escape') {
      this.paletteOpen.set(false);
      this.navOpen.set(false);
    }
  }
}
