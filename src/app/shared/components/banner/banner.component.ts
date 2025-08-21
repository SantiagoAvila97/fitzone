import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit, OnDestroy {
  messages: string[] = [
    '💳 Obtén descuentos exclusivos en tu primera membresía',
    '🔥 Plan premium con 20% de descuento solo este mes',
    '✅ Sin cláusula de permanencia en plan básico',
    '🎁 Regalo de bienvenida al suscribirte hoy',
  ];

  currentIndex = 0;
  isFading = false;
  intervalId: any;

  ngOnInit() {
    this.startRotation();
  }

  startRotation() {
    this.intervalId = setInterval(() => {
      this.isFading = true;
      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.messages.length;
        this.isFading = false;
      }, 500); // coincide con el fade
    }, 3000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
