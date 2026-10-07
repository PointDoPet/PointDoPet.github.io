import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';

import { CartDrawer } from './layout/cart-drawer/cart-drawer';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { ScheduleFab } from './layout/schedule-fab/schedule-fab';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ScheduleFab, CartDrawer, Toast, ConfirmDialog],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
