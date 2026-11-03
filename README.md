# Dr. Luís Fernando Salet — links e landing pages

Página de links para a bio do Instagram (@dr.salet) na raiz e as landing pages do site principal ([lorocha01/dr-luis-fernando-salet](https://github.com/lorocha01/dr-luis-fernando-salet)), com a mesma identidade visual, fotos e regras de rastreamento.

| Rota | Página |
|---|---|
| `/` | Links da bio: agendar pelo WhatsApp, cirurgia facial, contorno corporal, sobre o médico, Instagram e endereço |
| `/face` | Landing de cirurgia facial (Deep Plane e Deep Neck) |
| `/corporal` | Landing de contorno corporal |
| `/privacidade` | Política de privacidade |

As landing pages são cópia das do site principal (branch `main`). Mudanças nelas devem ser feitas nos dois repositórios.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/ (estático, multi-página)
```

## Onde editar

| O quê | Arquivo |
|---|---|
| Destinos, textos e ícones da página de links | `src/pages/LinksPage.tsx` |
| Textos das landing pages | `src/content/face.ts`, `src/content/corporal.ts` |
| Dados do médico, telefone, WhatsApp, endereço, Instagram | `src/config/site.ts` |
| GA4, Google Ads, Meta Pixel | variáveis de ambiente (ver `.env.example`) |
| Título, descrição e imagem de compartilhamento | `index.html`, `face/index.html`, `corporal/index.html` |
| Cores, tipografia, layout | `src/styles/index.css` |

## WhatsApp

Recepção: +55 51 9365-8237 (`555193658237`), padrão em `src/config/site.ts`; `VITE_WHATSAPP_NUMBER` sobrescreve. "Agendar uma consulta", o botão do formulário, o botão flutuante e a barra fixa no celular abrem o WhatsApp com mensagem pronta.

## Rastreamento

Na página de links, cada clique dispara `link_click` com `link_destination`. Nas landing pages, cliques no WhatsApp e envios do formulário disparam as conversões `CONV-WHATSAPP-*` e `CONV-FORM-*`. GA4, Google Ads e Meta Pixel só carregam após o consentimento (banner LGPD) e somente se os IDs estiverem configurados.

## Pendências

- [ ] **Aprovação do Dr. Salet** do texto de apresentação.
- [ ] Demais pendências das landing pages: `docs/PENDENCIAS.md`.
