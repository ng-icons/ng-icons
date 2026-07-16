import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  PLATFORM_ID,
  viewChildren,
} from '@angular/core';

@Component({
  selector: 'app-segment',
  imports: [],
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss'],
})
export class SegmentComponent implements OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly selectedIndex = model(0);

  readonly options = input<string[]>([]);

  /** Access the options */
  readonly optionElements = viewChildren<ElementRef<HTMLElement>>('option');

  readonly activeOption = computed(
    () => this.optionElements()[this.selectedIndex()],
  );

  private readonly resizeObserver?: ResizeObserver;

  constructor() {
    // this is required to ensure the width is correctly calculated after rendering
    afterNextRender(() => this.changeDetector.detectChanges());

    if (isPlatformBrowser(this.platformId)) {
      this.resizeObserver = new ResizeObserver(() =>
        this.changeDetector.detectChanges(),
      );

      this.resizeObserver.observe(this.elementRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  select(index: number): void {
    this.selectedIndex.set(index);
  }
}
