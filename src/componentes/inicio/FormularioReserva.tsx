"use client";

import { useEffect, useState } from "react";
import { WhatsappLogo, Phone, Check, Copy } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { hora } from "@/lib/horarios";
import {
  DIAS_A_FRENTE,
  MAX_PESSOAS,
  dataDe,
  dataPorExtenso,
  horasDe,
  isoDe,
  lugares,
  mensagem,
  servicos,
  servicosDe,
  somaDias,
  validar,
  type Erros,
  type Lugar,
  type Pedido,
  type Servico,
} from "@/lib/reservas";

/**
 * O formulário de reserva.
 *
 * Nunca oferece uma hora a que a cozinha esteja fechada: os botões das horas
 * saem de `reservas.ts`, que por sua vez lê o horário da casa. Escolher a
 * quinta-feira não dá um erro depois de submeter, dá um aviso ali mesmo.
 *
 * O relógio só é lido depois de montar, pela mesma razão que em `Estado.tsx`:
 * o servidor pode estar noutro fuso e a página pode ter sido gerada há horas.
 * Até lá mostra-se a moldura do formulário, sem datas nem horas inventadas.
 *
 * O pedido sai daqui por WhatsApp, com o texto já escrito, e a casa confirma.
 * Não há aqui nenhuma agenda: a mesa só está marcada quando alguém responder,
 * e o ecrã de fim diz isso por palavras.
 */
export function FormularioReserva() {
  const [agora, setAgora] = useState<Date | null>(null);
  const [iso, setIso] = useState("");
  // O que foi escolhido, que não é forçosamente o que está disponível: mudar de
  // dia pode tirar do ar a refeição ou a hora que já estavam marcadas. O valor
  // que vale é o derivado, mais abaixo.
  const [servicoPedido, setServicoPedido] = useState<Servico>("almoco");
  const [horasPedidas, setHorasPedidas] = useState("");
  const [pessoas, setPessoas] = useState(2);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [lugar, setLugar] = useState<Lugar>("indiferente");
  const [observacoes, setObservacoes] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [enviado, setEnviado] = useState<Pedido | null>(null);

  /*
    O relógio é o sistema externo com que este formulário sincroniza, e só
    existe depois de montar. Daí o efeito — e o primeiro dia com mesa já fica
    escolhido, para quem chega com pressa só ter de escrever o nome e o número.
  */
  useEffect(() => {
    const arrancar = () => {
      const relogio = new Date();
      setAgora(relogio);
      for (let salto = 0; salto <= DIAS_A_FRENTE; salto++) {
        const dia = somaDias(relogio, salto);
        const abertos = servicosDe(dia, relogio);
        if (abertos.length > 0) {
          setIso(isoDe(dia));
          setServicoPedido(abertos[0]);
          return;
        }
      }
    };
    arrancar();
  }, []);

  /*
    Daqui para baixo é tudo calculado no render, e não guardado.

    A alternativa era ir corrigindo o estado em efeitos sempre que o dia muda,
    o que dá renders em cascata e, no meio deles, um instante em que o ecrã
    mostra uma hora que já não existe. Assim a escolha inválida nunca chega a
    ser mostrada: é substituída pela primeira que exista.
  */
  const dia = iso ? dataDe(iso) : null;
  const abertos = dia && agora ? servicosDe(dia, agora) : [];
  const servico = abertos.includes(servicoPedido) ? servicoPedido : (abertos[0] ?? servicoPedido);
  const disponiveis = dia && agora ? horasDe(dia, servico, agora) : [];
  const horas = disponiveis.includes(horasPedidas) ? horasPedidas : (disponiveis[0] ?? "");

  function submeter(evento: React.FormEvent) {
    evento.preventDefault();
    if (!agora) return;

    const encontrados = validar({ nome, telefone, iso, servico, horas, pessoas }, agora);
    setErros(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    const pedido: Pedido = {
      nome,
      telefone,
      data: dataDe(iso),
      servico,
      horas,
      pessoas,
      lugar,
      observacoes,
    };
    setEnviado(pedido);

    // Aberto dentro do gesto de submissão, que é a única altura em que os
    // browsers deixam. Se ainda assim for bloqueado, o ecrã de fim tem o
    // mesmo link à mão.
    window.open(ligacaoWhatsapp(pedido), "_blank", "noopener,noreferrer");
  }

  if (enviado) {
    return <Confirmacao pedido={enviado} aoVoltar={() => setEnviado(null)} />;
  }

  const fechado = agora !== null && iso !== "" && abertos.length === 0;

  return (
    <form onSubmit={submeter} noValidate className="rounded-card bg-cartao p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Campo etiqueta="Dia" para="dia" erro={erros.data}>
          <input
            id="dia"
            type="date"
            value={iso}
            min={agora ? isoDe(agora) : undefined}
            max={agora ? isoDe(somaDias(agora, DIAS_A_FRENTE)) : undefined}
            onChange={(e) => setIso(e.target.value)}
            aria-invalid={erros.data ? true : undefined}
            className={entrada}
          />
        </Campo>

        <Campo etiqueta="Pessoas" para="pessoas" erro={erros.pessoas}>
          <select
            id="pessoas"
            value={pessoas}
            onChange={(e) => setPessoas(Number(e.target.value))}
            className={entrada}
          >
            {Array.from({ length: MAX_PESSOAS }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n === 1 ? "1 pessoa" : `${n} pessoas`}
              </option>
            ))}
          </select>
        </Campo>
      </div>

      {fechado ? (
        <p
          role="status"
          className="mt-5 rounded-campo border border-acento/40 bg-acento/10 px-4 py-3 text-sm text-texto"
        >
          Nesse dia estamos encerrados. Escolha outro, ou veja os{" "}
          <a href="#horarios" className="font-semibold underline underline-offset-2">
            horários
          </a>
          .
        </p>
      ) : (
        <>
          <fieldset className="mt-6">
            <legend className={rotulo}>Refeição</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {servicos.map((s) => (
                <Pilula
                  key={s.id}
                  nome="servico"
                  valor={s.id}
                  etiqueta={s.nome}
                  escolhido={servico === s.id}
                  desativado={agora !== null && !abertos.includes(s.id)}
                  ao={() => setServicoPedido(s.id)}
                >
                  {s.nome}
                </Pilula>
              ))}
            </div>
            {agora !== null && abertos.length === 1 && (
              <p className="mt-2 text-sm text-texto-suave">
                Nesse dia servimos {abertos[0] === "almoco" ? "só almoços" : "só jantares"}.
              </p>
            )}
          </fieldset>

          <fieldset className="mt-6">
            <legend className={rotulo}>Hora</legend>
            {agora === null ? (
              <p className="mt-2 text-sm text-texto-suave">A carregar as horas livres…</p>
            ) : disponiveis.length === 0 ? (
              <p className="mt-2 text-sm text-texto-suave">
                Já não há horas para hoje. Escolha outro dia ou ligue-nos.
              </p>
            ) : (
              <div className="mt-2 flex flex-wrap gap-2">
                {disponiveis.map((h) => (
                  <Pilula
                    key={h}
                    nome="horas"
                    valor={h}
                    etiqueta={hora(h)}
                    escolhido={horas === h}
                    ao={() => setHorasPedidas(h)}
                  >
                    <span className="tabular">{hora(h)}</span>
                  </Pilula>
                ))}
              </div>
            )}
            {erros.horas && <Erro>{erros.horas}</Erro>}
          </fieldset>
        </>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Campo etiqueta="Nome" para="nome" erro={erros.nome}>
          <input
            id="nome"
            type="text"
            value={nome}
            autoComplete="name"
            placeholder="Em que nome fica"
            onChange={(e) => setNome(e.target.value)}
            aria-invalid={erros.nome ? true : undefined}
            className={entrada}
          />
        </Campo>

        <Campo etiqueta="Telemóvel" para="telefone" erro={erros.telefone}>
          <input
            id="telefone"
            type="tel"
            inputMode="tel"
            value={telefone}
            autoComplete="tel"
            placeholder="9xx xxx xxx"
            onChange={(e) => setTelefone(e.target.value)}
            aria-invalid={erros.telefone ? true : undefined}
            className={entrada}
          />
        </Campo>
      </div>

      <fieldset className="mt-6">
        <legend className={rotulo}>Mesa</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {lugares.map((l) => (
            <Pilula
              key={l.id}
              nome="lugar"
              valor={l.id}
              etiqueta={l.nome}
              escolhido={lugar === l.id}
              ao={() => setLugar(l.id)}
            >
              {l.nome}
            </Pilula>
          ))}
        </div>
        <p className="mt-2 text-sm text-texto-suave">
          A esplanada fica pela chuva e pelo vento, e nesses dias mudamos a mesa para dentro.
        </p>
      </fieldset>

      <Campo etiqueta="Alguma coisa que devamos saber" para="observacoes" className="mt-6">
        <textarea
          id="observacoes"
          rows={3}
          value={observacoes}
          placeholder="Alergias, cadeira de bebé, aniversário, um cão à espera lá fora."
          onChange={(e) => setObservacoes(e.target.value)}
          className={`${entrada} resize-y`}
        />
      </Campo>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-sup-marca px-6 py-3.5 font-display text-sm font-semibold text-white transition-transform hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
          disabled={agora === null}
        >
          <WhatsappLogo size={18} weight="fill" />
          Enviar pedido por WhatsApp
        </button>
        <a
          href={`tel:${site.telemovelE164}`}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-linha px-6 py-3.5 font-display text-sm font-semibold text-texto transition-colors hover:border-marca hover:text-marca active:scale-[0.98]"
        >
          <Phone size={18} weight="fill" />
          Prefiro ligar
        </a>
      </div>

      <p className="mt-4 text-sm text-texto-suave">
        A mesa fica marcada quando respondermos. Se for para hoje e estiver em cima da
        hora, o telefone é mais rápido.
      </p>
    </form>
  );
}

function ligacaoWhatsapp(pedido: Pedido): string {
  return `${site.whatsapp}?text=${encodeURIComponent(mensagem(pedido, site.nome))}`;
}

/** O ecrã de fim: o que foi pedido, escrito por extenso, e por onde seguiu. */
function Confirmacao({ pedido, aoVoltar }: { pedido: Pedido; aoVoltar: () => void }) {
  const [copiado, setCopiado] = useState(false);
  const texto = mensagem(pedido, site.nome);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      // Sem permissão para a área de transferência o texto continua no ecrã,
      // que é o que interessa. Não vale a pena assustar ninguém com um erro.
      setCopiado(false);
    }
  }

  const refeicao = pedido.servico === "almoco" ? "almoço" : "jantar";

  return (
    <div className="rounded-card bg-cartao p-6 sm:p-8">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sup-viva text-tinta">
        <Check size={22} weight="bold" />
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold text-marca">
        Está escrito e a caminho.
      </h3>
      <p className="mt-2 max-w-[52ch] leading-relaxed text-texto-suave">
        Abrimos o WhatsApp com o pedido já redigido — falta só carregar em enviar. A
        reserva fica confirmada quando respondermos.
      </p>

      <dl className="mt-6 space-y-2.5 border-t border-linha pt-5 text-sm">
        <Linha termo="Nome" valor={pedido.nome.trim()} />
        <Linha termo="Dia" valor={dataPorExtenso(pedido.data)} />
        <Linha termo="Hora" valor={`${refeicao}, às ${hora(pedido.horas)}`} />
        <Linha
          termo="Pessoas"
          valor={pedido.pessoas === 1 ? "1 pessoa" : `${pedido.pessoas} pessoas`}
        />
        {pedido.lugar !== "indiferente" && (
          <Linha termo="Mesa" valor={pedido.lugar === "esplanada" ? "Esplanada" : "Interior"} />
        )}
      </dl>

      <div className="mt-7 flex flex-wrap gap-3">
        <a
          href={ligacaoWhatsapp(pedido)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-sup-marca px-5 py-3 font-display text-sm font-semibold text-white transition-transform hover:brightness-110 active:scale-[0.98]"
        >
          <WhatsappLogo size={18} weight="fill" />
          Abrir de novo
        </a>
        <button
          type="button"
          onClick={copiar}
          className="inline-flex items-center gap-2 rounded-full border border-linha px-5 py-3 font-display text-sm font-semibold text-texto transition-colors hover:border-marca hover:text-marca active:scale-[0.98]"
        >
          {copiado ? <Check size={18} weight="bold" /> : <Copy size={18} weight="fill" />}
          {copiado ? "Copiado" : "Copiar o pedido"}
        </button>
        <a
          href={`tel:${site.telemovelE164}`}
          className="inline-flex items-center gap-2 rounded-full border border-linha px-5 py-3 font-display text-sm font-semibold text-texto transition-colors hover:border-marca hover:text-marca active:scale-[0.98]"
        >
          <Phone size={18} weight="fill" />
          {site.telemovel}
        </a>
      </div>

      <button
        type="button"
        onClick={aoVoltar}
        className="mt-6 text-sm text-texto-suave underline underline-offset-4 hover:text-marca"
      >
        Fazer outra reserva
      </button>
    </div>
  );
}

function Linha({ termo, valor }: { termo: string; valor: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-texto-suave">{termo}</dt>
      <dd className="text-right font-semibold text-texto">{valor}</dd>
    </div>
  );
}

const rotulo = "font-display text-sm font-semibold text-texto";

const entrada =
  "w-full rounded-campo border border-linha bg-fundo px-4 py-3 text-base text-texto outline-none transition-colors placeholder:text-texto-suave focus-visible:border-marca-viva focus-visible:ring-2 focus-visible:ring-marca-viva/40 aria-[invalid]:border-acento";

function Campo({
  etiqueta,
  para,
  erro,
  className = "",
  children,
}: {
  etiqueta: string;
  para: string;
  erro?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={para} className={`${rotulo} mb-2 block`}>
        {etiqueta}
      </label>
      {children}
      {erro && <Erro>{erro}</Erro>}
    </div>
  );
}

function Erro({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-2 text-sm font-semibold text-acento">
      {children}
    </p>
  );
}

/**
 * Um botão de escolha que por baixo é um `<input type="radio">`.
 *
 * Parece um botão mas continua a ser um grupo de rádios: navega-se com as
 * setas, anuncia-se ao leitor de ecrã e funciona sem rato.
 */
function Pilula({
  nome,
  valor,
  etiqueta,
  escolhido,
  desativado = false,
  ao,
  children,
}: {
  nome: string;
  valor: string;
  /** O que se lê em voz alta. Sem isto, um leitor de ecrã diz "almoco" e "12:00". */
  etiqueta: string;
  escolhido: boolean;
  desativado?: boolean;
  ao: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className={desativado ? "cursor-not-allowed" : "cursor-pointer"}>
      <input
        type="radio"
        name={nome}
        value={valor}
        aria-label={etiqueta}
        checked={escolhido}
        disabled={desativado}
        onChange={ao}
        className="peer sr-only"
      />
      <span
        className={`block rounded-full border px-4 py-2.5 font-display text-sm font-semibold transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-marca-viva/50 ${
          escolhido
            ? "border-transparent bg-sup-marca text-white"
            : desativado
              ? "border-linha text-texto-suave opacity-50"
              : "border-linha text-texto hover:border-marca hover:text-marca"
        }`}
      >
        {children}
      </span>
    </label>
  );
}
