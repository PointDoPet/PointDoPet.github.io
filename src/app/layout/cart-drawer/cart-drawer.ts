import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Drawer } from 'primeng/drawer';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { SelectButton } from 'primeng/selectbutton';

import { CartStore } from '../../core/cart.store';
import { Product, formatFaixa, formatPreco, formatQuantidade, subtotal } from '../../core/product.model';
import { openWhatsApp } from '../../core/whatsapp';

type FormaEntrega = 'retirada' | 'entrega';

@Component({
  selector: 'app-cart-drawer',
  imports: [FormsModule, RouterLink, Button, Drawer, InputNumber, InputText, SelectButton],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.scss',
})
export class CartDrawer {
  protected readonly cart = inject(CartStore);
  private readonly messages = inject(MessageService);
  private readonly confirmation = inject(ConfirmationService);

  protected readonly opcoesEntrega: { label: string; value: FormaEntrega }[] = [
    { label: 'Retirar na loja', value: 'retirada' },
    { label: 'Entrega', value: 'entrega' },
  ];

  protected readonly nome = signal('');
  protected readonly entrega = signal<FormaEntrega>('retirada');
  protected readonly endereco = signal('');
  protected readonly tentouEnviar = signal(false);

  protected readonly formatPreco = formatPreco;
  protected readonly totalFormatado = computed(() => formatFaixa(this.cart.total().min, this.cart.total().max));

  protected subtotalFormatado(product: Product, quantidade: number): string {
    const { min, max } = subtotal(product, quantidade);
    return formatFaixa(min, max);
  }

  protected readonly nomeInvalido = computed(() => this.nome().trim().length < 2);
  protected readonly enderecoInvalido = computed(
    () => this.entrega() === 'entrega' && this.endereco().trim().length < 5,
  );

  protected enviar(): void {
    this.tentouEnviar.set(true);
    if (this.cart.vazio() || this.nomeInvalido() || this.enderecoInvalido()) return;

    openWhatsApp(this.montarMensagem());
    this.messages.add({
      severity: 'success',
      summary: 'Pedido montado!',
      detail: 'Finalize o envio no WhatsApp. O Point do Pet confirma disponibilidade e valor.',
      life: 5000,
    });

    this.confirmation.confirm({
      header: 'Pedido enviado?',
      message: 'Se você já enviou a mensagem no WhatsApp, podemos esvaziar o carrinho.',
      icon: 'pi pi-whatsapp',
      acceptButtonProps: { label: 'Sim, esvaziar' },
      rejectButtonProps: { label: 'Manter itens', severity: 'secondary', outlined: true },
      accept: () => {
        this.cart.clear();
        this.cart.drawerVisible.set(false);
        this.tentouEnviar.set(false);
      },
    });
  }

  private montarMensagem(): string {
    const linhas = this.cart.items().map((i) => {
      const { min, max } = subtotal(i.product, i.quantidade);
      return `${formatQuantidade(i.product, i.quantidade)} ${i.product.nome} - ${formatFaixa(min, max)}`;
    });

    const entrega =
      this.entrega() === 'entrega' ? `Entrega: ${this.endereco().trim()}` : 'Retirada na loja';
    const { min, max } = this.cart.total();

    return [
      'Olá! Gostaria de fazer um pedido:',
      '',
      ...linhas,
      '',
      `${this.cart.totalEstimado() ? 'Total estimado' : 'Total'}: ${formatFaixa(min, max)}`,
      `Nome: ${this.nome().trim()}`,
      entrega,
    ].join('\n');
  }
}
