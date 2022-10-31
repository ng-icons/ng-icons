import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-segment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss'],
})
export class SegmentComponent {
  @Input() selectedIndex = 0;

  @Input() options: string[] = [];

  @Output() readonly selectedIndexChange = new EventEmitter<number>();

  /** Access the options */
  @ViewChildren('option') optionsElements?: QueryList<ElementRef<HTMLElement>>;

  get activeOption(): ElementRef<HTMLElement> | undefined {
    return this.optionsElements?.toArray()[this.selectedIndex];
  }

  select(index: number): void {
    this.selectedIndex = index;
    this.selectedIndexChange.emit(index);
  }
}
