import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import {
  Membership,
  MembershipsService,
} from '@core//services/memberships.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { AuthService } from '@core//services/auth.service';
import { Router } from '@angular/router';
import {
  ModalsService,
  ModalType,
  SnackbarType,
} from '@shared/services/modals.service';
import { BannerComponent } from '@shared/components/banner/banner.component';

@Component({
  selector: 'app-memberships',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    CurrencyPipe,
    HeaderComponent,
    MatButtonModule,
    MatIcon,
    CommonModule,
    FooterComponent,
    BannerComponent,
  ],
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.scss'],
})
export class MembershipsComponent {
  // Signals
  memberships = signal<Membership[]>([]);
  expandedPlans = signal<Set<number>>(new Set());

  // Injects
  private service = inject(MembershipsService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private modalsService = inject(ModalsService);

  /** Inicizalidor */
  ngOnInit() {
    this.memberships.set(this.service.memberships());
  }

  /** Toggle de beneficios */
  toggleBenefits(id: number) {
    const current = new Set(this.expandedPlans());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.expandedPlans.set(current);
  }

  /** Saber si está expandido */
  isExpanded(id: number): boolean {
    return this.expandedPlans().has(id);
  }

  /** Maneja la compra de una membreseria */
  buyMembership(data: Membership) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      this.modalsService.openSnackbar(
        SnackbarType.INFORMATION,
        'Debes iniciar sesión para reservar',
      );
      return;
    }

    const dialogRef = this.modalsService.openConfirmationModal({
      type: ModalType.DEFAULT,
      title: 'Confirmar compra',
      body: `¿Deseas confirmar la compra de la membresía ${data.name}?
Recuerda que esta acción es definitiva y no se podrá modificar ni cancelar una vez confirmada.`,
      buttonLeft: 'Cancelar',
      buttonRight: 'Comprar',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'right') return;
      this.modalsService.openSnackbar(SnackbarType.SUCCESS, 'Compra exitosa');
    });
  }
}
