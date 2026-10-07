import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-schedule-fab',
  imports: [RouterLink],
  template: `
    @if (!naPaginaDeAgendamento()) {
      <a routerLink="/agendamento" class="fab" aria-label="Agendar banho e tosa">
        <i class="pi pi-calendar-plus"></i>
        <span>Agendar</span>
      </a>
    }
  `,
  styleUrl: './schedule-fab.scss',
})
export class ScheduleFab {
  private readonly router = inject(Router);

  protected readonly naPaginaDeAgendamento = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects.startsWith('/agendamento')),
    ),
    { initialValue: this.router.url.startsWith('/agendamento') },
  );
}
