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
  ],
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.scss'],
})
export class MembershipsComponent {
  // Signals
  memberships = signal<Membership[]>([]);

  // Injects
  private service = inject(MembershipsService);

  /** Inicizalidor */
  ngOnInit() {
    this.memberships.set(this.service.memberships());
  }
}
