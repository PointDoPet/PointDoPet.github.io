import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PETSHOP } from '../../core/petshop.config';
import { buildWhatsAppLink } from '../../core/whatsapp';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly petshop = PETSHOP;
  protected readonly whatsappLink = buildWhatsAppLink(`Olá, ${PETSHOP.nome}! Vim pelo site.`);
  protected readonly ano = new Date().getFullYear();
}
