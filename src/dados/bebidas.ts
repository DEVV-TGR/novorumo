/**
 * Bebidas: cafetaria, garrafa, cerveja, cocktails, vinhos e destilados.
 *
 * Os vinhos são o caso que obriga o modelo a ter variantes: o Terras
 * d'Ervideira vende-se a 0,37 L e a 0,75 L com preços diferentes, e uma carta
 * digital que só mostrasse um deles estaria a mentir ao cliente.
 */

import type { Categoria } from "@/lib/carta";

/** Meia garrafa e garrafa, para os vinhos que existem nos dois tamanhos. */
function garrafas(meia: number | null, inteira: number) {
  const v = [];
  if (meia !== null) v.push({ id: "037", nome: { pt: "0,37 L", en: "0.37 L" }, preco: meia });
  v.push({ id: "075", nome: { pt: "0,75 L", en: "0.75 L" }, preco: inteira });
  return v;
}

const cal5 = { pt: "Cálice 5 cl", en: "5 cl glass" };

export const cafetaria: Categoria = {
  id: "cafetaria",
  nome: { pt: "Cafetaria", en: "Coffee and tea" },
  itens: [
    { id: "cafe", nome: { pt: "Café", en: "Espresso" }, preco: 1.2 },
    { id: "cafe-duplo", nome: { pt: "Café duplo | abatanado", en: "Double espresso | americano" }, preco: 2.2 },
    { id: "carioca-cafe", nome: { pt: "Carioca de café", en: "Weak espresso" }, preco: 1.2 },
    { id: "descafeinado", nome: { pt: "Descafeinado", en: "Decaf" }, preco: 1.2 },
    { id: "pingo", nome: { pt: "Pingo direto | normal", en: "Espresso macchiato" }, preco: 1.2 },
    { id: "galao", nome: { pt: "Galão", en: "Galão (tall milky coffee)" }, preco: 1.8 },
    { id: "meia-leite", nome: { pt: "Meia de leite", en: "Coffee with milk" }, preco: 1.6 },
    { id: "copo-leite", nome: { pt: "Copo de leite", en: "Glass of milk" }, preco: 1.5 },
    { id: "cevada", nome: { pt: "Cevada", en: "Barley coffee" }, preco: 1.1 },
    { id: "cevada-dupla", nome: { pt: "Cevada dupla", en: "Double barley coffee" }, preco: 1.6 },
    { id: "carioca-limao", nome: { pt: "Carioca de limão", en: "Lemon peel infusion" }, preco: 1.1 },
    { id: "carioca-limao-duplo", nome: { pt: "Carioca de limão duplo", en: "Double lemon peel infusion" }, preco: 1.6 },
    { id: "cha", nome: { pt: "Chá", en: "Tea" }, preco: 1.6 },
    { id: "cha-leite", nome: { pt: "Chá com leite", en: "Tea with milk" }, preco: 2.5 },
    { id: "chocolate-quente", nome: { pt: "Chocolate quente", en: "Hot chocolate" }, preco: 3.5 },
    { id: "leite-achocolatado", nome: { pt: "Leite achocolatado", en: "Chocolate milk" }, preco: 2.5 },
    { id: "cappuccino", nome: { pt: "Cappuccino", en: "Cappuccino" }, preco: 2.5 },
  ],
};

export const bebidas: Categoria = {
  id: "bebidas",
  nome: { pt: "Bebidas", en: "Drinks" },
  subgrupos: [
    {
      id: "refrigerantes",
      nome: { pt: "Refrigerantes e águas", en: "Soft drinks and water" },
      itens: ["coca-cola", "coca-cola-15", "sumol", "guarana", "7up", "ice-tea", "compal", "sumo-laranja", "vitalis-033", "vitalis-15", "pedras", "pedras-limao", "tonica"],
    },
    {
      id: "cerveja",
      nome: { pt: "Cerveja", en: "Beer" },
      itens: ["copo-cerveja", "copo-tango", "caneca-cerveja", "caneca-tango", "cerveja-sem-alcool", "somersby", "cerveja-lata", "cerveja-artesanal"],
    },
    {
      id: "aperitivo",
      nome: { pt: "Aperitivo", en: "Aperitif" },
      itens: ["favaios", "martini", "ricard"],
    },
  ],
  itens: [
    { id: "coca-cola", nome: { pt: "Coca-Cola normal ou zero", en: "Coca-Cola regular or zero" }, preco: 2.4 },
    { id: "coca-cola-15", nome: { pt: "Coca-Cola 1,5 L", en: "Coca-Cola 1.5 L" }, preco: 4.5 },
    { id: "sumol", nome: { pt: "Sumol laranja ou ananás", en: "Sumol orange or pineapple" }, preco: 2.4 },
    { id: "guarana", nome: { pt: "Guaraná", en: "Guaraná" }, preco: 2.4 },
    { id: "7up", nome: { pt: "7Up", en: "7Up" }, preco: 2.4 },
    { id: "ice-tea", nome: { pt: "Ice tea limão, manga ou pêssego", en: "Iced tea lemon, mango or peach" }, preco: 2.4 },
    { id: "compal", nome: { pt: "Compal", en: "Compal fruit juice" }, preco: 2.0 },
    { id: "sumo-laranja", nome: { pt: "Sumo natural de laranja", en: "Freshly squeezed orange juice" }, preco: 3.8 },
    { id: "vitalis-033", nome: { pt: "Água Vitalis sem gás 0,33 L", en: "Still water 0.33 L" }, preco: 1.3 },
    { id: "vitalis-15", nome: { pt: "Água Vitalis sem gás 1,5 L", en: "Still water 1.5 L" }, preco: 2.5 },
    { id: "pedras", nome: { pt: "Água das Pedras", en: "Sparkling water" }, preco: 1.7 },
    { id: "pedras-limao", nome: { pt: "Água das Pedras limão", en: "Sparkling water with lemon" }, preco: 1.8 },
    { id: "tonica", nome: { pt: "Água tónica", en: "Tonic water" }, preco: 2.1 },

    { id: "copo-cerveja", nome: { pt: "Copo de cerveja 0,35 L", en: "Draft beer 0.35 L" }, preco: 2.2 },
    { id: "copo-tango", nome: { pt: "Copo Tango 0,35 L", en: "Tango shandy 0.35 L" }, preco: 2.5 },
    { id: "caneca-cerveja", nome: { pt: "Caneca de cerveja 0,5 L", en: "Beer stein 0.5 L" }, preco: 4.0 },
    { id: "caneca-tango", nome: { pt: "Caneca Tango 0,5 L", en: "Tango stein 0.5 L" }, preco: 4.2 },
    { id: "cerveja-sem-alcool", nome: { pt: "Cerveja sem álcool", en: "Alcohol-free beer" }, preco: 2.3 },
    { id: "somersby", nome: { pt: "Somersby", en: "Somersby cider" }, preco: 3.2 },
    { id: "cerveja-lata", nome: { pt: "Cerveja em lata", en: "Canned beer" }, preco: 2.4 },
    {
      id: "cerveja-artesanal",
      nome: { pt: "Cerveja artesanal", en: "Craft beer" },
      descricao: { pt: "Sob consulta", en: "Ask us what we have" },
    },

    {
      id: "favaios",
      nome: { pt: "Favaios 0,05 L", en: "Favaios moscatel 0.05 L" },
      preco: 1.8,
      nota: {
        pt: "Com cerveja acresce 0,50 €, servido em copo de 0,35 L.",
        en: "Add 0.50 € to have it with beer, served in a 0.35 L glass.",
      },
    },
    {
      id: "martini",
      nome: { pt: "Martini 0,05 L", en: "Martini 0.05 L" },
      preco: 1.8,
      nota: {
        pt: "Com cerveja acresce 0,50 €, servido em copo de 0,35 L.",
        en: "Add 0.50 € to have it with beer, served in a 0.35 L glass.",
      },
    },
    { id: "ricard", nome: { pt: "Ricard Pastis 0,20 L", en: "Ricard Pastis 0.20 L" }, preco: 2.0 },
  ],
};

export const cocktails: Categoria = {
  id: "cocktails",
  nome: { pt: "Cocktails", en: "Cocktails" },
  itens: [
    {
      id: "sangria-maracuja",
      nome: { pt: "Sangria de maracujá", en: "Passion fruit sangria" },
      descricao: { pt: "Jarro 1,5 L", en: "1.5 L jug" },
      preco: 22.0,
      destaque: true,
    },
    {
      id: "sangria-frutos-vermelhos",
      nome: { pt: "Sangria de frutos vermelhos", en: "Red berry sangria" },
      descricao: { pt: "Jarro 1,5 L", en: "1.5 L jug" },
      preco: 21.0,
    },
    {
      id: "sangria",
      nome: { pt: "Sangria tinta ou branca", en: "Red or white sangria" },
      descricao: { pt: "Jarro 1,5 L", en: "1.5 L jug" },
      preco: 18.0,
    },
    {
      id: "sangria-copo",
      nome: { pt: "Sangria tinta ou branca", en: "Red or white sangria" },
      descricao: { pt: "Copo 0,25 L", en: "0.25 L glass" },
      preco: 3.5,
    },
    { id: "caipirinha", nome: { pt: "Caipirinha", en: "Caipirinha" }, preco: 7.0 },
    { id: "caipirosca", nome: { pt: "Caipirosca branca ou preta", en: "White or black caipiroska" }, preco: 7.0 },
    { id: "caipirosca-morango", nome: { pt: "Caipirosca de morango", en: "Strawberry caipiroska" }, preco: 7.0 },
    { id: "caipirao", nome: { pt: "Caipirão", en: "Caipirão" }, preco: 7.0 },
    { id: "mojito", nome: { pt: "Mojito", en: "Mojito" }, preco: 7.0 },
    { id: "tequila-sunrise", nome: { pt: "Tequila sunrise", en: "Tequila sunrise" }, preco: 6.5 },
    { id: "aperol", nome: { pt: "Aperol spritz", en: "Aperol spritz" }, preco: 6.0 },
    {
      id: "cinderella",
      nome: { pt: "Cinderella", en: "Cinderella" },
      descricao: { pt: "Sem álcool", en: "Alcohol-free" },
      preco: 4.5,
    },
  ],
};

export const vinhos: Categoria = {
  id: "vinhos",
  nome: { pt: "Vinhos", en: "Wine" },
  subgrupos: [
    { id: "porto", nome: { pt: "Vinho do Porto", en: "Port wine" }, itens: ["kopke-vintage", "kopke-tinto", "kopke-branco"] },
    { id: "tinto", nome: { pt: "Maduro tinto", en: "Red" }, itens: ["lavradores", "ervideira-tinto", "arribas-tinto"] },
    { id: "branco", nome: { pt: "Maduro branco", en: "White" }, itens: ["ervideira-branco", "arribas-branco", "muros-sao-luiz", "conde-monsul"] },
    { id: "verde", nome: { pt: "Verde branco", en: "Vinho Verde" }, itens: ["deu-la-deu", "casa-tojeira", "encosta-xisto"] },
    { id: "rose", nome: { pt: "Rosé", en: "Rosé" }, itens: ["mateus", "arca-nova"] },
    { id: "casa", nome: { pt: "Vinho da casa", en: "House wine" }, itens: ["ermelinda-tinto", "ermelinda-branco", "portal-tojeira", "copo-vinho"] },
    { id: "espumante", nome: { pt: "Espumante", en: "Sparkling" }, itens: ["murganheira", "terras-demo", "terras-demo-rose"] },
  ],
  itens: [
    { id: "kopke-vintage", nome: { pt: "Kopke Vintage tinto", en: "Kopke Vintage red" }, descricao: cal5, preco: 6.0 },
    { id: "kopke-tinto", nome: { pt: "Kopke tinto", en: "Kopke red" }, descricao: cal5, preco: 3.0 },
    { id: "kopke-branco", nome: { pt: "Kopke branco", en: "Kopke white" }, descricao: cal5, preco: 3.0 },

    { id: "lavradores", nome: { pt: "Lavradores de Feitoria", en: "Lavradores de Feitoria" }, descricao: { pt: "Douro", en: "Douro" }, variantes: garrafas(null, 17.0) },
    { id: "ervideira-tinto", nome: { pt: "Terras d'Ervideira", en: "Terras d'Ervideira" }, descricao: { pt: "Alentejo", en: "Alentejo" }, variantes: garrafas(10.0, 16.0) },
    { id: "arribas-tinto", nome: { pt: "Arribas do Douro", en: "Arribas do Douro" }, descricao: { pt: "Douro", en: "Douro" }, variantes: garrafas(null, 15.0) },

    { id: "ervideira-branco", nome: { pt: "Terras d'Ervideira", en: "Terras d'Ervideira" }, descricao: { pt: "Alentejo", en: "Alentejo" }, variantes: garrafas(null, 16.0) },
    { id: "arribas-branco", nome: { pt: "Arribas do Douro", en: "Arribas do Douro" }, descricao: { pt: "Douro", en: "Douro" }, variantes: garrafas(null, 15.0) },
    { id: "muros-sao-luiz", nome: { pt: "Muros São Luiz", en: "Muros São Luiz" }, descricao: { pt: "Douro", en: "Douro" }, variantes: garrafas(null, 14.0) },
    { id: "conde-monsul", nome: { pt: "Conde de Monsul", en: "Conde de Monsul" }, descricao: { pt: "Douro", en: "Douro" }, variantes: [{ id: "037", nome: { pt: "0,37 L", en: "0.37 L" }, preco: 10.0 }] },

    { id: "deu-la-deu", nome: { pt: "Deu-la-Deu Alvarinho", en: "Deu-la-Deu Alvarinho" }, variantes: garrafas(null, 17.0) },
    { id: "casa-tojeira", nome: { pt: "Casa da Tojeira", en: "Casa da Tojeira" }, descricao: { pt: "Alvarinho e trajadura", en: "Alvarinho and trajadura" }, variantes: garrafas(null, 13.0) },
    { id: "encosta-xisto", nome: { pt: "Encosta do Xisto", en: "Encosta do Xisto" }, descricao: { pt: "Seco, Minho", en: "Dry, Minho" }, variantes: garrafas(null, 13.0) },

    { id: "mateus", nome: { pt: "Mateus", en: "Mateus" }, variantes: garrafas(null, 12.0) },
    { id: "arca-nova", nome: { pt: "Arca Nova", en: "Arca Nova" }, variantes: garrafas(null, 10.0) },

    { id: "ermelinda-tinto", nome: { pt: "Casa Ermelinda Freitas maduro tinto", en: "Casa Ermelinda Freitas red" }, variantes: garrafas(null, 12.0) },
    { id: "ermelinda-branco", nome: { pt: "Casa Ermelinda Freitas maduro branco", en: "Casa Ermelinda Freitas white" }, variantes: garrafas(null, 12.0) },
    { id: "portal-tojeira", nome: { pt: "Portal da Tojeira Premium verde branco", en: "Portal da Tojeira Premium Vinho Verde" }, variantes: garrafas(null, 12.0) },
    { id: "copo-vinho", nome: { pt: "Copo de maduro ou verde", en: "Glass of red, white or Vinho Verde" }, descricao: { pt: "0,20 L", en: "0.20 L" }, preco: 3.0 },

    { id: "murganheira", nome: { pt: "Murganheira Super Reserva", en: "Murganheira Super Reserva" }, preco: 30.0 },
    { id: "terras-demo", nome: { pt: "Terras do Demo", en: "Terras do Demo" }, preco: 18.0 },
    { id: "terras-demo-rose", nome: { pt: "Terras do Demo rosé", en: "Terras do Demo rosé" }, preco: 18.0 },
  ],
};

export const licores: Categoria = {
  id: "licores",
  nome: { pt: "Licores e destilados", en: "Liqueurs and spirits" },
  subgrupos: [
    { id: "licor", nome: { pt: "Licor e rum", en: "Liqueur and rum" }, itens: ["baileys", "beirao", "amendoa", "cacique"] },
    { id: "whisky", nome: { pt: "Whisky", en: "Whisky" }, itens: ["macallan", "glenrothes", "cardhu", "old-parr", "bushmills", "jack-daniels", "cutty-sark"] },
    { id: "aguardente", nome: { pt: "Aguardente", en: "Aguardente" }, itens: ["chancella", "crf"] },
  ],
  itens: [
    { id: "baileys", nome: { pt: "Baileys", en: "Baileys" }, descricao: cal5, preco: 5.0 },
    { id: "beirao", nome: { pt: "Licor Beirão", en: "Licor Beirão" }, descricao: cal5, preco: 4.0 },
    { id: "amendoa", nome: { pt: "Amêndoa amarga", en: "Bitter almond liqueur" }, descricao: cal5, preco: 4.0 },
    { id: "cacique", nome: { pt: "Cacique", en: "Cacique rum" }, descricao: cal5, preco: 6.0 },

    { id: "macallan", nome: { pt: "Macallan", en: "Macallan" }, descricao: cal5, preco: 18.0 },
    { id: "glenrothes", nome: { pt: "Glenrothes", en: "Glenrothes" }, descricao: cal5, preco: 10.0 },
    { id: "cardhu", nome: { pt: "Cardhu", en: "Cardhu" }, descricao: cal5, preco: 9.0 },
    { id: "old-parr", nome: { pt: "Old Parr", en: "Old Parr" }, descricao: cal5, preco: 8.0 },
    { id: "bushmills", nome: { pt: "Bushmills", en: "Bushmills" }, descricao: cal5, preco: 6.0 },
    { id: "jack-daniels", nome: { pt: "Jack Daniel's", en: "Jack Daniel's" }, descricao: cal5, preco: 6.0 },
    { id: "cutty-sark", nome: { pt: "Cutty Sark", en: "Cutty Sark" }, descricao: cal5, preco: 5.0 },

    { id: "chancella", nome: { pt: "Chancella Velha", en: "Chancella Velha" }, descricao: cal5, preco: 5.0 },
    { id: "crf", nome: { pt: "CRF", en: "CRF" }, preco: 4.5 },
  ],
};
