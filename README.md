# Novo Rumo

Site de demonstração para o **Novo Rumo**, restaurante, bar e pizzaria na praia
de Labruge, Vila do Conde. Feito pela DevPlus como proposta.

São duas páginas:

- **`/`** a página de entrada, com o dia da casa, os pratos, as fotografias da
  casa, as sobremesas, os gins, os horários, o mapa e o pedido de reserva;
- **`/carta`** a carta completa, em português e inglês, com as dezasseis secções
  do cartaz e os preços que a casa pratica.

## Correr

```bash
npm install
npm run dev
```

## De onde vem tudo isto

A casa não tem site nem manual de marca. O material que existe é a carta
impressa — um PDF de treze páginas feito em CorelDRAW — e o que a casa publica
no Instagram. Está tudo em `originais/`, e é de lá que sai tudo o que este site
mostra.

| O quê | Onde está | Como foi tirado |
| --- | --- | --- |
| Logótipo e lockup | `src/componentes/Lockup.tsx`, `public/marca/` | Contornos vetoriais da capa, via `pdftocairo -svg`. Não é uma fonte parecida: são as letras da marca. |
| Fundo da capa e da contracapa | `public/fundos/` | A textura low-poly de 1152x1152 embutida no PDF. A contracapa é a mesma, rodada. |
| Fotografias da carta | `public/fotos/` | As sobremesas e os botânicos dos gins, recompostos com a máscara de transparência que no PDF vem à parte. |
| Fotografias da casa | `public/fotos/casa/`, `src/dados/fotos.ts` | Capturas de ecrã do Instagram da casa (`originais/fotos-instagram/`), com a interface do Instagram cortada. São os pratos, a esplanada e a sala — o que a carta impressa não tem. Cada uma leva título e legenda, em português e inglês, como os cartões das sobremesas. |
| Cores | `src/app/globals.css` | Os valores contados nos vetores do PDF: navy `#352D74`, ciano `#008DD2`, tinta `#1C1B17`, creme `#EAF4EB`, laranja dos selos de preço `#EF7F1A`. |
| Carta | `src/dados/` | Transcrita do PDF. As páginas dos gins tinham o texto em curvas e foram passadas à mão. |

Para voltar a extrair os fundos e as fotos da carta:

```bash
brew install poppler   # uma vez
node scripts/extrair-da-carta.mjs
```

E para voltar a preparar as fotografias do Instagram:

```bash
node scripts/preparar-fotos-instagram.mjs
```

Das vinte e duas capturas guardadas em `originais/fotos-instagram/`, treze
entram no site. As que ficaram de fora ou estão repetidas, ou são de época
(o São Valentim), ou mostram clientes de cara levantada — e essas não vão para
um site sem eles darem licença.

## O que ainda falta

Antes disto ir para o ar há coisas que só a casa pode responder:

- **Que prato é cada fotografia.** As fotos do Instagram resolveram a falta de
  imagens de comida salgada, mas mostram pratos sem lhes dar nome. Sabe-se que
  aquela é uma francesinha; não se sabe se é a francesinha simples, se a "à
  Novo Rumo". Por isso as legendas descrevem o prato em vez de o nomear, e só
  duas células dos destaques levam fotografia — a francesinha e o hambúrguer.
  A da Pizza Novo Rumo continua pintada com a cor da marca, porque a pizza que
  há fotografada leva salmão fumado e a da carta leva gambas e atum. Com a
  casa a confirmar o que é cada uma, as fotos podem também entrar na `/carta`.
- **Uma fotografia da esplanada fora do São Valentim.** A que o site usa ao pé
  do mapa é a única que apanha o letreiro da casa, e tem corações na relva
  artificial.
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
