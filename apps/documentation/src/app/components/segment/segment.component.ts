import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  viewChildren,
} from '@angular/core';

@Component({
  selector: 'app-segment',
  imports: [CommonModule],
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss'],
})
export class SegmentComponent {
  private readonly changeDetector = inject(ChangeDetectorRef);

  readonly selectedIndex = model(0);

  readonly options = input<string[]>([]);

  /** Access the options */
  readonly optionElements = viewChildren<ElementRef<HTMLElement>>('option');

  readonly activeOption = computed(
    () => this.optionElements()[this.selectedIndex()],
  );

  constructor() {
    // this is required to ensure the width is correctly calculated after rendering
    afterNextRender(() => this.changeDetector.detectChanges());
  }

  select(index: number): void {
    this.selectedIndex.set(index);
  }
}
