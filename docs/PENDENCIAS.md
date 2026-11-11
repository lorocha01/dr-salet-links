# Pendências antes da publicação

Nada abaixo foi inventado no site: cada item está oculto, como placeholder ou com uma alternativa segura até ser confirmado.

## Bloqueiam a publicação
- [ ] **Aprovação do Dr. Salet de todos os textos** (`src/content/face.ts`, `src/content/corporal.ts`): descrições técnicas, FAQ, jornada.
- [x] **WhatsApp da recepção**: +55 51 9365-8237, padrão em `src/config/site.ts` (`VITE_WHATSAPP_NUMBER` sobrescreve). Botão flutuante nas duas landing pages; formulário e barra fixa do celular também abrem o WhatsApp.
- [ ] Testar um envio real pelo botão e pelo formulário (o número tem 8 dígitos após o DDD; confirmar que abre a conta certa sem o 9 na frente).
- [ ] **Revisão jurídica da política de privacidade** (`src/pages/PrivacyPage.tsx`): controlador, e-mail do encarregado (DPO).
- [ ] **Reconfirmar dados do briefing**: 30 anos de formado, 20+ anos de cirurgia plástica, grafia dos hospitais ("Moinhos" e "Blanc"), endereço Rua Mariante, 180.
- [ ] **Logotipo oficial** (SVG/PNG) para substituir o monograma aproximado.

## Seções ocultas até confirmação
- [ ] Depoimentos (face e corporal) — somente com autorização por escrito e revisão de conformidade. Preencher `testimonials`.
- [ ] Tecnologias de apoio (corporal) — aparelhos e registros Anvisa. O bio do Instagram cita "ArgoPlasma"; não publicado. Preencher `technologies` e `enabled: true`.
- [ ] Formação, sociedades médicas, ensino e publicações (`doctor` em `src/config/site.ts`). O bio do Instagram cita SBCP, ISAPS e ASPS, mas o briefing marca sociedades como "a confirmar".
- [ ] Nome oficial da clínica (`clinic.name`).

## Página de links (/links)
- [x] **Agendar uma consulta**: abre o WhatsApp da recepção (com mensagem pronta); o telefone (51) 3024-7494 fica em "Localização e contato".
- [ ] Aprovar o texto de apresentação (derivado da descrição já usada no site).
- [ ] Depois de publicar, colocar `https://<domínio>/links?utm_source=instagram&utm_medium=bio` na bio do Instagram.

## Rastreamento
- [x] **Google Tag Manager `GTM-PMPXZPB2`** no `<head>` de `/face` e `/corporal`, com Consent Mode: cookies negados até o aceite no banner. Ao aceitar, o site envia `consent update` e o evento `consent_update` ao dataLayer. Configurar as tags dentro do GTM respeitando o consentimento (tags do Google já respeitam; Meta Pixel e outras precisam de acionador `consent_update` ou de "Configurações de consentimento").
- [ ] Os eventos de conversão (`CONV-*`) já vão para o dataLayer: criar no GTM os acionadores "Evento personalizado" com esses nomes.

### Via variáveis de ambiente (preparado, inativo)
- [ ] GA4: `VITE_GA4_ID`
- [ ] Google Ads: `VITE_GADS_ID` + um rótulo por conversão (`VITE_GADS_LABEL_*`)
- [ ] Meta Pixel: `VITE_META_PIXEL_ID`
- [ ] API de Conversões da Meta: requer backend (função serverless) com o token guardado no servidor. O front já envia `eventID` para deduplicação.

Eventos: `CONV-WHATSAPP-FACE`, `CONV-FORM-FACE`, `CONV-WHATSAPP-CORPORAL`, `CONV-FORM-CORPORAL` (no GA4 com sublinhado: `conv_form_face` etc., porque o GA4 não aceita hífen). Só disparam após o consentimento e nunca levam nome, telefone, cidade ou procedimento.

Página de links: evento neutro `link_click` com `link_destination` (`agendar_telefone` ou `agendar_whatsapp`, `cirurgia_facial`, `contorno_corporal`, `conheca_dr_salet`, `instagram`, `localizacao`, `telefone`). Não é conversão e não duplica as conversões das landing pages; segue o mesmo consentimento.

## Mídia
- [ ] Originais em alta das fotos do consultório (as atuais vieram pelo WhatsApp, 1280 px).
- [ ] Assistir e aprovar os vídeos candidatos (ver `INVENTARIO-MIDIA.md`) e entregar versões comprimidas.
- [ ] Fotos do ambiente da clínica/equipe (não encontradas na pasta FOTOS).
