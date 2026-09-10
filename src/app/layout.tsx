import type { Metadata, Viewport } from "next";
import { Outfit, Figtree } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/*
  O logótipo do Novo Rumo é uma geométrica arredondada. A Outfit é a que mais
  se aproxima dele sem obrigar a comprar licença, e a Figtree acompanha-a no
  corpo sem competir. Nenhuma das duas é a Inter, que é o que toda a gente usa.
*/
const display = Outfit({
  subsets: ["latin"],
  variable: "--fonte-display",
  weight: ["500", "600", "700"],
});

const corpo = Figtree({
  subsets: ["latin"],
  variable: "--fonte-corpo",
});

const descricao =
  "Restaurante, bar e pizzaria na praia de Labruge desde 2010. Pequenos-almoços, francesinhas, pizzas e gins com o mar pela frente.";

export const metadata: Metadata = {
  metadataBase: new URL("https://novorumolabruge.pt"),
  title: {
    default: `${site.nome}, restaurante na praia de Labruge`,
    template: `%s · ${site.nome}`,
  },
  description: descricao,
  keywords: [
    "restaurante Labruge",
    "restaurante Vila do Conde",
    "pizzaria Labruge",
    "francesinha Vila do Conde",
    "esplanada praia Labruge",
  ],
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: site.nome,
    title: `${site.nome}, restaurante na praia de Labruge`,
    description: descricao,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7faf7" },
    { media: "(prefers-color-scheme: dark)", color: "#14122e" },
  ],
};

/*
  Dados estruturados do restaurante.

  A carta de hoje vive num PDF alojado no Google Drive, que nenhum motor de
  busca lê. Isto é metade da razão de existir do site: dizer ao Google onde
  fica a casa, a que horas abre e o que serve, em texto que ele entende.
*/
function dadosEstruturados() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.nome,
    description: descricao,
    url: "https://novorumolabruge.pt",
    telephone: site.telemovelE164,
    email: site.email,
    servesCuisine: ["Portuguesa", "Pizza"],
    priceRange: "€€",
    foundingDate: String(site.desde),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.morada.rua,
      postalCode: site.morada.codigoPostal,
      addressLocality: site.morada.localidade,
      addressRegion: site.morada.concelho,
      addressCountry: "PT",
    },
    sameAs: [site.redes.instagram, site.redes.facebook, site.redes.tiktok],
    hasMenu: "https://novorumolabruge.pt/carta",
    openingHoursSpecification: [
      { dias: ["Sunday", "Monday", "Tuesday"], abre: "09:00", fecha: "22:00" },
      { dias: ["Wednesday"], abre: "09:00", fecha: "15:00" },
      { dias: ["Friday", "Saturday"], abre: "09:00", fecha: "23:00" },
    ].map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dias,
      opens: h.abre,
      closes: h.fecha,
    })),
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${display.variable} ${corpo.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados()) }}
        />
        {children}
      </body>
    </html>
  );
}
