import Link from "next/link";
import { site } from "@/lib/site";
import { RosaDosVentos } from "./RosaDosVentos";
import { MenuMovel } from "./MenuMovel";

const secoes = [
  { href: "/carta", texto: "Carta" },
  { href: "/#horarios", texto: "Horários" },
  { href: "/#onde", texto: "Onde estamos" },
];

/**
 * A barra fica colada ao topo e deixa o conteúdo passar por baixo, translúcida.
 *
 * Em telemóvel os links dão lugar a um botão que abre a folha do `MenuMovel`:
 * três links e um botão de reserva não cabem numa barra de 360 px sem ficarem
 * pequenos de mais para acertar com o dedo.
 */
export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-linha bg-fundo/80 backdrop-blur-xl backdrop-saturate-150">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-marca transition-transform active:scale-[0.97]"
        >
          <RosaDosVentos className="h-8 w-8 shrink-0" />
          <span className="font-display text-lg font-semibold tracking-[-0.02em]">
            {site.nome}
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <ul className="hidden items-center gap-5 text-sm sm:flex">
            {secoes.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="text-texto-suave transition-colors duration-150 hover:text-marca"
                >
                  {s.texto}
                </Link>
              </li>
            ))}
          </ul>

          {/*
            Levava ao marcador do telefone, que num computador de secretária não
            faz nada. Leva agora ao formulário, que já traz o número à vista
            para quem prefira falar com alguém.
          */}
          <Link
            href="/#reservar"
            className="hidden rounded-full bg-acento px-5 py-2 text-sm font-semibold text-tinta transition-transform duration-150 hover:brightness-105 active:scale-[0.97] sm:block"
          >
            Reservar
          </Link>

          <MenuMovel />
        </div>
      </nav>
    </header>
  );
}
