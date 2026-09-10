<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Novo Rumo, regras do projeto

## A carta é dados, não é decoração

Os preços, os nomes e os ingredientes em `src/dados/` foram transcritos da carta
impressa (`originais/CartaNovoRumo.pdf`). **Não se muda nada disso de cabeça.**
Se um preço parecer errado, confirma-se com a casa antes de tocar no ficheiro.

O modelo em `src/lib/carta.ts` tem de continuar a suportar variantes: a batata
tem três feitios com três preços, a torrada e a francesinha vendem-se a meias, e
o vinho tem 0,37 L e 0,75 L. Um item com um preço só é o caso fácil, não é o
caso geral.

## Tudo é bilingue à cabeça

Cada nome e cada descrição têm `pt` e `en`. Metade do argumento desta proposta é
que o turista de agosto consiga ler a carta. Um item novo sem tradução é um item
por acabar.

## Os assets vêm do PDF

O logótipo, os fundos e as fotos saem todos da carta impressa pelo
`scripts/extrair-da-carta.mjs`. Não se desenha um "+" parecido nem se vai buscar
uma textura semelhante a um banco de imagens: se é preciso um asset novo, ou sai
do PDF ou pede-se à casa.

**Não se usam fotografias de banco para os pratos.** Onde não há foto real, a
célula leva cor da marca e fica assinalado no README.

## Cores

Todas em `src/app/globals.css`, lidas dos vetores do PDF. Repara na diferença
entre `--marca` e `--sup-marca`: a primeira é cor de texto e clareia em modo
escuro, a segunda é cor de superfície e não. Trocá-las dá branco sobre azul
claro.

O ciano da marca só passa em contraste AA com texto escuro por cima. Está
comentado no `Faixa.tsx` e no `Destaques.tsx`.

## Português de Portugal

Texto do site, comentários e nomes de ficheiros. Tratamento por "tu" nunca
aparece: o site fala para clientes, e trata por "você" implícito ou evita o
pronome.
