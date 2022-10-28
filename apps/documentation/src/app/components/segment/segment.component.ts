import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-segment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss'],
})
export class SegmentComponent {
  @Input() selectedIndex = 0;

  @Output() readonly selectedIndexChange = new EventEmitter<number>();

  select(index: number): void {
    this.selectedIndex = index;
    this.selectedIndexChange.emit(index);
  }
}
