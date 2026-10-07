import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';

import { PETSHOP } from '../../core/petshop.config';
import { CATEGORIAS } from '../../core/product.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Button, Card],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly petshop = PETSHOP;
  protected readonly categorias = CATEGORIAS;

  protected readonly passos = [
    { icon: 'pi pi-list-check', titulo: 'Escolha o serviço', texto: 'Banho, tosa ou o pacote completo.' },
    { icon: 'pi pi-calendar', titulo: 'Escolha o horário', texto: 'Veja os horários livres e marque o melhor dia.' },
    { icon: 'pi pi-whatsapp', titulo: 'Confirme no WhatsApp', texto: 'A gente responde e confirma seu horário.' },
  ];
}
