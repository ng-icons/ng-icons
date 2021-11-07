import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk-experimental/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  library!: string;
  icon!: string;

  constructor(
    @Inject(DIALOG_DATA) data: DialogData,
    public readonly dialogRef: DialogRef<DialogData>,
  ) {
    this.library = data.library;
    this.icon = data.icon;
  }
}

export interface DialogData {
  icon: string;
  library: string;
}
