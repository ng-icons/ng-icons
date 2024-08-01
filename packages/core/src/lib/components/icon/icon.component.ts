import { isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
  runInInjectionContext,
} from '@angular/core';
import type { IconName } from '../../components/icon/icon-name';
import {
  injectNgIconPostProcessor,
  injectNgIconPreProcessor,
} from '../../providers/features/csp';
import { injectLogger } from '../../providers/features/logger';
import { injectNgIconConfig } from '../../providers/icon-config.provider';
import {
  injectNgIconLoader,
  injectNgIconLoaderCache,
} from '../../providers/icon-loader.provider';
import { injectNgIcons } from '../../providers/icon.provider';
import { coerceLoaderResult } from '../../utils/async';
import { coerceCssPixelValue } from '../../utils/coercion';
import { toPropertyName } from '../../utils/format';

// This is a typescript type to prevent inference from collapsing the union type to a string to improve type safety
// eslint-disable-next-line @typescript-eslint/ban-types
export type IconType = IconName | (string & {});

@Component({
  selector: 'ng-icon',
  template: '',
  standalone: true,
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--ng-icon__stroke-width]': 'strokeWidth()',
    '[style.--ng-icon__size]': 'size()',
    '[style.color]': 'color()',
  },
})
export class NgIcon implements OnDestroy {
  /** Access the global icon config */
  private readonly config = injectNgIconConfig();

  /** Access the icons */
  private readonly icons = injectNgIcons();

  /** Access the icon loader if defined */
  private readonly loader = injectNgIconLoader();

  /** Access the icon cache if defined */
  private readonly cache = injectNgIconLoaderCache();

  /** Access the pre-processor */
  private readonly preProcessor = injectNgIconPreProcessor();

  /** Access the post-processor */
  private readonly postProcessor = injectNgIconPostProcessor();

  /** Access the injector */
  private readonly injector = inject(Injector);

  /** Access the renderer */
  private readonly renderer = inject(Renderer2);

  /** Determine the platform we are rendering on */
  private readonly platform = inject(PLATFORM_ID);

  /** Access the element ref */
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Access the logger */
  private readonly logger = injectLogger();

  /** Define the name of the icon to display */
  readonly name = input<IconType>();

  /** Define the svg of the icon to display */
  readonly svg = input<string>();

  /** Define the size of the icon */
  readonly size = input(this.config.size, { transform: coerceCssPixelValue });

  /** Define the stroke-width of the icon */
  readonly strokeWidth = input<string | number>();

  /** Define the color of the icon */
  readonly color = input(this.config.color);

  /** Store the inserted SVG */
  private svgElement?: SVGElement;

  constructor() {
    // update the icon anytime the name or svg changes
    effect(() => this.updateIcon());
  }

  ngOnDestroy(): void {
    this.svgElement = undefined;
  }

  private async updateIcon(): Promise<void> {
    const name = this.name();
    const svg = this.svg();

    // if the svg is defined, insert it into the template
    if (svg !== undefined) {
      this.setSvg(svg);
      return;
    }

    if (name === undefined) {
      return;
    }

    const propertyName = toPropertyName(name);

    for (const icons of [...this.icons].reverse()) {
      if (icons[propertyName]) {
        // insert the SVG into the template
        this.setSvg(icons[propertyName]);
        return;
      }
    }

    // if there is a loader defined, use it to load the icon
    if (this.loader) {
      const result = await this.requestIconFromLoader(name);

      // if the result is a string, insert the SVG into the template
      if (result !== null) {
        this.setSvg(result);
        return;
      }
    }

    // if there is no icon with this name warn the user as they probably forgot to import it
    this.logger.warn(
      `No icon named ${name} was found. You may need to import it using the withIcons function.`,
    );
  }

  private setSvg(svg: string): void {
    // if we are on the server, simply innerHTML the svg as we don't have the
    // level of control over the DOM that we do on the client, in otherwords
    // the approach we take to insert the svg on the client will not work on the server
    if (isPlatformServer(this.platform)) {
      this.elementRef.nativeElement.innerHTML = svg;
      return;
    }

    // remove the old element
    if (this.svgElement) {
      this.renderer.removeChild(this.elementRef.nativeElement, this.svgElement);
    }

    // if the svg is empty, don't insert anything
    if (svg === '') {
      return;
    }

    const template: HTMLTemplateElement =
      this.renderer.createElement('template');
    this.renderer.setProperty(template, 'innerHTML', this.preProcessor(svg));

    this.svgElement = template.content.firstElementChild as SVGElement;
    this.postProcessor(this.svgElement);

    // insert the element into the dom
    this.renderer.appendChild(this.elementRef.nativeElement, this.svgElement);
  }

  /**
   * Request the icon from the loader.
   * @param name The name of the icon to load.
   * @returns The SVG content for a given icon name.
   */
  private requestIconFromLoader(name: string): Promise<string> {
    return new Promise(resolve => {
      runInInjectionContext(this.injector, async () => {
        // if we have a cache, check if the icon is already loaded (i.e, it is a string)
        if (this.cache) {
          const cachedResult = this.cache.get(name);

          if (typeof cachedResult === 'string') {
            resolve(cachedResult);
            return;
          }

          // it may be a promise, so we need to await it
          if (cachedResult instanceof Promise) {
            const result = await cachedResult;
            resolve(result);
            return;
          }
        }

        const promise = coerceLoaderResult(this.loader!(name));

        // store the promise in the cache so if we get repeated calls (e.g. in a loop) before the loader has resolved
        // then don't call the loader function multiple times
        this.cache?.set(name, promise);

        // await the result of the promise
        const result = await promise;

        // if we have a cache, store the result
        this.cache?.set(name, result);

        resolve(result);
      });
    });
  }
}
