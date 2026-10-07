# Point do Pet

Site do petshop Point do Pet em Angular 21 + PrimeNG 21. Sem backend: a consulta do carrinho e o agendamento de banho e tosa são enviados como mensagem pronta para o WhatsApp do petshop.

## Rodar localmente

```bash
npm install
npm start          # http://localhost:4200
npm run build      # gera dist/point-do-pet/browser
```

## Onde editar

| O quê | Arquivo |
| --- | --- |
| WhatsApp, endereço, horários de funcionamento e de agendamento, serviços, portes | `src/app/core/petshop.config.ts` |
| Produtos e animais do catálogo | `public/data/products.json` |
| Fotos dos produtos | `public/images/products/` |
| Cores do tema (laranja) | `src/app/theme/point-do-pet.preset.ts` e variáveis `--pdp-*` em `src/styles.scss` |

Cada produto em `products.json` precisa de `id` único, `nome`, `categoria` (`racao`, `higiene`, `acessorios` ou `animais`), `descricao` e `imagem`. Produtos à venda têm `preco`; animais não têm preço e aparecem com o botão "Consultar".

- Preço em faixa: use `preco` (mínimo) e `precoMax` (máximo). O site mostra "R$ X a R$ Y".
- Venda por kg: adicione `"unidade": "kg"`. A quantidade no carrinho passa a ser em kg e o preço é por kg.

## Deploy

### GitHub Pages (principal)

O repositório é [PointDoPet/PointDoPet.github.io](https://github.com/PointDoPet/PointDoPet.github.io). O workflow `.github/workflows/deploy-pages.yml` publica o site a cada push na `main`, em `https://pointdopet.github.io/`.

1. Em **Settings > Pages > Build and deployment**, escolha **Source: GitHub Actions**.
2. Faça push da `main`.

O caminho base `/` está no script `build:pages` do `package.json`: repositórios no formato `conta.github.io` são servidos na raiz do domínio. Se o site for movido para um repositório com outro nome, troque para `/NomeDoRepo/`.

### Alternativas

Também há configuração de rotas SPA para Vercel (`vercel.json`) e Firebase Hosting (`firebase.json`).
