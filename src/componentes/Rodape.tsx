import Image from "next/image";
import Link from "next/link";
import {
  InstagramLogo,
  FacebookLogo,
  TiktokLogo,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { site, legal } from "@/lib/site";
import { Lockup } from "./Lockup";

/**
 * O fecho.
 *
 * Usa o segundo fundo da carta: é a mesma textura da capa, rodada, tal como
 * está impressa na contracapa. O site acaba como o objeto acaba.
 *
 * O aviso do couvert não é decoração legal: o Decreto-Lei n.º 10/2015 obriga a
 * que esteja onde o cliente o possa ler, e a carta impressa também o traz.
 */
const redes = [
  { href: site.redes.instagram, nome: "Instagram", Icone: InstagramLogo },
  { href: site.redes.facebook, nome: "Facebook", Icone: FacebookLogo },
  { href: site.redes.tiktok, nome: "TikTok", Icone: TiktokLogo },
];

export function Rodape() {
  return (
    <footer className="relative isolate overflow-hidden text-white">
      <Image
        src="/fundos/lowpoly-invertido.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-navy/60" aria-hidden />

      <div className="mx-auto max-w-6xl px-4 pt-20 pb-10 sm:px-6 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr_1fr]">
          <div>
            <Lockup className="h-auto w-48 text-white" />
            <p className="mt-6 max-w-[30ch] text-sm leading-relaxed text-white/85">
              Restaurante, bar e pizzaria na praia de Labruge desde {site.desde}.
            </p>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white/75">
              Contactos
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`tel:${site.telemovelE164}`}
                  className="inline-flex items-center gap-2 hover:underline"
                >
                  <Phone size={16} weight="fill" />
                  {site.telemovel}
                </a>
              </li>
              <li>
                <a href={`tel:${site.fixoE164}`} className="hover:underline">
                  {site.fixo}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:underline">
                  {site.email}
                </a>
              </li>
              <li className="pt-2 text-white/85">
                {site.morada.rua}
                <br />
                {site.morada.codigoPostal} {site.morada.localidade}
              </li>
            </ul>

            <ul className="mt-6 flex gap-3">
              {redes.map(({ href, nome, Icone }) => (
                <li key={nome}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={nome}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/15"
                  >
                    <Icone size={19} weight="fill" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white/75">
              Horários
            </h2>
            <dl className="mt-4 space-y-2 text-sm text-white/85">
              <div className="flex justify-between gap-4">
                <dt>Domingo a terça</dt>
                <dd className="tabular">9h - 22h</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Quarta</dt>
                <dd className="tabular">9h - 15h</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Quinta</dt>
                <dd>encerrado</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Sexta e sábado</dt>
                <dd className="tabular">9h - 23h</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-white/20 pt-2">
                <dt>Cozinha</dt>
                <dd className="tabular">12h - 21h30</dd>
              </div>
            </dl>
            <Link
              href="/#horarios"
              className="mt-4 inline-block text-sm underline underline-offset-4 hover:text-white/80"
            >
              Horário de verão
            </Link>
          </div>
        </div>

        <div className="mt-14 space-y-3 border-t border-white/20 pt-8 text-xs leading-relaxed text-white/80">
          <p>{legal.iva.pt}</p>
          <p className="max-w-[80ch]">{legal.couvert.pt}</p>
          <p>
            Neste estabelecimento existe{" "}
            <a
              href={legal.livroReclamacoes}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              livro de reclamações eletrónico
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
