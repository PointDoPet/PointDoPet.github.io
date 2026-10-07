import { CurrencyPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { SelectButton } from 'primeng/selectbutton';
import { Skeleton } from 'primeng/skeleton';
import { Tag } from 'primeng/tag';

import { CartStore } from '../../core/cart.store';
import { CATEGORIAS, Categoria, Product, categoriaLabel, isCategoria, isVendavel } from '../../core/product.model';
import { openWhatsApp } from '../../core/whatsapp';

type Filtro = Categoria | 'todos';

function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

@Component({
  selector: 'app-catalogo',
  imports: [
    CurrencyPipe,
    FormsModule,
    Button,
    Card,
    IconField,
    InputIcon,
    InputText,
    SelectButton,
    Skeleton,
    Tag,
  ],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo {
  private readonly router = inject(Router);
  private readonly cart = inject(CartStore);
  private readonly messages = inject(MessageService);

  /** Vem de `?categoria=` via withComponentInputBinding. */
  readonly categoria = input<string>();

  protected readonly produtos = httpResource<Product[]>(() => 'data/products.json', { defaultValue: [] });

  protected readonly opcoesFiltro: { label: string; value: Filtro }[] = [
    { label: 'Todos', value: 'todos' },
    ...CATEGORIAS.map((c) => ({ label: c.label, value: c.value })),
  ];

  protected readonly busca = signal('');

  protected readonly filtro = computed<Filtro>(() => {
    const categoria = this.categoria();
    return isCategoria(categoria) ? categoria : 'todos';
  });

  protected readonly produtosFiltrados = computed(() => {
    const filtro = this.filtro();
    const termo = normalizar(this.busca());
    return this.produtos
      .value()
      .filter((p) => filtro === 'todos' || p.categoria === filtro)
      .filter((p) => !termo || normalizar(`${p.nome} ${p.descricao}`).includes(termo));
  });

  protected readonly categoriaLabel = categoriaLabel;
  protected readonly isVendavel = isVendavel;

  protected selecionarFiltro(filtro: Filtro | null): void {
    this.router.navigate([], {
      queryParams: { categoria: !filtro || filtro === 'todos' ? null : filtro },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  protected adicionar(product: Product): void {
    if (!this.cart.add(product)) return;
    this.messages.add({
      severity: 'success',
      summary: 'Adicionado ao carrinho',
      detail: product.nome,
      life: 2500,
    });
  }

  protected consultar(product: Product): void {
    openWhatsApp(`Olá! Vocês têm *${product.nome}* disponível?`);
  }
}
