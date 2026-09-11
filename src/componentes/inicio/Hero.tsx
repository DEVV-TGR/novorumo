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
    /*
      `svh` e não `dvh`. No telemóvel a barra de endereço encolhe quando se
      começa a rolar, o `dvh` cresce com isso, a secção crescia com ele e a
      fotografia de fundo re-enquadrava-se a meio do gesto — parecia que o
      fundo mexia. O `svh` é a altura com a barra à vista e não muda.
    */
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
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

      {/*
        No telemóvel a capa aperta-se para o cartão "Hoje" não ficar todo fora
        do ecrã: media 834 px contra ecrãs de 640 a 818, e o cartão — se a casa
        está aberta e até que horas, a coisa mais útil da página — ficava 195 px
        abaixo da dobra num Android de 360. Só encolhem o padding e as margens;
        o logótipo fica do tamanho que tem, porque é ele que faz quem conhece a
        casa reconhecer o site.
      */}
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 pt-10 pb-8 sm:gap-10 sm:px-6 sm:pt-16 sm:pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
        <div>
          <Lockup className="h-auto w-[min(58vw,15rem)] text-white sm:w-72" />

          <h1 className="display-1 mt-5 max-w-[16ch] font-display font-semibold text-white sm:mt-7">
            Na praia de Labruge desde 2010.
          </h1>

          <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-white/85 sm:mt-5 sm:text-lg">
            Pequeno-almoço às nove, cozinha ao meio-dia, gins ao pôr do sol.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
            <Link
              href="/carta"
              className="rounded-full bg-white px-7 py-3.5 font-display font-semibold text-navy transition-transform hover:bg-white/90 active:scale-[0.98]"
            >
              Ver a carta
            </Link>
            <Link
              href="/#reservar"
              className="rounded-full border border-white/60 bg-white/10 px-7 py-3.5 font-display font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 active:scale-[0.98]"
            >
              Reservar mesa
            </Link>
          </div>
        </div>

        {/* O que uma pessoa quer mesmo saber antes de meter o carro a andar. */}
        <div className="rounded-[14px] border border-white/25 bg-white/12 p-5 text-white backdrop-blur-md sm:p-7">
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
