import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { Menubar } from 'primeng/menubar';
import { OverlayBadge } from 'primeng/overlaybadge';

import { CartStore } from '../../core/cart.store';
import { PETSHOP } from '../../core/petshop.config';

@Component({
  selector: 'app-header',
  imports: [RouterLink, Menubar, Button, OverlayBadge],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly cart = inject(CartStore);
  protected readonly nome = PETSHOP.nome;

  protected readonly items: MenuItem[] = [
    { label: 'Início', icon: 'pi pi-home', routerLink: '/', routerLinkActiveOptions: { exact: true } },
    { label: 'Catálogo', icon: 'pi pi-shop', routerLink: '/catalogo' },
    { label: 'Banho e Tosa', icon: 'pi pi-calendar', routerLink: '/agendamento' },
  ];

  protected readonly menubarDt = {
    root: { background: 'transparent', borderColor: 'transparent', padding: '0.5rem 0' },
    item: {
      color: '{surface.900}',
      focusColor: '{surface.900}',
      activeColor: '{surface.900}',
      focusBackground: 'rgba(17, 24, 39, 0.08)',
      activeBackground: 'rgba(17, 24, 39, 0.12)',
      icon: { color: '{surface.800}', focusColor: '{surface.900}', activeColor: '{surface.900}' },
    },
    mobileButton: { color: '{surface.900}', hoverColor: '{surface.950}', hoverBackground: 'rgba(17, 24, 39, 0.08)' },
  };
}
