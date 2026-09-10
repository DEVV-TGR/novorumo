import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { Lockup } from "../Lockup";
import { Estado } from "../Estado";
import { horarioDoDia, epocaDe, hora } from "@/lib/horarios";

/**
 * A capa.
 *
 * O fundo é o mesmo low-poly que está impresso na capa da carta, extraído do
 * PDF, e não uma textura parecida. O lockup também. A ideia é que quem conhece
 * a casa reconheça o site antes de ler uma palavra.
 */
export function Hero() {
  const hoje = horarioDoDia(new Date());
  const epoca = epocaDe(new Date());

  return (
    <section className="relative isolate flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden">
      <Image
        src="/fundos/lowpoly.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* Escurece o canto do texto o suficiente para o branco passar em AA. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/70 via-navy/35 to-transparent"
        aria-hidden
      />

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pt-16 pb-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
        <div>
          <Lockup className="h-auto w-56 text-white sm:w-72" />

          <h1 className="mt-8 max-w-[16ch] font-display text-4xl font-semibold leading-[1.05] text-white md:text-5xl lg:text-6xl">
            Na praia de Labruge desde 2010.
          </h1>

          <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-white/85 sm:text-lg">
            Pequeno-almoço às nove, cozinha ao meio-dia, gins ao pôr do sol.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/carta"
              className="rounded-full bg-white px-7 py-3.5 font-display font-semibold text-navy transition-transform hover:bg-white/90 active:scale-[0.98]"
            >
              Ver a carta
            </Link>
            <a
              href={`tel:${site.telemovelE164}`}
              className="rounded-full border border-white/60 bg-white/10 px-7 py-3.5 font-display font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 active:scale-[0.98]"
            >
              Reservar
            </a>
          </div>
        </div>

        {/* O que uma pessoa quer mesmo saber antes de meter o carro a andar. */}
        <div className="rounded-[14px] border border-white/25 bg-white/12 p-6 text-white backdrop-blur-md sm:p-7">
          <p className="font-display text-lg font-semibold">Hoje</p>
          <div className="mt-3 [&_*]:!text-white/90 [&_strong]:!text-white">
            <Estado />
          </div>

          <dl className="mt-5 space-y-2 border-t border-white/20 pt-5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-white/70">Estabelecimento</dt>
              <dd className="tabular">
                {hoje.casa ? `${hora(hoje.casa.abre)} às ${hora(hoje.casa.fecha)}` : "encerrado"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/70">Cozinha</dt>
              <dd className="tabular">
                {hoje.cozinha
                  ? `${hora(hoje.cozinha.abre)} às ${hora(hoje.cozinha.fecha)}`
                  : "encerrada"}
              </dd>
            </div>
          </dl>

          {epoca === "alta" && (
            <p className="mt-4 text-sm text-white/70">
              Horário de verão: abrimos todos os dias.
            </p>
          )}

          <a
            href={site.mapas.google}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block text-sm font-semibold text-white underline underline-offset-4 hover:text-white/80"
          >
            {site.morada.rua}, {site.morada.localidade}
          </a>
        </div>
      </div>
    </section>
  );
}
