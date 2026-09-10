/**
 * Horários do Novo Rumo, com época baixa e época alta.
 *
 * A casa muda de horário em julho e agosto: abre todos os dias e fecha mais
 * tarde. O site tem de dizer a verdade nos dois casos, por isso o horário é
 * calculado a partir da data e nunca escrito à mão numa tabela estática.
 *
 * Domingo = 0, segunda = 1, ..., sábado = 6 (igual ao `Date.getDay()`).
 */

export type Intervalo = { abre: string; fecha: string };
export type DiaHorario = {
  /** `null` quando a casa está fechada nesse dia. */
  casa: Intervalo | null;
  cozinha: Intervalo | null;
};

export type Epoca = "baixa" | "alta";

/** Julho e agosto. Confirmar com a casa antes de cada verão. */
export function epocaDe(data: Date): Epoca {
  const mes = data.getMonth() + 1;
  return mes === 7 || mes === 8 ? "alta" : "baixa";
}

const FECHADO: DiaHorario = { casa: null, cozinha: null };

/** Horário de setembro a junho. */
const BAIXA: Record<number, DiaHorario> = {
  0: { casa: { abre: "09:00", fecha: "22:00" }, cozinha: { abre: "12:00", fecha: "21:30" } },
  1: { casa: { abre: "09:00", fecha: "22:00" }, cozinha: { abre: "12:00", fecha: "21:30" } },
  2: { casa: { abre: "09:00", fecha: "22:00" }, cozinha: { abre: "12:00", fecha: "21:30" } },
  3: { casa: { abre: "09:00", fecha: "15:00" }, cozinha: { abre: "12:00", fecha: "15:00" } },
  4: FECHADO,
  5: { casa: { abre: "09:00", fecha: "23:00" }, cozinha: { abre: "12:00", fecha: "21:30" } },
  6: { casa: { abre: "09:00", fecha: "23:00" }, cozinha: { abre: "12:00", fecha: "21:30" } },
};

/** Horário de julho e agosto: aberto todos os dias. */
const ALTA: Record<number, DiaHorario> = {
  0: { casa: { abre: "09:00", fecha: "23:00" }, cozinha: { abre: "12:00", fecha: "22:00" } },
  1: { casa: { abre: "09:00", fecha: "23:00" }, cozinha: { abre: "12:00", fecha: "22:00" } },
  2: { casa: { abre: "09:00", fecha: "23:00" }, cozinha: { abre: "12:00", fecha: "22:00" } },
  3: { casa: { abre: "09:00", fecha: "23:00" }, cozinha: { abre: "12:00", fecha: "22:00" } },
  4: { casa: { abre: "09:00", fecha: "23:00" }, cozinha: { abre: "12:00", fecha: "22:00" } },
  5: { casa: { abre: "09:00", fecha: "24:00" }, cozinha: { abre: "12:00", fecha: "22:00" } },
  6: { casa: { abre: "09:00", fecha: "24:00" }, cozinha: { abre: "12:00", fecha: "22:00" } },
};

export function horarioDoDia(data: Date): DiaHorario {
  const tabela = epocaDe(data) === "alta" ? ALTA : BAIXA;
  return tabela[data.getDay()] ?? FECHADO;
}

/** Serviços com janela própria dentro do horário da casa. */
export const servicos = {
  pequenoAlmoco: { abre: "09:00", fecha: "12:00" },
  /** Só na época alta, às quartas. */
  happyHour: { dia: 3, abre: "19:00", fecha: "21:30", epoca: "alta" as Epoca },
} as const;

function emMinutos(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export type Estado =
  | { aberto: true; cozinhaAberta: boolean; fecha: string }
  | { aberto: false; proximaAbertura: { dia: number; hora: string } | null };

/**
 * O estado da casa num instante. Recebe a data como argumento — nunca lê o
 * relógio sozinho — para o servidor e o cliente poderem chegar ao mesmo
 * resultado e para os testes serem possíveis.
 */
export function estadoEm(data: Date): Estado {
  const agora = data.getHours() * 60 + data.getMinutes();
  const hoje = horarioDoDia(data);

  if (hoje.casa) {
    const abre = emMinutos(hoje.casa.abre);
    const fecha = emMinutos(hoje.casa.fecha);
    if (agora >= abre && agora < fecha) {
      const cozinhaAberta = hoje.cozinha
        ? agora >= emMinutos(hoje.cozinha.abre) && agora < emMinutos(hoje.cozinha.fecha)
        : false;
      return { aberto: true, cozinhaAberta, fecha: hoje.casa.fecha };
    }
  }

  // Fechado: procurar a próxima abertura nos sete dias seguintes.
  for (let salto = 0; salto < 8; salto++) {
    const candidato = new Date(data);
    candidato.setDate(data.getDate() + salto);
    const dia = horarioDoDia(candidato);
    if (!dia.casa) continue;
    if (salto === 0 && agora >= emMinutos(dia.casa.abre)) continue;
    return { aberto: false, proximaAbertura: { dia: candidato.getDay(), hora: dia.casa.abre } };
  }

  return { aberto: false, proximaAbertura: null };
}

export const nomesDosDias = {
  pt: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
} as const;

/** Formata "09:00" como "9h" e "21:30" como "21h30", à portuguesa. */
export function hora(hhmm: string): string {
  const [h, m] = hhmm.split(":");
  return m === "00" ? `${Number(h)}h` : `${Number(h)}h${m}`;
}
