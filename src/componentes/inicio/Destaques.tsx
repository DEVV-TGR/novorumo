import Link from "next/link";
import { euros } from "@/lib/carta";
import { Revelar } from "../Revelar";
import { RosaDosVentos } from "../RosaDosVentos";

/**
 * Os pratos da casa.
 *
 * A carta impressa não tem uma única fotografia dos pratos principais: as
 * únicas fotos que existem são as das sobremesas e as dos gins. Em vez de
 * encher isto com imagens de banco que não são a comida deles, as células
 * ganham cor da marca. Quando houver sessão fotográfica, entram aqui.
 */
const pratos = [
  {
    nome: "Francesinha à Novo Rumo",
    descricao:
      "Bife do coração da alcatra, queijo, fiambre, linguiça, salsicha fumada, paio e ovo estrelado.",
    preco: 13.5,
    desde: true,
    tom: "principal",
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

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {pratos.map((p, i) => (
            <Revelar
              key={p.nome}
              atraso={i * 0.06}
              className={`h-full ${i === 0 ? "md:col-span-2 md:row-span-2" : i === 4 ? "md:col-span-2" : ""}`}
            >
              <article
                className={`relative flex h-full flex-col justify-between overflow-hidden rounded-[14px] p-5 sm:p-7 ${tons[p.tom].caixa} ${
                  i === 0 ? "min-h-[16rem] sm:min-h-[18rem] md:p-10" : "min-h-[10rem] sm:min-h-[11rem]"
                }`}
              >
                {i === 0 && (
                  <RosaDosVentos
                    className="pointer-events-none absolute -right-12 -bottom-12 h-56 w-56 text-white/10"
                    aria-hidden
                  />
                )}
                <div className="relative">
                  <h3
                    className={`font-display font-semibold leading-tight ${
                      i === 0 ? "text-2xl sm:text-3xl" : "text-lg"
                    }`}
                  >
                    {p.nome}
                  </h3>
                  <p
                    className={`mt-2 max-w-[42ch] leading-relaxed ${tons[p.tom].corpo} ${
                      i === 0 ? "text-base" : "text-sm"
                    }`}
                  >
                    {p.descricao}
                  </p>
                </div>
                <p className="relative mt-6 tabular font-display text-lg font-semibold">
                  {"desde" in p && p.desde ? "desde " : ""}
                  {euros(p.preco)}
                </p>
              </article>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
