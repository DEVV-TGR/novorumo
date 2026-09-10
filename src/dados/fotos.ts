/**
 * As fotografias da casa.
 *
 * Não saem da carta impressa — a carta só tem as sobremesas e os botânicos dos
 * gins. Estas vêm do Instagram da casa (@novorumolabruge) e passam pelo
 * `scripts/preparar-fotos-instagram.mjs`, que lhes corta a interface do
 * Instagram e as grava em `public/fotos/casa/`.
 *
 * As legendas descrevem o que se vê no prato e não lhe dão o nome que a carta
 * usa: a fotografia de uma francesinha não diz qual das francesinhas é, e o
 * site não o vai adivinhar. Quando a casa confirmar o que é cada prato, as
 * legendas passam a citar a carta e as fotos podem entrar na página `/carta`.
 *
 * Nenhuma destas fotografias mostra clientes de cara levantada. As que
 * mostravam ficaram de fora e assim devem continuar até haver licença deles.
 */

import type { Texto } from "@/lib/site";

export type Foto = {
  id: string;
  /** Caminho em `/public`, com extensão. */
  src: string;
  /** Serve de legenda no mosaico e de texto alternativo em todo o lado. */
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
    legenda: {
      pt: "Pizza com salmão fumado e rúcula, na tábua",
      en: "Pizza with smoked salmon and rocket, on the board",
    },
    formato: "quadrada",
  },
  {
    id: "francesinha-na-esplanada",
    src: "/fotos/casa/francesinha-na-esplanada.webp",
    legenda: {
      pt: "Francesinha e imperial, com a duna pela frente",
      en: "Francesinha and a draught beer, facing the dunes",
    },
    formato: "vertical",
    foco: "center 72%",
  },
  {
    id: "tabua-de-petiscos",
    src: "/fotos/casa/tabua-de-petiscos.webp",
    legenda: {
      pt: "Travessa de petiscos para o meio da mesa",
      en: "A platter of petiscos for the middle of the table",
    },
    formato: "quadrada",
  },
  {
    id: "ameijoas-na-esplanada",
    src: "/fotos/casa/ameijoas-na-esplanada.webp",
    legenda: {
      pt: "Amêijoas com limão e pão torrado, à mesa da esplanada",
      en: "Clams with lemon and toasted bread, at a terrace table",
    },
    formato: "vertical",
  },
  {
    id: "mesa-de-petiscos",
    src: "/fotos/casa/mesa-de-petiscos.webp",
    legenda: {
      pt: "Aros de cebola, camarão, nachos e pão de alho, tudo ao mesmo tempo",
      en: "Onion rings, prawns, nachos and garlic bread, all at once",
    },
    formato: "vertical",
  },
  {
    id: "hamburgueres",
    src: "/fotos/casa/hamburgueres.webp",
    legenda: {
      pt: "Hambúrgueres e batatas, para a mesa toda",
      en: "Burgers and fries, for the whole table",
    },
    formato: "quadrada",
    foco: "center 72%",
  },
  {
    id: "massa-de-marisco",
    src: "/fotos/casa/massa-de-marisco.webp",
    legenda: {
      pt: "Massa com marisco e polvo",
      en: "Pasta with seafood and octopus",
    },
    formato: "quadrada",
  },
  {
    id: "prato-de-forno",
    src: "/fotos/casa/prato-de-forno.webp",
    legenda: {
      pt: "Prato de forno gratinado, com laranja e alecrim",
      en: "Oven-baked gratin, with orange and rosemary",
    },
    formato: "quadrada",
  },
  {
    id: "torrada-e-cafe",
    src: "/fotos/casa/torrada-e-cafe.webp",
    legenda: {
      pt: "Torrada e café, à hora a que a casa abre",
      en: "Toast and coffee, at opening time",
    },
    formato: "quadrada",
  },
  {
    id: "ovos-e-bacon",
    src: "/fotos/casa/ovos-e-bacon.webp",
    legenda: {
      pt: "Ovos estrelados com bacon, na primeira mesa do dia",
      en: "Fried eggs with bacon, at the first table of the day",
    },
    formato: "vertical",
  },
  {
    id: "pizza-junto-a-lareira",
    src: "/fotos/casa/pizza-junto-a-lareira.webp",
    legenda: {
      pt: "Pizza ao pé da lareira, quando o vento vira",
      en: "Pizza by the fireplace, when the wind turns",
    },
    formato: "quadrada",
  },
  {
    id: "sobremesa-de-morango",
    src: "/fotos/casa/sobremesa-de-morango.webp",
    legenda: {
      pt: "Sobremesa de morango com hortelã",
      en: "Strawberry dessert with mint",
    },
    formato: "quadrada",
  },
  {
    id: "esplanada-com-letreiro",
    src: "/fotos/casa/esplanada-com-letreiro.webp",
    legenda: {
      pt: "A esplanada posta, debaixo do letreiro da casa",
      en: "The terrace set for service, under the house sign",
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
