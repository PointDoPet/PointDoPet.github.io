import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Point do Pet | Banho e tosa, rações e acessórios',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'catalogo',
    title: 'Catálogo | Point do Pet',
    loadComponent: () => import('./pages/catalogo/catalogo').then((m) => m.Catalogo),
  },
  {
    path: 'agendamento',
    title: 'Agendar banho e tosa | Point do Pet',
    loadComponent: () => import('./pages/agendamento/agendamento').then((m) => m.Agendamento),
  },
  { path: '**', redirectTo: '' },
];
