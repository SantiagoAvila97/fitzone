import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from '@shared/components/confirmation-modal/confirmation-modal.component';
import { InformationModalComponent } from '@shared/components/information-modal/information-modal.component';

export enum ModalType {
  DEFAULT = 'default',
  SUCCESS = 'success',
  ERROR = 'error',
}

@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  private dialog = inject(MatDialog);
  private router = inject(Router);

  // Abre un modal de informativo
  openInformationModal(data: {
    type: ModalType;
    title: string;
    body: string;
  }): MatDialogRef<InformationModalComponent> {
    return this.dialog.open(InformationModalComponent, {
      data: {
        type: data.type,
        title: data.title,
        body: data.body,
      },
    });
  }

  // Abre un modal de confirmación
  openConfirmationModal(data: {
    type: ModalType;
    title: string;
    body: string;
    buttonLeft: string;
    buttonRight: string;
  }): MatDialogRef<ConfirmationModalComponent> {
    return this.dialog.open(ConfirmationModalComponent, {
      data: {
        type: data.type,
        title: data.title,
        body: data.body,
        buttonLeft: data.buttonLeft,
        buttonRight: data.buttonRight,
      },
    });
  }
}
