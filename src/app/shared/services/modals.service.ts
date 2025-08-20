import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationModalComponent } from '@shared/components/confirmation-modal/confirmation-modal.component';

export enum ModalType {
  DEFAULT = 'default',
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum SnackbarType {
  INFORMATION = 'information',
  SUCCESS = 'success',
  ERROR = 'error',
}

@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

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

  /** Snakcbar de información */
  openSnackbar(data: SnackbarType, message: string) {
    let simbol = '';

    if (data === SnackbarType.INFORMATION) {
      simbol = '⚠️';
    }
    if (data === SnackbarType.ERROR) {
      simbol = '❌';
    }
    if (data === SnackbarType.SUCCESS) {
      simbol = '✅';
    }

    this.snackBar.open(`${simbol} ${message}`, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
