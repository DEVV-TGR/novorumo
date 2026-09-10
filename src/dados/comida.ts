/**
 * A comida, tal como está na carta impressa (`originais/CartaNovoRumo.pdf`).
 *
 * Os preços e os ingredientes são os do PDF e não se mudam de cabeça: quem
 * alterar aqui alguma coisa confirma primeiro com a casa. A tradução inglesa
 * não existe na carta impressa fora das sobremesas e dos gins — foi escrita
 * para o site, porque metade da esplanada em agosto não lê português.
 */

import type { Categoria } from "@/lib/carta";

/** A rústica leva sempre o mesmo, e a carta repete-o em asterisco cinco vezes. */
const RUSTICA = {
  pt: "rústica com cheddar, bacon e cebola crocante",
  en: "rustic with cheddar, bacon and crispy onion",
};

/** Os três feitios de batata, com os preços do prato em que entram. */
function batatas(palito: number, rustica: number, doce: number) {
  return [
    { id: "palito", nome: { pt: "Palito", en: "Fries" }, preco: palito },
    { id: "rustica", nome: { pt: "Rústica", en: "Rustic" }, preco: rustica },
    { id: "doce", nome: { pt: "Doce", en: "Sweet potato" }, preco: doce },
  ];
}

const SEM_ALTERACOES = {
  pt: "Não é permitida nenhuma alteração.",
  en: "No changes allowed.",
};

export const pequenoAlmoco: Categoria = {
  id: "pequeno-almoco",
  nome: { pt: "Pequeno-almoço", en: "Breakfast" },
  janela: { abre: "09:00", fecha: "12:00" },
  itens: [
    {
      id: "pastelaria",
      nome: { pt: "Pastelaria variada", en: "Assorted pastries" },
      descricao: { pt: "Nata e queijadinha", en: "Custard tart and cheese tart" },
      preco: 1.6,
    },
    {
      id: "pao-manteiga",
      nome: { pt: "Pão com manteiga", en: "Bread and butter" },
      descricao: { pt: "Pão de água", en: "White roll" },
      preco: 1.6,
    },
    {
      id: "torrada",
      nome: { pt: "Torrada", en: "Toast" },
      descricao: { pt: "Pão saloio", en: "Country bread" },
      variantes: [
        { id: "meia", nome: { pt: "Meia", en: "Half" }, preco: 2.0 },
        { id: "inteira", nome: { pt: "Inteira", en: "Whole" }, preco: 2.2 },
      ],
    },
    {
      id: "sande-mista",
      nome: { pt: "Sande fria mista", en: "Ham and cheese sandwich" },
      descricao: { pt: "Pão de água", en: "White roll" },
      preco: 3.3,
    },
    {
      id: "tosta-mista",
      nome: { pt: "Tosta mista", en: "Toasted ham and cheese" },
      descricao: { pt: "Pão saloio", en: "Country bread" },
      preco: 3.8,
    },
    {
      id: "tosta-mista-ovo",
      nome: { pt: "Tosta mista com ovo", en: "Toasted ham and cheese with egg" },
      descricao: { pt: "Pão saloio", en: "Country bread" },
      preco: 4.8,
    },
    {
      id: "croissant-simples",
      nome: { pt: "Croissant (folhado)", en: "Croissant" },
      descricao: { pt: "Simples | manteiga", en: "Plain | butter" },
      preco: 1.7,
    },
    {
      id: "croissant-misto",
      nome: { pt: "Croissant (folhado)", en: "Croissant" },
      descricao: {
        pt: "Misto | queijo | fiambre | doce de abóbora | Nutella",
        en: "Ham and cheese | cheese | ham | pumpkin jam | Nutella",
      },
      preco: 3.7,
    },
  ],
};

export const entradas: Categoria = {
  id: "entradas",
  nome: { pt: "Entradas | Tapas", en: "Starters | Tapas" },
  descricao: { pt: "Almoço • Jantar", en: "Lunch • Dinner" },
  nota: SEM_ALTERACOES,
  itens: [
    {
      id: "creme-legumes",
      nome: { pt: "Creme de legumes", en: "Vegetable soup" },
      descricao: { pt: "250 ml", en: "250 ml" },
      preco: 2.5,
      vegetariano: true,
    },
    {
      id: "sopa-peixe",
      nome: { pt: "Sopa de peixe à Novo Rumo", en: "Novo Rumo fish soup" },
      descricao: { pt: "250 ml", en: "250 ml" },
      preco: 6.0,
    },
    {
      id: "couvert",
      nome: { pt: "Couvert", en: "Couvert" },
      descricao: {
        pt: "Cesto de pão, azeitonas temperadas, paté de atum e manteiga",
        en: "Bread basket, seasoned olives, tuna paté and butter",
      },
      preco: 5.5,
    },
    {
      id: "pao-alho",
      nome: { pt: "Pão de alho", en: "Garlic bread" },
      preco: 2.8,
      vegetariano: true,
    },
    {
      id: "pao-chourico",
      nome: { pt: "Pão com chouriço à Novo Rumo", en: "Novo Rumo chouriço bread" },
      descricao: { pt: "Queijo e chourição", en: "Cheese and chouriço" },
      preco: 4.5,
    },
    {
      id: "travessa-batata",
      nome: { pt: "Travessa de batata", en: "Potato platter" },
      variantes: batatas(4.0, 5.5, 6.5),
      nota: RUSTICA,
      vegetariano: true,
    },
    {
      id: "prato-batata",
      nome: { pt: "Prato de batata", en: "Potato plate" },
      variantes: batatas(2.5, 3.0, 4.0),
      nota: RUSTICA,
      vegetariano: true,
    },
    {
      id: "salsicha",
      nome: { pt: "Salsicha à Novo Rumo", en: "Novo Rumo sausage" },
      descricao: {
        pt: "Cebola caramelizada, salsicha recheada com queijo, mostarda e ketchup",
        en: "Caramelised onion, cheese-stuffed sausage, mustard and ketchup",
      },
      preco: 6.0,
    },
    {
      id: "ovos-rotos",
      nome: { pt: "Ovos rotos", en: "Broken eggs" },
      variantes: [
        { id: "camarao", nome: { pt: "Camarão", en: "Prawn" }, preco: 15.5 },
        { id: "cogumelos", nome: { pt: "Cogumelos", en: "Mushroom" }, preco: 13.0 },
        { id: "tradicional", nome: { pt: "Tradicional", en: "Traditional" }, preco: 11.5 },
      ],
    },
    {
      id: "pica-pau",
      nome: { pt: "Pica-pau à Novo Rumo", en: "Novo Rumo pica-pau" },
      preco: 11.5,
      destaque: true,
    },
    {
      id: "ameijoas",
      nome: { pt: "Amêijoas à Bulhão Pato", en: "Clams Bulhão Pato" },
      descricao: { pt: "Dose 300 g", en: "300 g" },
      preco: 12.5,
      alergenios: ["moluscos"],
    },
    {
      id: "gambas",
      nome: { pt: "Gambas salteadas", en: "Sautéed prawns" },
      descricao: { pt: "Black tiger, dose 300 g", en: "Black tiger, 300 g" },
      preco: 19.0,
      alergenios: ["crustaceos"],
    },
  ],
};

export const emPao: Categoria = {
  id: "em-pao",
  nome: { pt: "Em pão", en: "In bread" },
  itens: [
    {
      id: "baguete-salmao",
      nome: { pt: "Baguete de salmão fumado", en: "Smoked salmon baguette" },
      descricao: {
        pt: "Salmão fumado, tomate, rúcula e queijo creme",
        en: "Smoked salmon, tomato, rocket and cream cheese",
      },
      preco: 10.0,
      alergenios: ["peixe", "gluten", "lacticinios"],
    },
    {
      id: "baguete-frango",
      nome: { pt: "Baguete de frango", en: "Chicken baguette" },
      descricao: {
        pt: "Frango grelhado, alface, tomate e ovo cozido",
        en: "Grilled chicken, lettuce, tomato and boiled egg",
      },
      preco: 7.5,
      alergenios: ["gluten", "ovo"],
    },
    {
      id: "francesinha-pirata",
      nome: { pt: "Francesinha à Pirata", en: "Pirate francesinha" },
      descricao: {
        pt: "Baguete com linguiça, fiambre, queijo e pincelada com molho de francesinha",
        en: "Baguette with linguiça sausage, ham and cheese, brushed with francesinha sauce",
      },
      preco: 7.5,
      alergenios: ["gluten", "lacticinios"],
    },
    {
      id: "baguete-atum",
      nome: { pt: "Baguete de atum", en: "Tuna baguette" },
      descricao: {
        pt: "Pasta de atum, ovo cozido, alface e tomate",
        en: "Tuna spread, boiled egg, lettuce and tomato",
      },
      preco: 6.0,
      alergenios: ["peixe", "gluten", "ovo"],
    },
    {
      id: "cachorro-prensado",
      nome: { pt: "Cachorro prensado", en: "Pressed hot dog" },
      descricao: {
        pt: "Salsicha fumada, queijo e fiambre",
        en: "Smoked sausage, cheese and ham",
      },
      preco: 6.0,
      alergenios: ["gluten", "lacticinios"],
    },
    {
      id: "prego-bolo-caco",
      nome: { pt: "Prego em bolo do caco", en: "Steak in bolo do caco" },
      descricao: {
        pt: "Bife 140 g coração de alcatra, fiambre e ovo frito",
        en: "140 g rump heart steak, ham and fried egg",
      },
      preco: 8.5,
      alergenios: ["gluten", "ovo"],
    },
    {
      id: "hamburguer",
      nome: { pt: "Hambúrguer à Novo Rumo", en: "Novo Rumo burger" },
      descricao: {
        pt: "Carne Angus 160 g, queijo cheddar, bacon fumado, ovo frito, alface e tomate",
        en: "160 g Angus beef, cheddar, smoked bacon, fried egg, lettuce and tomato",
      },
      preco: 10.0,
      destaque: true,
      alergenios: ["gluten", "lacticinios", "ovo"],
    },
  ],
};

export const emPrato: Categoria = {
  id: "em-prato",
  nome: { pt: "Em prato", en: "Main plates" },
  nota: RUSTICA,
  itens: [
    {
      id: "prego-prato",
      nome: { pt: "Prego", en: "Steak plate" },
      descricao: {
        pt: "Bife 220 g coração de alcatra, presunto, ovo estrelado e maionese de lima",
        en: "220 g rump heart steak, cured ham, fried egg and lime mayonnaise",
      },
      acompanhamento: { pt: "com batata", en: "with potato" },
      variantes: batatas(13.0, 14.5, 16.0),
    },
    {
      id: "francesinha",
      nome: { pt: "Francesinha à Novo Rumo", en: "Novo Rumo francesinha" },
      descricao: {
        pt: "Bife 120 g coração de alcatra, queijo, fiambre, linguiça, salsicha fumada, paio, ovo estrelado e molho de francesinha",
        en: "120 g rump heart steak, cheese, ham, linguiça, smoked sausage, paio, fried egg and francesinha sauce",
      },
      acompanhamento: { pt: "com batata", en: "with potato" },
      variantes: batatas(13.5, 15.0, 16.5),
      destaque: true,
    },
    {
      id: "meia-francesinha",
      nome: { pt: "Meia francesinha", en: "Half francesinha" },
      acompanhamento: { pt: "com batata", en: "with potato" },
      variantes: batatas(12.0, 13.5, 15.0),
    },
    {
      id: "cachorro-especial",
      nome: { pt: "Cachorro especial", en: "Special hot dog" },
      descricao: {
        pt: "Salsicha fumada, queijo, fiambre, ovo frito e molho de francesinha",
        en: "Smoked sausage, cheese, ham, fried egg and francesinha sauce",
      },
      acompanhamento: { pt: "com batata", en: "with potato" },
      variantes: batatas(12.0, 13.5, 15.0),
    },
    {
      id: "terrina-molho",
      nome: { pt: "Terrina de molho", en: "Jug of sauce" },
      descricao: { pt: "250 ml", en: "250 ml" },
      preco: 3.0,
    },
  ],
};

export const pizzas: Categoria = {
  id: "pizzas",
  nome: { pt: "Pizzas", en: "Pizzas" },
  descricao: { pt: "Tamanho grande", en: "Large" },
  nota: {
    pt: "Qualquer alteração nos ingredientes implica uma pizza à escolha.",
    en: "Any change to the ingredients means it becomes a build-your-own pizza.",
  },
  itens: [
    {
      id: "pizza-salmao",
      nome: { pt: "Salmão", en: "Salmon" },
      descricao: {
        pt: "Salmão, queijo mozzarella, molho de queijo creme, ovo cozido, cebola roxa, azeitonas laminadas e vinagre balsâmico",
        en: "Salmon, mozzarella, cream cheese sauce, boiled egg, red onion, sliced olives and balsamic vinegar",
      },
      preco: 18.0,
    },
    {
      id: "pizza-nova",
      nome: { pt: "Nova", en: "Nova" },
      descricao: {
        pt: "Presunto, queijo mozzarella, tomate seco e rúcula",
        en: "Cured ham, mozzarella, sun-dried tomato and rocket",
      },
      preco: 17.5,
    },
    {
      id: "pizza-novo-rumo",
      nome: { pt: "Novo Rumo", en: "Novo Rumo" },
      descricao: {
        pt: "Miolo de gambas, queijo mozzarella, atum e delícias do mar",
        en: "Prawns, mozzarella, tuna and seafood sticks",
      },
      preco: 17.5,
      destaque: true,
      alergenios: ["crustaceos", "peixe"],
    },
    {
      id: "pizza-pepperoni",
      nome: { pt: "Pepperoni", en: "Pepperoni" },
      descricao: { pt: "Pepperoni e queijo mozzarella", en: "Pepperoni and mozzarella" },
      preco: 17.5,
    },
    {
      id: "pizza-quatro-estacoes",
      nome: { pt: "Quatro estações", en: "Four seasons" },
      descricao: {
        pt: "Fiambre, queijo mozzarella, cogumelos frescos, atum e chourição",
        en: "Ham, mozzarella, fresh mushrooms, tuna and chouriço",
      },
      preco: 16.5,
    },
    {
      id: "pizza-nossa",
      nome: { pt: "Nossa", en: "Ours" },
      descricao: {
        pt: "Ananás, presunto, queijo mozzarella, cebola roxa e tiras de pimentos",
        en: "Pineapple, cured ham, mozzarella, red onion and pepper strips",
      },
      preco: 16.5,
    },
    {
      id: "pizza-fiambre",
      nome: { pt: "Fiambre", en: "Ham" },
      descricao: { pt: "Fiambre, queijo mozzarella e tomate", en: "Ham, mozzarella and tomato" },
      preco: 16.5,
    },
    {
      id: "pizza-escolha",
      nome: { pt: "À escolha", en: "Build your own" },
      descricao: { pt: "Três ingredientes", en: "Three toppings" },
      preco: 23.5,
    },
  ],
};

export const massas: Categoria = {
  id: "massas",
  nome: { pt: "Massas", en: "Pasta" },
  nota: {
    pt: "Base à escolha: esparguete, esparguete tricolor ou linguini com ovo. Qualquer alteração nos ingredientes implica uma massa à escolha.",
    en: "Choose the base: spaghetti, tricolour spaghetti or egg linguine. Any change to the ingredients means it becomes a build-your-own pasta.",
  },
  itens: [
    {
      id: "massa-salmao",
      nome: { pt: "Salmão", en: "Salmon" },
      descricao: {
        pt: "Salmão fumado, esparguete, natas, gema de ovo, queijo parmesão, rúcula e sumo de limão",
        en: "Smoked salmon, spaghetti, cream, egg yolk, parmesan, rocket and lemon juice",
      },
      preco: 14.0,
      alergenios: ["peixe", "gluten", "lacticinios", "ovo"],
    },
    {
      id: "massa-gamberetti",
      nome: { pt: "Gamberetti", en: "Gamberetti" },
      descricao: {
        pt: "Miolo de gambas, linguini de ovo, tomate seco, azeite e alho",
        en: "Prawns, egg linguine, sun-dried tomato, olive oil and garlic",
      },
      preco: 13.0,
      alergenios: ["crustaceos", "gluten", "ovo"],
    },
    {
      id: "massa-frango",
      nome: { pt: "Frango", en: "Chicken" },
      descricao: {
        pt: "Peito de frango, esparguete tricolor, cogumelos frescos, azeitonas laminadas, tomate seco, azeite e alho",
        en: "Chicken breast, tricolour spaghetti, fresh mushrooms, sliced olives, sun-dried tomato, olive oil and garlic",
      },
      preco: 12.0,
    },
    {
      id: "massa-carbonara",
      nome: { pt: "Carbonara à Novo Rumo", en: "Novo Rumo carbonara" },
      descricao: {
        pt: "Presunto, esparguete, bacon fumado, ovo cozido e natas",
        en: "Cured ham, spaghetti, smoked bacon, boiled egg and cream",
      },
      preco: 11.0,
    },
    {
      id: "massa-bolonhesa",
      nome: { pt: "Bolonhesa", en: "Bolognese" },
      descricao: {
        pt: "Carne picada, esparguete e queijo gratinado",
        en: "Minced beef, spaghetti and gratinated cheese",
      },
      preco: 10.0,
    },
    {
      id: "massa-escolha",
      nome: { pt: "À escolha", en: "Build your own" },
      descricao: { pt: "Três ingredientes", en: "Three ingredients" },
      preco: 20.0,
    },
  ],
};

export const saladas: Categoria = {
  id: "saladas",
  nome: { pt: "Saladas", en: "Salads" },
  nota: {
    pt: "Base: alface, tomate, cebola roxa, cenoura e croutons. Qualquer alteração nos ingredientes implica uma salada à escolha.",
    en: "Base: lettuce, tomato, red onion, carrot and croutons. Any change to the ingredients means it becomes a build-your-own salad.",
  },
  itens: [
    {
      id: "salada-salmao",
      nome: { pt: "Salmão", en: "Salmon" },
      descricao: {
        pt: "Salmão fumado, rúcula, nozes, maçã e ovo cozido",
        en: "Smoked salmon, rocket, walnuts, apple and boiled egg",
      },
      preco: 12.0,
      alergenios: ["peixe", "frutos-casca-rija", "ovo"],
    },
    {
      id: "salada-novo-rumo",
      nome: { pt: "Novo Rumo", en: "Novo Rumo" },
      descricao: {
        pt: "Atum, miolo de gambas, delícias do mar e ovo cozido",
        en: "Tuna, prawns, seafood sticks and boiled egg",
      },
      preco: 11.0,
      alergenios: ["peixe", "crustaceos", "ovo"],
    },
    {
      id: "salada-mista",
      nome: { pt: "Mista", en: "Mixed" },
      descricao: {
        pt: "Tomate, cebola roxa, cenoura, rúcula e vinagre balsâmico",
        en: "Tomato, red onion, carrot, rocket and balsamic vinegar",
      },
      preco: 5.5,
      vegetariano: true,
    },
    {
      id: "salada-escolha",
      nome: { pt: "À escolha", en: "Build your own" },
      descricao: { pt: "Três ingredientes", en: "Three ingredients" },
      preco: 15.0,
    },
  ],
};

export const vegetariano: Categoria = {
  id: "vegetariano",
  nome: { pt: "Prato vegetariano", en: "Vegetarian" },
  nota: {
    pt: "Ingredientes: alho-francês, ervilha de quebrar, rebentos de bambu, cogumelos e cebola roxa. Base à escolha: esparguete, esparguete tricolor ou linguini com ovo. Não é permitida nenhuma alteração.",
    en: "Ingredients: leek, snap peas, bamboo shoots, mushrooms and red onion. Choose the base: spaghetti, tricolour spaghetti or egg linguine. No changes allowed.",
  },
  itens: [
    {
      id: "massa-pesto",
      nome: { pt: "Massa al pesto", en: "Pasta al pesto" },
      descricao: {
        pt: "Linguini com ovo, molho pesto e parmesão",
        en: "Egg linguine, pesto and parmesan",
      },
      preco: 11.0,
      vegetariano: true,
    },
    {
      id: "legumes-bras",
      nome: { pt: "Legumes à brás", en: "Vegetables à brás" },
      preco: 10.0,
      vegetariano: true,
    },
    {
      id: "massa-legumes",
      nome: { pt: "Massa com legumes", en: "Pasta with vegetables" },
      preco: 9.0,
      vegetariano: true,
    },
  ],
};

export const infantil: Categoria = {
  id: "infantil",
  nome: { pt: "Prato infantil", en: "Children's menu" },
  descricao: { pt: "Até 12 anos", en: "Up to 12 years old" },
  nota: RUSTICA,
  itens: [
    {
      id: "infantil-prego",
      nome: { pt: "Prego ou frango", en: "Steak or chicken" },
      descricao: {
        pt: "Bife 140 g coração de alcatra ou frango, e ovo estrelado",
        en: "140 g rump heart steak or chicken, with a fried egg",
      },
      acompanhamento: { pt: "com batata", en: "with potato" },
      variantes: batatas(9.0, 10.5, 12.0),
    },
    {
      id: "infantil-bolonhesa",
      nome: { pt: "Massa bolonhesa", en: "Bolognese pasta" },
      descricao: {
        pt: "Carne picada, esparguete e queijo gratinado",
        en: "Minced beef, spaghetti and gratinated cheese",
      },
      preco: 8.0,
    },
  ],
};
