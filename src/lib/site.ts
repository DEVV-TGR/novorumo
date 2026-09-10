/**
 * Fonte única dos dados do Novo Rumo.
 *
 * Nenhum componente escreve o nome, a morada, o telefone ou as redes à mão.
 * Se precisas de um valor novo, acrescenta-o aqui.
 */

export type Texto = { pt: string; en: string };

export const site = {
  nome: "Novo Rumo",
  descritivo: {
    pt: "Restaurante • Bar • Pizzaria",
    en: "Restaurant • Bar • Pizzeria",
  } satisfies Texto,
  desde: 2010,

  morada: {
    rua: "Rua da Marginal, n.º 820",
    codigoPostal: "4485-303",
    localidade: "Labruge",
    concelho: "Vila do Conde",
    pais: "Portugal",
    // A morada aparece inconsistente online (o Restaurantji lista "R. da Marginal 420").
    // Esta é a da carta oficial e é a que deve ficar em todo o lado.
    completa: "Rua da Marginal, n.º 820, 4485-303 Labruge, Vila do Conde",
  },

  telemovel: "935 300 778",
  telemovelE164: "+351935300778",
  fixo: "224 089 398",
  fixoE164: "+351224089398",
  email: "2015novorumo@gmail.com",

  redes: {
    instagram: "https://instagram.com/novorumolabruge",
    facebook: "https://facebook.com/novorumolabrugept",
    tiktok: "https://tiktok.com/@novorumolabruge",
    linktree: "https://linktr.ee/novorumolabruge",
  },

  mapas: {
    google: "https://g.co/kgs/DK2NHv",
    review: "https://g.page/r/CS_4G54ckRZkEAE/review",
  },

  whatsapp: "https://wa.me/351935300778",
} as const;

/** Aviso legal obrigatório no rodapé (DL 10/2015, art.º 135.º + Livro de Reclamações). */
export const legal = {
  iva: {
    pt: "Preços com IVA incluído à taxa legal em vigor.",
    en: "Prices include VAT at the legal rate in force.",
  } satisfies Texto,
  couvert: {
    pt: "Nenhum prato, produto alimentar ou bebida, incluindo o couvert, pode ser cobrado se não for solicitado pelo cliente ou por este for inutilizado (DL n.º 10/2015, de 16 de janeiro, art.º 135.º).",
    en: "No dish, food item or drink, including the couvert, may be charged if not requested by the customer or left untouched (Portuguese Decree-Law 10/2015, art. 135).",
  } satisfies Texto,
  livroReclamacoes: "https://www.livroreclamacoes.pt/inicio",
} as const;
