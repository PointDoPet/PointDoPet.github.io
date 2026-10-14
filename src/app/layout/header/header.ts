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
      color: '#071a28',
      focusColor: '#071a28',
      activeColor: '#071a28',
      focusBackground: '{primary.100}',
      activeBackground: '{primary.200}',
      icon: { color: '{primary.800}', focusColor: '#071a28', activeColor: '#071a28' },
    },
    mobileButton: { color: '#071a28', hoverColor: '#071a28', hoverBackground: '{primary.100}' },
  };
}
