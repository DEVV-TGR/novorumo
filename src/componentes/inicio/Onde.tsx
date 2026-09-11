import { Phone, WhatsappLogo, NavigationArrow } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { Revelar } from "../Revelar";

/**
 * Onde fica a casa.
 *
 * A morada aparece com dois números diferentes espalhados pela internet, o que
 * é mau para quem procura e pior para o Google. A do site é a da carta.
 */
export function Onde() {
  const consulta = encodeURIComponent(`${site.nome}, ${site.morada.completa}`);

  return (
    <section id="onde" className="scroll-mt-20 py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
          <Revelar>
            <h2 className="display-2 max-w-[16ch] font-display font-semibold text-marca">
              À beira da marginal, em frente à praia.
            </h2>
            <address className="mt-6 not-italic leading-relaxed text-texto-suave">
              {site.morada.rua}
              <br />
              {site.morada.codigoPostal} {site.morada.localidade}, {site.morada.concelho}
            </address>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${consulta}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-sup-marca px-5 py-3 font-display text-sm font-semibold text-white transition-transform hover:brightness-110 active:scale-[0.98]"
              >
                <NavigationArrow size={18} weight="fill" />
                Como chegar
              </a>
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

          <Revelar atraso={0.08}>
            <div className="overflow-hidden rounded-[14px] border border-linha">
              <iframe
                title={`Mapa com a localização do ${site.nome}`}
                src={`https://maps.google.com/maps?q=${consulta}&z=16&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[22rem] w-full border-0 sm:h-[26rem]"
              />
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
