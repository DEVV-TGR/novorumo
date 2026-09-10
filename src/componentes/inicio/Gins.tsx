import Image from "next/image";
import Link from "next/link";
import { euros, texto } from "@/lib/carta";
import { gins } from "@/dados/gins";
import { Revelar } from "../Revelar";

/**
 * Os gins.
 *
 * Estas duas páginas da carta impressa tinham o texto convertido em curvas, o
 * que quer dizer que o Google nunca leu uma palavra delas. Aqui são texto.
 */
export function Gins() {
  const primeiros = gins.itens.slice(0, 4);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <Revelar className="order-2 lg:order-1">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[14px] bg-fundo-alt">
            <Image
              src="/fotos/gins.webp"
              alt="Gin Gordon's Pink servido em copo de balão com frutos vermelhos"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-contain p-8"
            />
          </div>
        </Revelar>

        <div className="order-1 lg:order-2">
          <Revelar>
            <h2 className="max-w-[20ch] font-display text-3xl font-semibold leading-tight text-marca sm:text-4xl">
              Dez gins, cada um com o seu botânico.
            </h2>
            <p className="mt-4 max-w-[48ch] leading-relaxed text-texto-suave">
              Servidos em copo de balão. O botânico não é enfeite: é o que a casa
              escolheu para cada um.
            </p>
          </Revelar>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {primeiros.map((gin, i) => (
              <Revelar key={gin.id} atraso={i * 0.06} className="h-full">
                <li className="flex h-full items-start gap-4 rounded-[14px] border border-linha bg-cartao p-4">
                  {gin.foto && (
                    <div className="relative h-14 w-14 shrink-0">
                      <Image
                        src={`${gin.foto}.webp`}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display font-semibold text-texto">
                        {texto(gin.nome, "pt")}
                      </h3>
                      <span className="tabular shrink-0 font-display font-semibold text-marca-viva">
                        {euros(gin.preco!)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-snug text-texto-suave">
                      {texto(gin.descricao!, "pt")}
                    </p>
                  </div>
                </li>
              </Revelar>
            ))}
          </ul>

          <Link
            href="/carta#gins"
            className="mt-8 inline-block font-display font-semibold text-marca-viva underline underline-offset-4 hover:text-marca"
          >
            Ver os dez na carta
          </Link>
        </div>
      </div>
    </section>
  );
}
