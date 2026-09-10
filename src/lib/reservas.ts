/**
 * Reservas de mesa, para almoçar ou jantar.
 *
 * Só se reserva mesa para as duas refeições: o pequeno-almoço das 9h às 12h
 * serve-se a quem chega e não se marca, e o bar fora das horas de cozinha
 * também não. Por isso este módulo não conhece mais nenhum serviço.
 *
 * As horas oferecidas não estão escritas em lado nenhum à mão: saem sempre do
 * horário da cozinha em `horarios.ts`, cruzado com a janela da refeição. Se a
 * casa mudar de horário, muda-se num sítio só e o formulário acompanha. É por
 * isso que à quarta-feira não aparece jantar e à quinta não aparece nada, sem
 * que isso esteja escrito aqui.
 *
 * Como em `horarios.ts`, nenhuma função lê o relógio sozinha: a data entra
 * sempre por argumento, para o resultado ser testável e não ficar preso ao
 * instante em que a página foi gerada.
 */

import { horarioDoDia, hora, type Intervalo } from "./horarios";

export type Servico = "almoco" | "jantar";

export const servicos: { id: Servico; nome: string }[] = [
  { id: "almoco", nome: "Almoço" },
  { id: "jantar", nome: "Jantar" },
];

/**
 * A janela de cada refeição, antes de ser cortada pelo horário da cozinha.
 *
 * O jantar começa às 19h porque é a essa hora que a casa enche, ainda que a
 * cozinha não feche entre as duas refeições. Quem quiser mesa às 17h liga.
 */
const JANELAS: Record<Servico, Intervalo> = {
  almoco: { abre: "12:00", fecha: "15:00" },
  jantar: { abre: "19:00", fecha: "23:00" },
};

/** De meia em meia hora. */
const PASSO = 30;

/** A última mesa entra meia hora antes de a cozinha fechar, não à hora de fechar. */
const ULTIMA_ENTRADA = 30;

/** Reservas para o próprio dia só a partir de uma hora a contar de agora. */
const ANTECEDENCIA = 60;

/** Até três meses à frente. Mais longe do que isso é conversa para ter ao telefone. */
export const DIAS_A_FRENTE = 90;

/** Acima disto é grupo, e grupos combinam-se com a casa, não por formulário. */
export const MAX_PESSOAS = 12;

function emMinutos(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function paraHhmm(minutos: number): string {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/**
 * A janela real de um serviço num dia: a da refeição cortada pela da cozinha.
 * `null` quando a cozinha não chega a abrir dentro dela.
 */
export function janelaDe(data: Date, servico: Servico): Intervalo | null {
  const { cozinha } = horarioDoDia(data);
  if (!cozinha) return null;

  const janela = JANELAS[servico];
  const abre = Math.max(emMinutos(cozinha.abre), emMinutos(janela.abre));
  const fecha = Math.min(emMinutos(cozinha.fecha), emMinutos(janela.fecha));

  if (fecha - ULTIMA_ENTRADA < abre) return null;
  return { abre: paraHhmm(abre), fecha: paraHhmm(fecha) };
}

/**
 * As horas que se podem escolher.
 *
 * `agora` só corta alguma coisa quando a reserva é para o próprio dia.
 */
export function horasDe(data: Date, servico: Servico, agora: Date): string[] {
  const janela = janelaDe(data, servico);
  if (!janela) return [];

  const ultima = emMinutos(janela.fecha) - ULTIMA_ENTRADA;
  const minimo = mesmoDia(data, agora)
    ? agora.getHours() * 60 + agora.getMinutes() + ANTECEDENCIA
    : 0;

  const horas: string[] = [];
  for (let m = emMinutos(janela.abre); m <= ultima; m += PASSO) {
    if (m >= minimo) horas.push(paraHhmm(m));
  }
  return horas;
}

/** Os serviços com mesa disponível nesse dia. Vazio quando a casa está fechada. */
export function servicosDe(data: Date, agora: Date): Servico[] {
  return servicos.map((s) => s.id).filter((id) => horasDe(data, id, agora).length > 0);
}

export function mesmoDia(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * "2026-09-12" para uma data local.
 *
 * `new Date("2026-09-12")` lê a cadeia como UTC e, a oeste de Greenwich, dá o
 * dia anterior. Portugal está a oeste de Greenwich o ano inteiro.
 */
export function dataDe(iso: string): Date {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}

/** O contrário: uma data local para o `value` de um `<input type="date">`. */
export function isoDe(data: Date): string {
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${data.getFullYear()}-${mes}-${dia}`;
}

export function somaDias(data: Date, dias: number): Date {
  const d = new Date(data);
  d.setDate(d.getDate() + dias);
  return d;
}

const porExtenso = new Intl.DateTimeFormat("pt-PT", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

/** "sábado, 12 de setembro" — como se diz ao telefone. */
export function dataPorExtenso(data: Date): string {
  return porExtenso.format(data);
}

export type Lugar = "indiferente" | "esplanada" | "interior";

export const lugares: { id: Lugar; nome: string }[] = [
  { id: "indiferente", nome: "Indiferente" },
  { id: "esplanada", nome: "Esplanada" },
  { id: "interior", nome: "Interior" },
];

export type Pedido = {
  nome: string;
  telefone: string;
  data: Date;
  servico: Servico;
  horas: string;
  pessoas: number;
  lugar: Lugar;
  observacoes: string;
};

/**
 * O pedido em texto corrido.
 *
 * É isto que segue por WhatsApp e é isto que fica no ecrã depois de enviar,
 * para se poder copiar e mandar por outro lado. Tem de ler-se bem sozinho, sem
 * o site à volta.
 */
export function mensagem(p: Pedido, nomeDaCasa: string): string {
  const refeicao = servicos.find((s) => s.id === p.servico)!.nome.toLowerCase();
  const linhas = [
    `Olá! Queria reservar mesa no ${nomeDaCasa}.`,
    "",
    `Nome: ${p.nome.trim()}`,
    `Dia: ${dataPorExtenso(p.data)}`,
    `Serviço: ${refeicao}, às ${hora(p.horas)}`,
    `Pessoas: ${p.pessoas}`,
    `Contacto: ${p.telefone.trim()}`,
  ];
  if (p.lugar !== "indiferente") {
    linhas.push(`Preferência: ${p.lugar === "esplanada" ? "esplanada" : "interior"}`);
  }
  if (p.observacoes.trim()) {
    linhas.push(`Notas: ${p.observacoes.trim()}`);
  }
  return linhas.join("\n");
}

export type Campo = "nome" | "telefone" | "data" | "horas" | "pessoas";
export type Erros = Partial<Record<Campo, string>>;

/**
 * Valida o que o browser não valida sozinho.
 *
 * O `required` do HTML apanha o campo vazio; o que não apanha é uma reserva
 * para um dia em que a casa está fechada, para uma hora que já passou ou para
 * mais gente do que cabe numa mesa.
 */
export function validar(
  p: {
    nome: string;
    telefone: string;
    iso: string;
    servico: Servico;
    horas: string;
    pessoas: number;
  },
  agora: Date,
): Erros {
  const erros: Erros = {};

  if (p.nome.trim().length < 2) {
    erros.nome = "Indique o nome em que fica a reserva.";
  }

  // Nove dígitos em Portugal, mas há quem reserve de fora com indicativo. O
  // que interessa é haver número suficiente para a casa poder ligar de volta.
  if (p.telefone.replace(/\D/g, "").length < 9) {
    erros.telefone = "Deixe um número onde possamos confirmar.";
  }

  if (!p.iso) {
    erros.data = "Escolha o dia.";
  } else {
    const data = dataDe(p.iso);
    const hojeZero = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
    if (data < hojeZero) {
      erros.data = "Esse dia já passou.";
    } else if (data > somaDias(hojeZero, DIAS_A_FRENTE)) {
      erros.data = "Para tão longe, é melhor telefonar.";
    } else if (servicosDe(data, agora).length === 0) {
      erros.data = "Nesse dia estamos encerrados.";
    } else if (!horasDe(data, p.servico, agora).includes(p.horas)) {
      erros.horas = "Escolha uma hora disponível.";
    }
  }

  if (!Number.isInteger(p.pessoas) || p.pessoas < 1) {
    erros.pessoas = "Diga quantas pessoas são.";
  } else if (p.pessoas > MAX_PESSOAS) {
    erros.pessoas = `Para mais de ${MAX_PESSOAS} pessoas, combinamos por telefone.`;
  }

  return erros;
}
