"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  List,
  X,
  Phone,
  WhatsappLogo,
  InstagramLogo,
} from "@phosphor-icons/react";
import { site } from "@/lib/site";
import { Lockup } from "./Lockup";
import { Estado } from "./Estado";

/**
 * O menu de telemóvel: uma folha que desce de cima e tapa o ecrã.
 *
 * A folha entra com mola, não com duração fixa, porque uma mola arranca da
 * posição em que a coisa está e não do princípio. Quem fechar a meio da
 * entrada vê a folha voltar de onde ia, sem saltar.
 *
 * Sai por onde entrou, e sai mais depressa do que entra: a entrada é o
 * sistema a apresentar-se, a saída é a resposta a uma ordem, e uma resposta
 * lenta lê-se como lentidão.
 *
 * Com movimento reduzido ligado, a folha deixa de deslizar e passa a aparecer
 * e desaparecer no sítio.
 *
 * A folha é montada no `body` por portal, e não onde o botão vive. O cabeçalho
 * tem `backdrop-filter`, e um elemento com filtro passa a ser o bloco de
 * referência de tudo o que lá dentro seja `position: fixed`. Sem o portal, a
 * folha herdava os 64 px de altura da barra em vez do ecrã inteiro.
 */

const secoes = [
  {
    href: "/carta",
    texto: "Carta",
    nota: "Dezasseis secções, em português e inglês",
  },
  {
    href: "/#horarios",
    texto: "Horários",
    nota: "Das duas épocas, e o de hoje",
  },
  {
    href: "/#onde",
    texto: "Onde estamos",
    nota: "Rua da Marginal, à beira da praia",
  },
];

export function MenuMovel() {
  const [aberto, setAberto] = useState(false);
  const parado = useReducedMotion();

  // Enquanto a folha tapa o ecrã, a página por baixo não rola.
  useEffect(() => {
    if (!aberto) return;
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = antes;
    };
  }, [aberto]);

  // Escape fecha, como em qualquer folha que tape o que está por baixo.
  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  const folha = parado
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { y: "-100%" },
        animate: { y: 0 },
        exit: { y: "-100%" },
      };

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(true)}
        aria-label="Abrir menu"
        aria-expanded={aberto}
        className="-mr-1 flex h-10 w-10 items-center justify-center rounded-full text-marca transition-transform active:scale-[0.94] sm:hidden"
      >
        <List size={24} weight="bold" />
      </button>

      {aberto &&
        createPortal(
          <AnimatePresence>
            {aberto && (
              <motion.div
                key="folha"
                className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-sup-marca text-white sm:hidden"
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                {...folha}
                transition={
                  parado
                    ? { duration: 0.18 }
                    : {
                        type: "spring",
                        bounce: 0.16,
                        // A entrada apresenta-se, a saída obedece. Daí a diferença.
                        duration: 0.42,
                      }
                }
              >
                <div className="flex items-start justify-between px-5 pt-5">
                  <Lockup className="h-auto w-36 text-white" />
                  <button
                    type="button"
                    onClick={() => setAberto(false)}
                    aria-label="Fechar menu"
                    className="-mr-1 flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform active:scale-[0.94]"
                  >
                    <X size={24} weight="bold" />
                  </button>
                </div>

                <nav className="px-5 pt-10">
                  <ul>
                    {secoes.map((s, i) => (
                      <motion.li
                        key={s.href}
                        initial={parado ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: parado ? 0 : 0.08 + i * 0.05,
                          duration: 0.32,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                        className="border-b border-white/15"
                      >
                        <Link
                          href={s.href}
                          onClick={() => setAberto(false)}
                          className="block py-5"
                        >
                          <span className="font-display text-3xl font-semibold tracking-[-0.02em]">
                            {s.texto}
                          </span>
                          <span className="mt-1 block text-sm text-white/65">
                            {s.nota}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <motion.div
                  initial={parado ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: parado ? 0 : 0.24, duration: 0.3 }}
                  className="mt-auto px-5 pt-12 pb-10"
                >
                  <div className="[&_*]:!text-white/85 [&_strong]:!text-white">
                    <Estado />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={`tel:${site.telemovelE164}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-acento px-5 py-3.5 font-display font-semibold text-tinta transition-transform active:scale-[0.97]"
                    >
                      <Phone size={18} weight="fill" />
                      Reservar
                    </a>
                    <a
                      href={site.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="WhatsApp"
                      className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-white/30 transition-transform active:scale-[0.94]"
                    >
                      <WhatsappLogo size={20} weight="fill" />
                    </a>
                    <a
                      href={site.redes.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-white/30 transition-transform active:scale-[0.94]"
                    >
                      <InstagramLogo size={20} weight="fill" />
                    </a>
                  </div>

                  <p className="mt-6 text-sm leading-relaxed text-white/65">
                    {site.morada.rua}
                    <br />
                    {site.morada.codigoPostal} {site.morada.localidade}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
