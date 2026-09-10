import Link from "next/link";
import { site } from "@/lib/site";
import { RosaDosVentos } from "./RosaDosVentos";

const secoes = [
  { href: "/carta", texto: "Carta" },
  { href: "/#horarios", texto: "Horários" },
  { href: "/#onde", texto: "Onde estamos" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-linha bg-fundo/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-marca">
          <RosaDosVentos className="h-8 w-8 shrink-0" />
          <span className="font-display text-lg font-semibold tracking-tight">
            {site.nome}
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-5">
          <ul className="hidden items-center gap-5 text-sm sm:flex">
            {secoes.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="text-texto-suave transition-colors hover:text-marca"
                >
                  {s.texto}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={`tel:${site.telemovelE164}`}
            className="rounded-full bg-acento px-4 py-2 text-sm font-semibold text-tinta transition-transform hover:brightness-105 active:scale-[0.98] sm:px-5"
          >
            Reservar
          </a>
        </div>
      </nav>
    </header>
  );
}
