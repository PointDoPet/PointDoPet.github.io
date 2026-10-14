import { Component } from '@angular/core';

import { PETSHOP } from '../../core/petshop.config';

@Component({
  selector: 'app-promo-banner',
  templateUrl: './promo-banner.html',
  styleUrl: './promo-banner.scss',
})
export class PromoBanner {
  protected readonly promocao = PETSHOP.promocao;
}
