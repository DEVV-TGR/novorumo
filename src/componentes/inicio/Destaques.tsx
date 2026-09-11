import Image from "next/image";
import Link from "next/link";
import { euros, texto } from "@/lib/carta";
import { foto } from "@/dados/fotos";
import { Revelar } from "../Revelar";
import { RosaDosVentos } from "../RosaDosVentos";

/**
 * Os pratos da casa.
 *
 * A carta impressa não tem uma única fotografia dos pratos principais: as
 * únicas fotos que existem lá são as das sobremesas e as dos gins. As que aqui
 * estão vieram do Instagram da casa, e mesmo assim só duas células as levam.
 *
 * O critério é o de sempre: não se afirma o que não se sabe. Uma francesinha
 * na fotografia é uma francesinha, e um hambúrguer é um hambúrguer — o que a
 * fotografia não diz é qual das francesinhas da carta é aquela, e por isso a
 * legenda descreve e não nomeia. A pizza que temos fotografada leva salmão
 * fumado, que não é a Pizza Novo Rumo, e essa célula fica com a cor da marca
 * até a casa mandar a foto certa. O mesmo para o pica-pau e para a sangria.
 */
const pratos = [
  {
    nome: "Francesinha à Novo Rumo",
    descricao:
      "Bife do coração da alcatra, queijo, fiambre, linguiça, salsicha fumada, paio e ovo estrelado.",
    preco: 13.5,
    desde: true,
    tom: "principal",
    foto: "francesinha-na-esplanada",
  },
  {
    nome: "Pizza Novo Rumo",
    descricao: "Miolo de gambas, mozzarella, atum e delícias do mar.",
    preco: 17.5,
    tom: "ciano",
  },
  {
    nome: "Pica-pau à Novo Rumo",
    descricao: "A tapa que sai mais vezes para a esplanada.",
    preco: 11.5,
    tom: "papel",
  },
  {
    nome: "Sangria de maracujá",
    descricao: "Jarro de litro e meio, para a mesa toda.",
    preco: 22,
    tom: "acento",
  },
  {
    nome: "Hambúrguer à Novo Rumo",
    descricao: "Angus de 160 g, cheddar, bacon fumado e ovo estrelado.",
    preco: 10,
    tom: "papel",
    foto: "hamburgueres",
  },
] as const;

/**
 * Cada tom traz o seu par de cores já verificado em contraste. O ciano e o
 * laranja da marca pedem texto escuro; o navy pede branco.
 */
const tons = {
  principal: { caixa: "bg-sup-marca text-white", corpo: "text-white/85" },
  ciano: { caixa: "bg-sup-viva text-tinta", corpo: "text-tinta/80" },
  acento: { caixa: "bg-acento text-tinta", corpo: "text-tinta/80" },
  papel: { caixa: "bg-cartao text-texto border border-linha", corpo: "text-texto-suave" },
};

export function Destaques() {
  return (
    <section className="py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Revelar className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <h2 className="display-2 max-w-[18ch] font-display font-semibold text-marca">
            O que sai mais vezes da cozinha.
          </h2>
          <Link
            href="/carta"
            className="font-display font-semibold text-marca-viva underline underline-offset-4 hover:text-marca"
          >
            Ver a carta
          </Link>
        </Revelar>

        <div className="mt-8 grid gap-4 sm:mt-12 md:grid-cols-3">
          {pratos.map((p, i) => {
            const imagem = "foto" in p && p.foto ? foto(p.foto) : null;
            const grande = i === 0;

            return (
              <Revelar
                key={p.nome}
                atraso={i * 0.06}
                className={`h-full ${grande ? "md:col-span-2 md:row-span-2" : i === 4 ? "md:col-span-2" : ""}`}
              >
                <article
                  className={`relative flex h-full flex-col overflow-hidden rounded-[14px] ${
                    imagem ? "bg-sup-marca text-white" : `justify-between ${tons[p.tom].caixa}`
                  } ${
                    imagem ? "" : grande ? "p-5 sm:p-7 md:p-10" : "p-5 sm:p-7"
                  } ${grande ? "min-h-[16rem] sm:min-h-[18rem]" : "min-h-[10rem] sm:min-h-[11rem]"}`}
                >
                  {/*
                    Com fotografia o texto não vai por cima dela. Um véu escuro
                    que chegue para o branco passar em AA é um véu que tapa a
                    comida, e a comida é a razão de a fotografia aqui estar.
                    Fica em cima, inteira, e o texto por baixo em navy — como
                    já acontece nos cartões das sobremesas.

                    Na célula grande a fotografia ocupa o que sobrar; nas
                    outras leva altura fixa e não proporção, senão uma célula
                    de duas colunas puxava a linha inteira para o dobro da
                    altura e a que está ao lado ficava um retângulo vazio.
                  */}
                  {imagem && (
                    <div className={`relative w-full ${grande ? "flex-1" : "h-44 sm:h-52"}`}>
                      <Image
                        src={imagem.src}
                        alt={texto(imagem.legenda, "pt")}
                        fill
                        sizes="(max-width: 768px) 100vw, 66vw"
                        style={imagem.foco ? { objectPosition: imagem.foco } : undefined}
                        className="object-cover"
                      />
                    </div>
                  )}

                  {!imagem && grande && (
                    <RosaDosVentos
                      className="pointer-events-none absolute -right-12 -bottom-12 h-56 w-56 text-white/10"
                      aria-hidden
                    />
                  )}

                  <div className={imagem ? "p-5 sm:p-7" : "relative"}>
                    <h3
                      className={`font-display font-semibold leading-tight ${
                        grande ? "text-2xl sm:text-3xl" : "text-lg"
                      }`}
                    >
                      {p.nome}
                    </h3>
                    <p
                      className={`mt-2 max-w-[42ch] leading-relaxed ${
                        imagem ? "text-white/85" : tons[p.tom].corpo
                      } ${grande ? "text-base" : "text-sm"}`}
                    >
                      {p.descricao}
                    </p>
                    {imagem && (
                      <p className="tabular mt-4 font-display text-lg font-semibold">
                        {"desde" in p && p.desde ? "desde " : ""}
                        {euros(p.preco)}
                      </p>
                    )}
                  </div>

                  {/* Sem fotografia o preço fica encostado ao fundo, como sempre esteve. */}
                  {!imagem && (
                    <p className="tabular relative mt-6 font-display text-lg font-semibold">
                      {"desde" in p && p.desde ? "desde " : ""}
                      {euros(p.preco)}
                    </p>
                  )}
                </article>
              </Revelar>
            );
          })}
        </div>
      </div>
    </section>
  );
}
