import { Injectable, computed, effect, signal } from '@angular/core';

import { Product, isVendavel, subtotal } from './product.model';

export interface CartItem {
  product: Product;
  quantidade: number;
}

const STORAGE_KEY = 'point-do-pet:carrinho:v2';

function lerDoLocalStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const items = raw ? (JSON.parse(raw) as CartItem[]) : [];
    return Array.isArray(items) ? items.filter((i) => i?.product && i.quantidade > 0) : [];
  } catch {
    return [];
  }
}

@Injectable({ providedIn: 'root' })
export class CartStore {
  readonly items = signal<CartItem[]>(lerDoLocalStorage());
  readonly drawerVisible = signal(false);

  readonly totalItens = computed(() => this.items().reduce((soma, i) => soma + i.quantidade, 0));
  readonly total = computed(() =>
    this.items().reduce(
      (soma, i) => {
        const { min, max } = subtotal(i.product, i.quantidade);
        return { min: soma.min + min, max: soma.max + max };
      },
      { min: 0, max: 0 },
    ),
  );
  /** Algum item tem faixa de preço, então o total é uma estimativa. */
  readonly totalEstimado = computed(() => this.total().max > this.total().min);
  readonly vazio = computed(() => this.items().length === 0);

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items()));
      } catch {
        // localStorage indisponível (modo privado/cota): o carrinho segue só em memória.
      }
    });
  }

  add(product: Product): boolean {
    if (!isVendavel(product)) return false;
    this.items.update((items) => {
      const existente = items.find((i) => i.product.id === product.id);
      return existente
        ? items.map((i) => (i.product.id === product.id ? { ...i, quantidade: i.quantidade + 1 } : i))
        : [...items, { product, quantidade: 1 }];
    });
    return true;
  }

  setQuantidade(id: string, quantidade: number): void {
    if (quantidade <= 0) {
      this.remove(id);
      return;
    }
    this.items.update((items) => items.map((i) => (i.product.id === id ? { ...i, quantidade } : i)));
  }

  increment(id: string): void {
    const item = this.items().find((i) => i.product.id === id);
    if (item) this.setQuantidade(id, item.quantidade + 1);
  }

  decrement(id: string): void {
    const item = this.items().find((i) => i.product.id === id);
    if (item) this.setQuantidade(id, item.quantidade - 1);
  }

  remove(id: string): void {
    this.items.update((items) => items.filter((i) => i.product.id !== id));
  }

  clear(): void {
    this.items.set([]);
  }

  open(): void {
    this.drawerVisible.set(true);
  }
}
