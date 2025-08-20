import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ModalType } from '@shared/services/modals.service';

@Component({
  selector: 'id-pay-information-modal',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './information-modal.component.html',
  styleUrl: './information-modal.component.scss',
})
export class InformationModalComponent {
  readonly dialogRef = inject(MatDialogRef<InformationModalComponent>);
  readonly data = inject<{
    type: ModalType;
    title: string;
    body: string;
  }>(MAT_DIALOG_DATA);
}
