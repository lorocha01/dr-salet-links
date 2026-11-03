# Inventário de mídia — Drive "DR SALET"

Fonte: https://drive.google.com/drive/folders/1jmX0U4fjp0EmiUzjrOSSnUs26stw6zRq (pasta pública, consultada em 28/10/2026).

## Fotografias usadas (pasta `FOTOS/CONSULTORIO`)

As 7 fotos são retratos profissionais feitos no consultório (estante de madeira com iluminação quente, esculturas, livros, certificado). Todas chegaram **compactadas pelo WhatsApp (máx. 1280 px)** — servem para a web, mas o ideal é receber os originais da sessão de fotos para o hero em telas grandes.

| Arquivo no Drive | Resolução | Orientação | O que mostra | Uso | Por quê |
|---|---|---|---|---|---|
| WhatsApp Image 2026-04-06 at 10.23.48.jpeg | 855×1280 | Vertical | Close de terno azul-marinho, sorriso, fundo quente com luz âmbar | **Hero /face** | Retrato vertical centrado no rosto — combina com o tema facial e com a coluna direita do hero |
| WhatsApp Image 2026-04-06 at 10.23.48 (2).jpeg | 1280×855 | Horizontal | Três quartos, linha da mandíbula e pescoço visíveis | **Deep Neck (/face)** | Mostra o perfil e a transição face–pescoço, assunto da seção |
| WhatsApp Image 2026-04-06 at 10.23.48 (3).jpeg | 1280×855 | Horizontal | Expressão séria, contemplativa | **Cirurgia masculina (/face)** | Tom sóbrio, sem estereótipo |
| WhatsApp Image 2026-04-06 at 10.23.48 (1).jpeg | 1280×925 | Horizontal | Braços cruzados, certificado ao fundo | **Conheça o médico (/face)** | Postura de autoridade, contexto profissional |
| WhatsApp Image 2026-04-06 at 10.23.49 (2).jpeg | 928×1280 | Vertical | Jaleco branco, braços cruzados, luz mais fria | **Hero /corporal** | Diferencia visualmente da página facial; contexto clínico |
| WhatsApp Image 2026-04-06 at 10.23.49 (1).jpeg | 855×1280 | Vertical | Corpo inteiro até a cintura, mãos à frente | **Conheça o médico (/corporal)** | Retrato vertical para a composição invertida da página |
| WhatsApp Image 2026-04-06 at 10.23.49.jpeg | 1280×855 | Horizontal | Enquadramento frontal, sorriso | **Outras cidades (/corporal)** | Enquadramento de "videochamada" |

Nenhuma foto se repete entre seções. Processamento: só recorte, redimensionamento e compressão (AVIF/WebP/JPEG) — nenhum filtro. Os arquivos originais ficam em `media-source/consultorio/`; `npm run media` regenera tudo a partir de `scripts/media-manifest.json`.

## Vídeos (não incorporados nesta versão)

Os vídeos do Drive são arquivos brutos de 37 MB a 613 MB e **não foram baixados nem assistidos**. A classificação abaixo vem só do nome dos arquivos e precisa ser confirmada.

| Pasta / arquivo | Tamanho | Possível uso | Observação |
|---|---|---|---|
| VIDEOS JÁ POSTADOS/VIDEO_CONSULTORIO_v01.mp4 | 376,7 MB | Hero /face (loop silencioso) | Reeditar para 8–12 s, sem áudio, < 4 MB |
| VIDEOS JÁ POSTADOS/VIDEO FULL FACE.mp4 | 36,7 MB | Seção Deep Plane | Assistir: confirmar que não mostra cirurgia nem antes/depois |
| VIDEOS JÁ POSTADOS/MUITAS_PESSOAS_ME_PERGUNTAM_v05.mp4 | 108,8 MB | FAQ / educativo | Avaliar conteúdo |
| VIDEOS JÁ POSTADOS/VOCE ESTA PREPARADO PARA FAZER UMA CIRURGIA.mp4 | 404,7 MB | Jornada do paciente | Avaliar conteúdo |
| VIDEOS JÁ POSTADOS/VIDEO LIPO-FACE.mp4, VIDEO DUO FACE.mp4, REELS VIDEOENDOSCOPIA - FULL FACE.mp4 | 240–613 MB | — | Provável conteúdo cirúrgico; verificar |
| VIDEOS JÁ POSTADOS/REELS CIRURGIA *.mp4, Cirurgia Dr Salet.mp4, VIDEO CIRURGIA ROBOTICA.mp4 | — | **Não usar** | O nome indica cirurgia em andamento (vedado no briefing) |
| VIDEOS ORIENTAÇÕES/ (pré e pós-operatório, exercícios) | 164–459 MB | Material para pacientes já operados | Não é conteúdo de captação |
| CENAS_BLOCO_CIRURGICO, CIRURGIAS INTEGRA, DEEP PLANE BRAZIL/CIRURGIAS… | — | **Não usar** | Bloco cirúrgico |
| DEEP PLANE BRAZIL/DAY 1–4 | — | Talvez (palestras do evento) | Muitas subpastas; não inspecionadas |
| MIAMI, FOTOS NATAL, PREENCHIMENTO LABIAL, 2026-04 VIDEOS ABRIL | — | Não inspecionadas | — |

Para ativar um vídeo: comprimir (H.264/MP4 + pôster), colocar em `public/media/` e preencher `heroVideo` ou `deepPlane.video` em `src/content/face.ts`. O componente já carrega o vídeo sob demanda, com pôster e legendas opcionais.

## Identidade visual (Instagram @dr.salet)

Perfil público consultado (sem login). Elementos observados: monograma "S" dentro de moldura quadrada fina sobre "Dr. SALET" em serifada clássica; capas dos destaques em marfim com monograma escuro; fotografias em tons quentes do consultório. O site traduz isso como: marfim/papel, tinta quase preta, latão como acento e azul-marinho (do terno) em uma seção. O monograma foi redesenhado em SVG como aproximação — **substituir pelo arquivo oficial do logotipo** quando disponível (não havia logo no Drive).
