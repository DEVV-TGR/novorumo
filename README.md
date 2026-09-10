# Novo Rumo

Site de demonstração para o **Novo Rumo**, restaurante, bar e pizzaria na praia
de Labruge, Vila do Conde. Feito pela DevPlus como proposta.

São duas páginas:

- **`/`** a página de entrada, com o dia da casa, os pratos, as sobremesas, os
  gins, os horários e o mapa;
- **`/carta`** a carta completa, em português e inglês, com as dezasseis secções
  do cartaz e os preços que a casa pratica.

## Correr

```bash
npm install
npm run dev
```

## De onde vem tudo isto

A casa não tem site nem manual de marca. O único material que existe é a carta
impressa, um PDF de treze páginas feito em CorelDRAW, e é dela que sai tudo o
que este site mostra. O ficheiro está em `originais/CartaNovoRumo.pdf` e é a
fonte de verdade.

| O quê | Onde está | Como foi tirado |
| --- | --- | --- |
| Logótipo e lockup | `src/componentes/Lockup.tsx`, `public/marca/` | Contornos vetoriais da capa, via `pdftocairo -svg`. Não é uma fonte parecida: são as letras da marca. |
| Fundo da capa e da contracapa | `public/fundos/` | A textura low-poly de 1152x1152 embutida no PDF. A contracapa é a mesma, rodada. |
| Fotografias | `public/fotos/` | As sobremesas e os botânicos dos gins, recompostos com a máscara de transparência que no PDF vem à parte. |
| Cores | `src/app/globals.css` | Os valores contados nos vetores do PDF: navy `#352D74`, ciano `#008DD2`, tinta `#1C1B17`, creme `#EAF4EB`, laranja dos selos de preço `#EF7F1A`. |
| Carta | `src/dados/` | Transcrita do PDF. As páginas dos gins tinham o texto em curvas e foram passadas à mão. |

Para voltar a extrair os fundos e as fotos:

```bash
brew install poppler   # uma vez
node scripts/extrair-da-carta.mjs
```

## O que ainda falta

Antes disto ir para o ar há coisas que só a casa pode responder:

- **Fotografias dos pratos principais.** A carta impressa não tem uma única
  foto de comida salgada. As células dos destaques estão pintadas com a cor da
  marca à espera delas.
- **Logótipo vetorial original e códigos de cor oficiais.** Os que aqui estão
  foram lidos do PDF e batem certo, mas convém confirmar com quem os desenhou.
- **Alergénios.** O modelo suporta-os e há alguns preenchidos, mas foram
  inferidos dos ingredientes e não confirmados pela cozinha. Por isso não
  aparecem no site: em vez disso a carta pede que se avise antes de pedir.
- **Horário de verão.** O de julho e agosto vem da carta de 2024 e do Facebook.
  Confirmar se se mantém.
- **A morada.** O Restaurantji lista "R. da Marginal 420" e a carta diz 820. O
  site usa a da carta. Enquanto os dois números andarem pela internet, a casa
  aparece pior nas pesquisas.

## Feito com

Next.js 16, React 19, Tailwind CSS 4, TypeScript, Motion e Phosphor Icons.
