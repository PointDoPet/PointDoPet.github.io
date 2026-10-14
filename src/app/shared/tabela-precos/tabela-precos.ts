import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';

import { PETSHOP } from '../../core/petshop.config';
import { porteLabel, precoFinal, precoNormal } from '../../core/precos';

let proximoId = 0;

@Component({
  selector: 'app-tabela-precos',
  imports: [CurrencyPipe, FormsModule, SelectButton],
  templateUrl: './tabela-precos.html',
  styleUrl: './tabela-precos.scss',
})
export class TabelaPrecos {
  /** Porte exibido inicialmente; acompanha o porte escolhido no agendamento. */
  readonly porte = input<string>();

  protected readonly id = `tabela-precos-${proximoId++}`;
  protected readonly promocaoAtiva = PETSHOP.promocao.ativa;
  protected readonly opcoesPorte = PETSHOP.portes.map((p) => ({ label: p.label.split(' (')[0], value: p.value }));

  protected readonly porteAtivo = linkedSignal(() => this.porte() || 'pequeno');
  protected readonly porteAtivoLabel = computed(() => porteLabel(this.porteAtivo()));

  protected readonly linhas = computed(() =>
    PETSHOP.servicos.map((s) => ({
      servico: s.value,
      normal: precoNormal(s.value, this.porteAtivo()),
      final: precoFinal(s.value, this.porteAtivo()),
    })),
  );
}
