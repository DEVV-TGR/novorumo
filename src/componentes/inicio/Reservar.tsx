import { Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { Faixa } from "../Faixa";
import { Revelar } from "../Revelar";
import { FormularioReserva } from "./FormularioReserva";
import { MAX_PESSOAS } from "@/lib/reservas";

/**
 * Reservar mesa, para almoçar ou para jantar.
 *
 * Só estas duas refeições se marcam. O pequeno-almoço das 9h às 12h serve-se a
 * quem aparece e nunca teve marcação; a esplanada ao fim da tarde, para um gin,
 * também não. Dizê-lo aqui poupa telefonemas à casa.
 *
 * Os contactos ficam fora do formulário, escritos no servidor: quem tiver o
 * JavaScript desligado, ou quem simplesmente prefira falar com alguém,
 * continua a ver o número e o WhatsApp.
 */
export function Reservar() {
  return (
    <section id="reservar" className="scroll-mt-20 bg-fundo-alt py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Revelar>
              <Faixa cor="marca">Reservas</Faixa>
              <h2 className="display-2 mt-6 max-w-[18ch] font-display font-semibold text-marca">
                Guarde a sua mesa, com o mar pela frente.
              </h2>
              <p className="mt-5 max-w-[42ch] leading-relaxed text-texto-suave">
                Marcamos mesa para o almoço e para o jantar. O pequeno-almoço, esse,
                serve-se a quem aparece — das 9h às 12h, sem marcação.
              </p>

              <ul className="mt-8 space-y-3 border-t border-linha pt-6 text-sm text-texto-suave">
                <li>
                  <strong className="font-semibold text-texto">Almoço</strong> das 12h às
                  15h, com a última mesa às 14h30.
                </li>
                <li>
                  <strong className="font-semibold text-texto">Jantar</strong> a partir das
                  19h, até a cozinha fechar.
                </li>
                <li>
                  Mesas até {MAX_PESSOAS} pessoas. Para grupos maiores, festas de anos e
                  almoços de trabalho, telefone-nos e combinamos.
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`tel:${site.telemovelE164}`}
                  className="inline-flex items-center gap-2 rounded-full border border-linha px-5 py-3 font-display text-sm font-semibold text-texto transition-colors hover:border-marca hover:text-marca active:scale-[0.98]"
                >
                  <Phone size={18} weight="fill" />
                  {site.telemovel}
                </a>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-linha px-5 py-3 font-display text-sm font-semibold text-texto transition-colors hover:border-marca hover:text-marca active:scale-[0.98]"
                >
                  <WhatsappLogo size={18} weight="fill" />
                  WhatsApp
                </a>
              </div>
            </Revelar>
          </div>

          <Revelar atraso={0.08}>
            <FormularioReserva />
          </Revelar>
        </div>
      </div>
    </section>
  );
}
