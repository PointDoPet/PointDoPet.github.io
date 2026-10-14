import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';

import { PETSHOP } from '../../core/petshop.config';
import { precoAPartirDe } from '../../core/precos';
import { CATEGORIAS } from '../../core/product.model';
import { PromoBanner } from '../../shared/promo-banner/promo-banner';
import { TabelaPrecos } from '../../shared/tabela-precos/tabela-precos';

@Component({
  selector: 'app-home',
  imports: [CurrencyPipe, RouterLink, Button, Card, PromoBanner, TabelaPrecos],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly petshop = PETSHOP;
  protected readonly categorias = CATEGORIAS;
  protected readonly precoAPartirDe = precoAPartirDe;

  protected readonly passos = [
    { icon: 'pi pi-list-check', titulo: 'Escolha o serviço', texto: 'Banho, tosa ou o pacote completo.' },
    { icon: 'pi pi-calendar', titulo: 'Escolha o horário', texto: 'Veja os horários livres e marque o melhor dia.' },
    { icon: 'pi pi-whatsapp', titulo: 'Confirme no WhatsApp', texto: 'A gente responde e confirma seu horário.' },
  ];
}
