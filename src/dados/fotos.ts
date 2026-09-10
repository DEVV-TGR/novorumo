/**
 * As fotografias da casa.
 *
 * Não saem da carta impressa — a carta só tem as sobremesas e os botânicos dos
 * gins. Estas vêm do Instagram da casa (@novorumolabruge) e passam pelo
 * `scripts/preparar-fotos-instagram.mjs`, que lhes corta a interface do
 * Instagram e as grava em `public/fotos/casa/`.
 *
 * Cada foto tem um título curto e uma legenda, como os cartões das sobremesas
 * têm nome e descrição: é o mesmo cartão em todo o site, e uma fotografia sem
 * nada escrito por baixo é uma fotografia que o leitor tem de decifrar.
 *
 * O título e a legenda descrevem o que se vê no prato e não lhe dão o nome que
 * a carta usa: a fotografia de uma francesinha não diz qual das francesinhas
 * é, e o site não o vai adivinhar. Quando a casa confirmar o que é cada prato,
 * podem citar a carta e as fotos podem entrar na página `/carta`.
 *
 * Nenhuma destas fotografias mostra clientes de cara levantada. As que
 * mostravam ficaram de fora e assim devem continuar até haver licença deles.
 */

import type { Texto } from "@/lib/site";

export type Foto = {
  id: string;
  /** Caminho em `/public`, com extensão. */
  src: string;
  /** Duas ou três palavras, como o nome de um prato no cartão. */
  titulo: Texto;
  /** A linha por baixo do título. Serve também de texto alternativo. */
  legenda: Texto;
  /** O recorte que veio do Instagram: quadrada 1:1 ou vertical 3:4. */
  formato: "quadrada" | "vertical";
  /**
   * Valor de `object-position` para quando a foto é cortada numa caixa mais
   * larga do que ela. Sem isto o corte é pelo meio, e há fotos em que o meio
   * é a toalha: a francesinha está no terço de baixo e a esplanada no de cima.
   */
  foco?: string;
};

export const fotos: Foto[] = [
  {
    id: "pizza-salmao",
    src: "/fotos/casa/pizza-salmao.webp",
    titulo: { pt: "Pizza de salmão fumado", en: "Smoked salmon pizza" },
    legenda: {
      pt: "Com rúcula, azeitona e cebola roxa, servida na tábua",
      en: "With rocket, olives and red onion, served on the board",
    },
    formato: "quadrada",
  },
  {
    id: "francesinha-na-esplanada",
    src: "/fotos/casa/francesinha-na-esplanada.webp",
    titulo: { pt: "Francesinha na esplanada", en: "Francesinha on the terrace" },
    legenda: {
      pt: "Com uma imperial ao lado e a duna pela frente",
      en: "With a draught beer beside it and the dunes ahead",
    },
    formato: "vertical",
    foco: "center 72%",
  },
  {
    id: "tabua-de-petiscos",
    src: "/fotos/casa/tabua-de-petiscos.webp",
    titulo: { pt: "Travessa de petiscos", en: "Platter of petiscos" },
    legenda: {
      pt: "Batata, carne e molhos, para o meio da mesa",
      en: "Potatoes, meat and sauces, for the middle of the table",
    },
    formato: "quadrada",
  },
  {
    id: "ameijoas-na-esplanada",
    src: "/fotos/casa/ameijoas-na-esplanada.webp",
    titulo: { pt: "Amêijoas com limão", en: "Clams with lemon" },
    legenda: {
      pt: "Com pão torrado, à mesa da esplanada",
      en: "With toasted bread, at a terrace table",
    },
    formato: "vertical",
    // Fecha o grupo dos petiscos num cartão de fila inteira, e nessa caixa
    // larga o meio da fotografia é a mesa: o prato está no terço de baixo.
    foco: "center 82%",
  },
  {
    id: "mesa-de-petiscos",
    src: "/fotos/casa/mesa-de-petiscos.webp",
    titulo: { pt: "Mesa de petiscos", en: "A table of petiscos" },
    legenda: {
      pt: "Aros de cebola, camarão, nachos e pão de alho ao mesmo tempo",
      en: "Onion rings, prawns, nachos and garlic bread all at once",
    },
    formato: "vertical",
  },
  {
    id: "hamburgueres",
    src: "/fotos/casa/hamburgueres.webp",
    titulo: { pt: "Hambúrgueres e batatas", en: "Burgers and fries" },
    legenda: {
      pt: "Em pão de sementes, com batata rústica e batata doce",
      en: "On seeded buns, with rustic and sweet potato fries",
    },
    formato: "quadrada",
    foco: "center 72%",
  },
  {
    id: "massa-de-marisco",
    src: "/fotos/casa/massa-de-marisco.webp",
    titulo: { pt: "Massa com marisco", en: "Seafood pasta" },
    legenda: {
      pt: "Com polvo, camarão e mexilhão",
      en: "With octopus, prawns and mussels",
    },
    formato: "quadrada",
  },
  {
    id: "prato-de-forno",
    src: "/fotos/casa/prato-de-forno.webp",
    titulo: { pt: "Do forno, gratinado", en: "From the oven, gratinéed" },
    legenda: {
      pt: "Com enchidos, laranja e um raminho de alecrim",
      en: "With cured meats, orange and a sprig of rosemary",
    },
    formato: "quadrada",
  },
  {
    id: "torrada-e-cafe",
    src: "/fotos/casa/torrada-e-cafe.webp",
    titulo: { pt: "Torrada e café", en: "Toast and coffee" },
    legenda: {
      pt: "À hora a que a casa abre, servidos na bandeja",
      en: "At opening time, served on the tray",
    },
    formato: "quadrada",
  },
  {
    id: "ovos-e-bacon",
    src: "/fotos/casa/ovos-e-bacon.webp",
    titulo: { pt: "Ovos com bacon", en: "Eggs and bacon" },
    legenda: {
      pt: "Estrelados, na primeira mesa do dia",
      en: "Fried, at the first table of the day",
    },
    formato: "vertical",
  },
  {
    id: "pizza-junto-a-lareira",
    src: "/fotos/casa/pizza-junto-a-lareira.webp",
    titulo: { pt: "Pizza ao pé da lareira", en: "Pizza by the fireplace" },
    legenda: {
      pt: "Para quando o vento vira e a esplanada fecha",
      en: "For when the wind turns and the terrace closes",
    },
    formato: "quadrada",
  },
  {
    id: "sobremesa-de-morango",
    src: "/fotos/casa/sobremesa-de-morango.webp",
    titulo: { pt: "Sobremesa de morango", en: "Strawberry dessert" },
    legenda: {
      pt: "Com bolacha moída e um raminho de hortelã",
      en: "With crushed biscuit and a sprig of mint",
    },
    formato: "quadrada",
  },
  {
    id: "esplanada-com-letreiro",
    src: "/fotos/casa/esplanada-com-letreiro.webp",
    titulo: { pt: "A esplanada", en: "The terrace" },
    legenda: {
      pt: "Posta, debaixo do letreiro da casa",
      en: "Set for service, under the house sign",
    },
    formato: "quadrada",
    foco: "center 25%",
  },
];

/** Uma foto pelo id, para quem quer uma em concreto e não o mosaico todo. */
export function foto(id: string): Foto {
  const encontrada = fotos.find((f) => f.id === id);
  if (!encontrada) throw new Error(`Não há nenhuma fotografia com o id "${id}".`);
  return encontrada;
}
