import { formatDate } from '@angular/common';
import { Component, DestroyRef, OnInit, computed, inject, input } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { InputMask } from 'primeng/inputmask';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';
import { Textarea } from 'primeng/textarea';

import { PETSHOP } from '../../core/petshop.config';
import { openWhatsApp } from '../../core/whatsapp';

/** Antecedência mínima para agendar no mesmo dia. */
const ANTECEDENCIA_MINUTOS = 60;

function mesmoDia(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function horariosDoDia(data: Date, agora = new Date()): string[] {
  if (PETSHOP.diasFechados.includes(data.getDay())) return [];
  const horarios =
    data.getDay() === 0 ? PETSHOP.horariosAgendamento.domingo : PETSHOP.horariosAgendamento.segundaASabado;
  if (!mesmoDia(data, agora)) return horarios;

  const limite = agora.getHours() * 60 + agora.getMinutes() + ANTECEDENCIA_MINUTOS;
  return horarios.filter((h) => {
    const [hora, minuto] = h.split(':').map(Number);
    return hora * 60 + minuto >= limite;
  });
}

function primeiroDiaDisponivel(): Date {
  const dia = new Date();
  dia.setHours(0, 0, 0, 0);
  const agora = new Date();
  while (horariosDoDia(dia, agora).length === 0) dia.setDate(dia.getDate() + 1);
  return dia;
}

@Component({
  selector: 'app-agendamento',
  imports: [ReactiveFormsModule, Button, DatePicker, InputMask, InputText, Select, SelectButton, Textarea],
  templateUrl: './agendamento.html',
  styleUrl: './agendamento.scss',
})
export class Agendamento implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly messages = inject(MessageService);
  private readonly destroyRef = inject(DestroyRef);

  /** Vem de `?servico=` (links da Home). */
  readonly servico = input<string>();

  protected readonly petshop = PETSHOP;
  protected readonly minDate = primeiroDiaDisponivel();
  protected readonly maxDate = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);

  protected readonly form = this.fb.group({
    servico: ['Banho e Tosa', Validators.required],
    tutor: ['', [Validators.required, Validators.minLength(2)]],
    telefone: ['', Validators.required],
    pet: ['', Validators.required],
    especie: ['Cachorro', Validators.required],
    porte: ['', Validators.required],
    data: this.fb.control<Date | null>(null, Validators.required),
    horario: ['', Validators.required],
    observacoes: [''],
  });

  protected readonly dataSelecionada = toSignal(this.form.controls.data.valueChanges, { initialValue: null });

  protected readonly horariosDisponiveis = computed(() => {
    const data = this.dataSelecionada();
    return data ? horariosDoDia(data) : [];
  });

  ngOnInit(): void {
    const servico = this.servico();
    if (servico && PETSHOP.servicos.some((s) => s.value === servico)) {
      this.form.controls.servico.setValue(servico);
    }

    this.form.controls.data.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      const horario = this.form.controls.horario.value;
      if (horario && !this.horariosDisponiveis().includes(horario)) {
        this.form.controls.horario.setValue('');
      }
    });
  }

  protected invalido(campo: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[campo];
    return control.invalid && (control.touched || control.dirty);
  }

  protected enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messages.add({
        severity: 'warn',
        summary: 'Faltam alguns dados',
        detail: 'Preencha os campos destacados para continuar.',
        life: 3500,
      });
      return;
    }

    openWhatsApp(this.montarMensagem());
    this.messages.add({
      severity: 'success',
      summary: 'Quase lá!',
      detail: 'Envie a mensagem no WhatsApp. O Point do Pet vai confirmar seu horário.',
      life: 6000,
    });
  }

  private montarMensagem(): string {
    const v = this.form.getRawValue();
    const data = formatDate(v.data!, 'dd/MM/yyyy', 'pt-BR');

    return [
      'Olá! Gostaria de agendar:',
      `Serviço: ${v.servico}`,
      `Pet: ${v.pet.trim()} (${v.especie}, porte ${v.porte})`,
      `Data: ${data} às ${v.horario}`,
      `Tutor: ${v.tutor.trim()} - ${v.telefone}`,
      ...(v.observacoes.trim() ? [`Obs: ${v.observacoes.trim()}`] : []),
    ].join('\n');
  }
}
