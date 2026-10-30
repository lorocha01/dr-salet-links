# Dr. Luís Fernando Salet — página de links

Página de links para a bio do Instagram (@dr.salet): agendar consulta, cirurgia facial, contorno corporal, sobre o médico, Instagram e endereço.

Projeto separado do site principal ([lorocha01/dr-luis-fernando-salet](https://github.com/lorocha01/dr-luis-fernando-salet)), com a mesma identidade visual, fotos e regras de rastreamento. Os cartões levam às páginas `/face`, `/corporal` e `/face#medico` do site principal.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/ (estático)
```

## Onde editar

| O quê | Arquivo |
|---|---|
| Destinos, textos e ícones | `src/pages/LinksPage.tsx` |
| Dados do médico, telefone, endereço, Instagram | `src/config/site.ts` |
| Endereço do site principal, WhatsApp, GA4, Meta Pixel | variáveis de ambiente (ver `.env.example`) |
| Título, descrição e imagem de compartilhamento | `index.html` |
| Cores, tipografia, layout | `src/styles/index.css` |
| Logotipo oficial (arte branca, fundo transparente) e símbolo recortado | `public/brand/` (favicons gerados a partir do símbolo) |

## Rastreamento

Cada clique dispara o evento neutro `link_click` com `link_destination` (`agendar_telefone`/`agendar_whatsapp`, `cirurgia_facial`, `contorno_corporal`, `conheca_dr_salet`, `instagram`, `localizacao`, `telefone`). GA4 e Meta Pixel só carregam após o consentimento (banner LGPD) e somente se `VITE_GA4_ID` / `VITE_META_PIXEL_ID` estiverem configurados.

## Pendências

- [ ] **WhatsApp da recepção** (`VITE_WHATSAPP_NUMBER`): hoje "Agendar uma consulta" liga para (51) 3024-7494. Preenchido, o botão abre o WhatsApp com mensagem pronta.
- [ ] **Aprovação do Dr. Salet** do texto de apresentação.
- [ ] **"Conheça o Dr. Salet"** abre `/face#medico`: o site principal precisa da correção de âncora (branch `feat/pagina-links`, `src/components/Chrome.tsx`) para rolar até a seção.
- [ ] Quando `drsalet.com.br` apontar para o site principal: atualizar `VITE_MAIN_SITE_URL` e, se a página de links ganhar domínio próprio, `index.html` (canonical/og).
