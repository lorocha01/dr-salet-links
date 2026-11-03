import { useEffect } from 'react';
import { clinic, doctor } from '../config/site';
import { Logo } from '../components/primitives';

// MODELO — deve ser revisado por assessoria jurídica antes da publicação (LGPD, dados sensíveis de saúde).
export function PrivacyPage() {
  useEffect(() => { document.documentElement.classList.add('is-ready'); }, []);
  return (
    <main className="legal tone-paper">
      <a href="/" className="legal__brand" aria-label="Início"><Logo height={48} /></a>
      <article className="legal__body">
        <p className="label">Atualizado em outubro de 2026 · versão para revisão jurídica</p>
        <h1>Política de privacidade</h1>
        <p>Esta política explica como as páginas do {doctor.name} ({doctor.crm}) tratam informações de visitantes.</p>

        <h2>Formulário de agendamento</h2>
        <p>Os dados digitados no formulário (nome, WhatsApp, cidade, procedimento de interesse, momento e horário de contato) não são armazenados neste site. Eles são usados apenas para montar uma mensagem que é aberta no seu aplicativo de WhatsApp; o envio acontece somente se você decidir enviá-la à recepção.</p>

        <h2>Cookies e medição</h2>
        <p>Cookies essenciais garantem o funcionamento do site e guardam suas preferências de privacidade. Com o seu consentimento, podemos usar ferramentas de medição de audiência (Google Analytics) e de publicidade (Google Ads e Meta) para entender quais canais trazem visitantes.</p>
        <p>Essas ferramentas recebem somente informações de navegação e de origem do acesso (por exemplo, parâmetros de campanha). Não enviamos nome, telefone, cidade, procedimento de interesse ou qualquer dado de saúde às plataformas de anúncios.</p>
        <p>Você pode alterar sua escolha a qualquer momento em “Preferências de cookies”, no rodapé das páginas.</p>

        <h2>Seus direitos</h2>
        <p>Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode solicitar informações, correção ou exclusão de dados pessoais tratados pelo consultório.</p>

        <h2>Contato</h2>
        <p>{clinic.address.street}, {clinic.address.district}, {clinic.address.city}/{clinic.address.state}. Telefone {clinic.phoneDisplay}.</p>
        <p className="legal__pending">[Pendente: nome do controlador, e-mail do encarregado (DPO) e revisão jurídica.]</p>

        <p><a href="/face">Cirurgia facial</a> · <a href="/corporal">Contorno corporal</a></p>
      </article>
    </main>
  );
}
