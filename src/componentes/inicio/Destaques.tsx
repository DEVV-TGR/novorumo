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
 * estão vieram do Instagram da casa.
 *
 * Duas são do prato: a francesinha é uma francesinha e o hambúrguer é um
 * hambúrguer — o que a fotografia não diz é qual dos da carta é aquele, e por
 * isso a legenda descreve e não nomeia. As outras três são **provisórias**,
 * marcadas como tal em `provisoria`: a pizza fotografada leva salmão fumado e
 * a Pizza Novo Rumo leva gambas; a travessa de petiscos parece um pica-pau
 * mas não se sabe se é; e a sangria não está fotografada, leva a esplanada
 * onde se bebe. Estão aqui para se ver como a secção fica com fotografia em
 * todas as células, e saem no dia em que a casa mandar as certas. Enquanto
 * cá estiverem, o texto alternativo descreve o que se vê e não o prato.
 *
 * O cartão é o das sobremesas: fotografia inteira em cima, o preço numa
 * pastilha no canto dela, nome e uma linha por baixo. A fotografia é a razão
 * de o cartão existir, por isso é ela que fica com a altura toda que sobra.
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
    foto: "pizza-salmao",
    provisoria: true,
  },
  {
    nome: "Pica-pau à Novo Rumo",
    descricao: "A tapa que sai mais vezes para a esplanada.",
    preco: 11.5,
    tom: "papel",
    foto: "tabua-de-petiscos",
    provisoria: true,
  },
  {
    nome: "Sangria de maracujá",
    descricao: "Jarro de litro e meio, para a mesa toda.",
    preco: 22,
    tom: "acento",
    foto: "esplanada-com-letreiro",
    provisoria: true,
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
 * Para as células sem fotografia, se alguma voltar a ficar sem ela. Cada tom
 * traz o seu par de cores já verificado em contraste: o ciano e o laranja da
 * marca pedem texto escuro, o navy pede branco.
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

        {/*
          Duas colunas no telemóvel e três a partir de `md:`. A francesinha
          ocupa a fila inteira no telemóvel e um quadrado de dois por dois no
          computador; o hambúrguer ocupa duas colunas só no computador. Dá
          três filas cheias no telemóvel e o mosaico de sempre no resto.
        */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-3">
          {pratos.map((p, i) => {
            const imagem = "foto" in p && p.foto ? foto(p.foto) : null;
            const grande = i === 0;
            const largo = i === 4;

            return (
              <Revelar
                key={p.nome}
                atraso={i * 0.06}
                className={`h-full ${grande ? "col-span-2 md:row-span-2" : largo ? "md:col-span-2" : ""}`}
              >
                <article
                  className={`relative flex h-full flex-col overflow-hidden rounded-[14px] ${
                    imagem
                      ? "bg-sup-marca text-white"
                      : `justify-between p-5 sm:p-7 ${grande ? "md:p-10" : ""} ${tons[p.tom].caixa}`
                  } ${grande ? "min-h-[16rem] sm:min-h-[18rem]" : "min-h-[10rem]"}`}
                >
                  {imagem ? (
                    <>
                      {/*
                        A fotografia leva a altura toda que sobra. As células
                        pequenas partem de uma proporção fixa e, no computador,
                        crescem (`grow`) até à altura da fila — senão a sangria,
                        ao lado do hambúrguer largo, ficava com um retângulo
                        navy vazio por baixo. A grande leva o que o `row-span-2`
                        lhe der; a larga do hambúrguer é uma faixa 2:1, senão
                        uma célula de duas colunas puxava a fila para o dobro.
                      */}
                      <div
                        className={`relative w-full ${
                          grande
                            ? "aspect-[16/10] md:aspect-auto md:min-h-0 md:flex-1"
                            : largo
                              ? "aspect-[4/3] md:aspect-[2/1]"
                              : "aspect-[4/3] md:grow"
                        }`}
                      >
                        <Image
                          src={imagem.src}
                          alt={texto(imagem.legenda, "pt")}
                          fill
                          sizes={
                            grande || largo
                              ? "(max-width: 768px) 100vw, 66vw"
                              : "(max-width: 768px) 50vw, 33vw"
                          }
                          style={imagem.foco ? { objectPosition: imagem.foco } : undefined}
                          className="object-cover"
                        />
                        {/*
                          O preço no canto da fotografia, como nas sobremesas
                          no telemóvel. A pastilha é opaca: o número lê-se
                          sobre qualquer foto. Tira ao texto de baixo uma
                          linha inteira, e é essa linha que a foto ganha.
                        */}
                        <span className="tabular absolute top-2 right-2 z-10 rounded-full bg-acento px-2 py-0.5 font-display text-xs font-semibold text-tinta sm:top-3 sm:right-3 sm:px-3 sm:py-1 sm:text-sm">
                          {"desde" in p && p.desde ? "desde " : ""}
                          {euros(p.preco)}
                        </span>
                      </div>

                      <div className="p-3 pt-2.5 sm:p-5 sm:pt-4">
                        <h3
                          className={`font-display leading-tight font-semibold ${
                            grande ? "text-[15px] sm:text-2xl" : "text-[15px] sm:text-lg"
                          }`}
                        >
                          {p.nome}
                        </h3>
                        <p
                          className={`mt-1 max-w-[42ch] text-xs leading-snug text-white/80 sm:mt-1.5 sm:leading-relaxed ${
                            grande ? "sm:text-base" : "sm:text-sm"
                          }`}
                        >
                          {p.descricao}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {grande && (
                        <RosaDosVentos
                          className="pointer-events-none absolute -right-12 -bottom-12 h-56 w-56 text-white/10"
                          aria-hidden
                        />
                      )}
                      <div className="relative">
                        <h3
                          className={`font-display leading-tight font-semibold ${
                            grande ? "text-2xl sm:text-3xl" : "text-lg"
                          }`}
                        >
                          {p.nome}
                        </h3>
                        <p
                          className={`mt-2 max-w-[42ch] leading-relaxed ${tons[p.tom].corpo} ${
                            grande ? "text-base" : "text-sm"
                          }`}
                        >
                          {p.descricao}
                        </p>
                      </div>
                      <p className="tabular relative mt-6 font-display text-lg font-semibold">
                        {"desde" in p && p.desde ? "desde " : ""}
                        {euros(p.preco)}
                      </p>
                    </>
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
