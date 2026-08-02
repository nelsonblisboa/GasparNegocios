# Landing Page de Treinamento — GASPAR · Negócios JPA

Landing page moderna, didática e 100% editável, feita para o **treinamento de vendas do plano Vida em Grupo + Assistência Funeral + Telemedicina** da corretora **GASPAR — Negócios JPA** (operado pela Porto Seguro). Estruturada para ser **replicada para qualquer empresa ou produto** editando apenas o bloco `CONFIG` no topo do JavaScript.

---

## 📂 Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | A landing page completa (HTML + CSS + JS em um único arquivo). Não precisa de build, servidor ou dependências. |
| `assets/banner-gaspar.png` | Banner oficial GASPAR usado no hero (fullwidth, com a família, logo e os selos "Assistência Funeral" / "Telemedicina"). |
| `README.md` | Este guia de customização. |

---

## 🚀 Como usar

### 1. Visualizar
Basta abrir o `index.html` no navegador (duplo clique). Ou hospedar em qualquer servidor estático (GitHub Pages, Netlify, Vercel, drive público, intranet da empresa etc.).

### 2. Replicar para outra empresa / produto

A forma mais simples:

1. Abra o `index.html` em qualquer editor (VS Code, Notepad++, Sublime).
2. Localize o bloco `const CONFIG = { ... }` no JavaScript (logo no início do `<script>`).
3. Edite os campos:
   - `product.name` — Nome do produto (ex: "Vida em Grupo")
   - `product.tagline` — Frase curta de impacto
   - `product.brandInitial` — Letra do logo
   - `product.brandSubtitle` — Subtítulo da marca
   - `company.name` — Nome da corretora / empresa
   - `company.about` — Texto institucional
   - `company.phone` / `company.email` — Contato
   - `hero.*` — Headlines e citações da capa
   - `modules[]` — Lista de módulos do treinamento (pode adicionar, remover ou reordenar)
4. Salve e abra no navegador.

### 3. Trocar a identidade visual (opcional)

- **Cores** — Edite o `:root { ... }` no topo do CSS. As cores são aplicadas em toda a landing via variáveis CSS.
- **Banner do hero** — Substitua `assets/banner-gaspar.png` mantendo o mesmo nome, ou aponte para outro caminho no `index.html` (`<img src="assets/seu-banner.png">`).
- **Logo** — Edite o `<svg>` no `<header class="topbar">` (pomba + cruz dourada da GASPAR). Para outra marca, basta trocar o SVG.
- **Fontes** — Google Fonts (Playfair Display + Montserrat). Para mudar, altere a tag `<link>` e atualize `font-family` no CSS.

---

## 🧭 Navegação

A landing possui **três formas** de navegar entre os módulos:

1. **Scroll natural** — barra de progresso + pill "Módulo X de 21" atualizam em tempo real.
2. **Setas flutuantes** (canto direito da tela):
   - **▲** sobe para a seção anterior
   - **▼** desce para a próxima seção
   - Tooltip mostra "↑ 05 · Coberturas" ao passar o mouse
   - Botões desabilitam nos extremos (topo/fim)
3. **Teclado**:
   - `↑` / `↓` — seção anterior / próxima
   - `Page Up` / `Page Down` — mesma coisa
   - `Home` — volta ao topo
   - `End` — vai até a última seção

---

## 🧩 Estrutura dos módulos

Cada item do array `CONFIG.modules` representa um módulo. Você pode:
- **Reordenar** — basta trocar a posição no array.
- **Adicionar** — copie um bloco de módulo existente e ajuste.
- **Remover** — apague o objeto do array.
- **Editar conteúdo** — edite `title`, `intro` e o array `blocks` interno.

### Os 21 módulos atuais

| # | Tag | Módulo |
|---|---|---|
| 01 | Abertura | Mensagem principal e propósito do produto |
| 02 | Conexão Emocional | Gatilhos de dor que abrem a porta |
| 03 | Coberturas | O que o produto entrega |
| 04 | Benefícios em Vida | Cuida de você enquanto você vive |
| 05 | Gatilhos de Venda | Frases prontas para cada benefício |
| 06 | Argumento-Chave | O diferencial: cuidado em vida, não só depois |
| 07 | Script de Fechamento | A fala que fecha a venda |
| 08 | Objeções | Quando o cliente diz "não preciso" |
| 09 | Glossário | Termos que todo vendedor precisa dominar |
| 10 | Quiz | Hora de testar o que você aprendeu |
| 11 | Materiais | Recursos de apoio e contatos úteis |
| 12 | Serviço de Telemedicina | Cuidado médico na palma da mão |
| 13 | Como Funciona | Simples, rápido e totalmente digital |
| 14 | Por Que Escolher | Principais benefícios que o cliente leva |
| 15 | Para Quem É Indicado | Feito para quem valoriza praticidade |
| 16 | FAQ | Dúvidas comuns |
| 17 | Contatos | Fale com a gente |
| 18 | Visão Geral | Assistência Funeral completa + serviços médicos |
| 19 | Telemedicina | 12 especialidades médicas à distância, 24h |
| 20 | Seguradora | Faixa Porto Seguro |
| 21 | Nossos Valores | Cuidamos do que realmente importa |

### Tipos de bloco suportados (`blocks[].type`)

| Type | Para quê serve | Campos principais |
|---|---|---|
| `paragraph` | Texto corrido | `text` |
| `callout` (variant: `quote` / `tip`) | Citação em destaque ou dica | `text`, `title?`, `variant` |
| `pains` | Lista de "gatilhos de dor" | `items[].{icon, title, text}` |
| `coverages` | Cards de cobertura com valor | `items[].{icon, title, value, note, desc, highlights[], accent?}` |
| `life` | Benefícios em vida | `items[].{icon, title, text}` |
| `triggers` | Frases curtas de venda | `items[].{n, title, text}` |
| `script` | Fala de fechamento | `opener`, `items[]`, `closer` |
| `tips` | Lista de dicas práticas | `items[]` |
| `objection` | Objeção + resposta (com revelação) | `client`, `trainer` |
| `glossary` | Glossário em acordeão | `items[].{term, def}` |
| `quiz` | Perguntas com verificação automática | `items[].{q, a[]}` (aceita múltiplas respostas equivalentes) |
| `materials` | Cards de materiais de apoio | `items[].{icon, title, text}` |
| `phones` | Telefones úteis com botão "copiar" | `items[].{label, number, hours}` |
| `specs` | Grid de tags de especialidades/categorias | `items[].{icon, name, badge?}` |
| `journey` | Timeline visual em zigue-zague (5 etapas) | `items[].{title, text}` |
| `benefits` | Grid 3 colunas com benefícios resumidos | `items[].{icon, title, text}` |
| `profiles` | Cards verticais com label + descrição (perfis) | `items[].{lbl, text}` |
| `stats` | Banner com estatísticas numéricas grandes | `items[].{value, label}` |
| `faq` | Acordeão de perguntas e respostas (FAQ) | `items[].{q, a}` |
| `benefit-list` | Lista vertical com ícone circular + título + texto (estilo GASPAR) | `items[].{icon, title, text}` |
| `dark-card` | Card escuro premium com título + grid de especialidades + barra de destaque + cards rápidos | `title.{main, highlight, sub}`, `specs[].{icon, name}`, `highlight`, `quicks[].{icon, text}`, `footnote?` |
| `portoseg-strip` | Faixa horizontal fullwidth com logo da seguradora | `leftLabel, brandName, brandSub?` |
| `values` | Grid 4 colunas com cards de valores (Confiança, Atendimento, Qualidade, Cuidado) | `items[].{icon, title, text}` |

### Substituição automática de variáveis
Dentro de qualquer texto do `CONFIG`, você pode usar:
- `{{PRODUCT_NAME}}` — vira o nome do produto
- `{{PRODUCT_TAGLINE}}` — vira o tagline
- `{{COMPANY_NAME}}` — vira o nome da empresa

Útil para frases que citam o produto, garantindo que tudo se atualize quando você trocar a identidade.

---

## ✏️ Modo Edição (editor inline com lápis)

A landing possui um **modo de edição visual** integrado que permite atualizar dados de contato, textos, e até trocar o banner/logo **sem abrir o código**. Ideal para quem não é programador ou quer fazer ajustes rápidos antes de publicar.

### Como usar

1. Abra o `index.html` no navegador (ou no link hospedado)
2. Clique no botão **"✏️ Editar"** no canto superior direito do topbar
3. O modo edição ativa e mostra uma toolbar fixa no rodapé com os botões:
   - **💾 Salvar** — grava as edições no navegador (localStorage). Ao recarregar, as edições voltam.
   - **⬇️ Exportar HTML** — baixa um novo `treinamento-editado.html` com o `CONFIG` atualizado. Use este arquivo para substituir o `index.html` original.
   - **↩️ Restaurar** — apaga todas as edições e volta ao original (pede confirmação).
   - **✕ Sair** — sai do modo edição.

4. Em modo edição, **passe o mouse sobre qualquer texto** e um **lápis ✏️** aparece no canto superior direito do campo. Clique para editar:
   - Campos de texto → viram editáveis na hora (digite direto, Enter ou clique fora para salvar)
   - Imagens (logo, banner) → abre um seletor de arquivo; escolha a nova imagem

5. As edições são salvas apenas no **localStorage** até você clicar em "Exportar HTML". Para ter o arquivo final, sempre clique em **Exportar**.

### O que pode ser editado

- **Topo da página** (topbar): nome da marca (GASPAR), subtítulo (Treinamento de Vendas), logo SVG
- **Hero**: título principal (aceita `<em>...</em>` para itálico cobre), texto de chamada, banner (imagem)
- **Módulos (todos os 21)**: tag, título, introdução, e praticamente todo texto de cada bloco
- **Contato (rodapé)**: telefone, e-mail
- **Telefones do módulo Contatos**: cada número pode ser editado individualmente
- **Quase 350 campos** no total são editáveis via lápis

### Limitações conhecidas

- A edição do **logo SVG** substitui a imagem inteira (não edita o SVG em si). Para mudar a logo da pomba/cruz, edite o `<svg>` no HTML.
- **Adicionar/remover módulos** ainda exige editar o `CONFIG` manualmente.
- O botão "Salvar" salva no navegador (válido para a mesma sessão/navegador). Para distribuir a versão editada, use "Exportar HTML".

### Exemplo de uso

Você mudou de telefone e quer atualizar a landing:
1. Abra o arquivo no navegador
2. Clique "✏️ Editar"
3. Role até o rodapé, passe o mouse no número antigo → clique no lápis → digite o novo
4. Role até o módulo 17 (Contatos) → edite cada telefone
5. Clique "⬇️ Exportar HTML"
6. Substitua o `index.html` original pelo arquivo exportado
7. Pronto. Telefones atualizados em todo lugar.

---

## 📱 Responsividade

A landing é **mobile-first** e foi compactada especialmente para os pontos de quebra mais críticos:

| Breakpoint | Ajustes |
|---|---|
| ≤ 900px | Reduz paddings das seções, diminui tamanho do hero, compacta grids de cards |
| ≤ 700px | Reduz setas flutuantes (42px) e pill "Módulo X de Y" |
| ≤ 600px | Força 1 coluna nos grids de cobertura, vida, triggers, benefícios, FAQ |
| ≤ 380px | Compactação extrema (Galaxy Fold, iPhone SE antigo) — todos os grids em 1 coluna, tipografia reduzida |

Valide sempre em 3 tamanhos antes de publicar: desktop (1440px), tablet (768px) e celular (375-420px).

---

## 🎨 Design & UX

### Paleta padrão (extraída do design GASPAR)

| Token | Cor | Uso |
|---|---|---|
| `--c-primary` | `#131313` | Textos principais, blocos escuros |
| `--c-primary-2` | `#1F1F1F` | Variação |
| `--c-primary-soft` | `#F1ECE0` | Fundo suave (creme claro) |
| `--c-accent` | `#B88547` | Cobre/dourado principal (badges, valores) |
| `--c-accent-2` | `#C78634` | Cobre mais saturado (ícones) |
| `--c-accent-3` | `#8B5A2B` | Cobre escuro (detalhes) |
| `--c-bg` | `#F8F5EE` | Creme/marfim (fundo da página) |
| `--c-bg-card` | `#FFFFFF` | Cartões |
| `--c-bg-elev` | `#131313` | Bloco escuro (cards "premium") |

### Tipografia
- **Títulos:** Playfair Display (serifada, clássica e premium)
- **Corpo:** Montserrat (sans-serif, limpa e legível)

### Logo GASPAR
A logo é SVG inline (pomba estilizada com cruz dourada em círculo preto). Para usar outra marca, edite o `<svg>` no `<header class="topbar">` e no hero. Para texto da marca, edite `product.name` e `product.tagline` no `CONFIG`.

### Comportamento
- **Responsivo** — funciona em desktop, tablet e celular.
- **Acessível** — semântica HTML5, ARIA labels, foco visível, suporte a `prefers-reduced-motion`.
- **Animações sutis** — reveal on scroll via IntersectionObserver (não usa libs).
- **Barra de progresso** — atualiza conforme o usuário rola a página.
- **Setas flutuantes** — navegação rápida entre seções, com tooltip do nome da próxima seção.
- **Sem dependências externas** — apenas fontes do Google Fonts (Playfair + Montserrat) carregadas via CDN.
- **Funciona offline** — após o primeiro carregamento, se as fontes falharem, o sistema usa fallbacks do sistema.

---

## 💡 Dicas de uso em treinamento

1. **Antes do treinamento presencial**: envie o link da landing para os vendedores. Eles chegam conhecendo a base.
2. **Durante**: use como material de apoio projetado. Cada módulo é uma estação de discussão.
3. **Depois**: use o Quiz (módulo 10) como "warm-up" das reuniões semanais.
4. **Para escalar**: gere uma landing por produto/campanha. O time de marketing só precisa editar o `CONFIG`.
5. **Impressão**: se quiser gerar PDF, use Ctrl+P no Chrome → "Salvar como PDF". O resultado fica próximo de uma apostila.

---

## 🆕 Blocos novos (versão 3 — GASPAR)

Esta versão adiciona os blocos específicos do design oficial GASPAR (preto + cobre + pomba/cruz):

- **`benefit-list`** — lista vertical com ícone circular (fundo preto, ícone cobre) + título em UPPERCASE + texto curto. Use para "Visão geral dos benefícios" / "O que está incluso".
- **`dark-card`** — card escuro premium (`.dark-card`) com:
  - Título grande `main + highlight` (ex: "TELEMEDICINA *24h*")
  - Grid 2 colunas com 12 especialidades
  - Barra de destaque cobre/orange com a call-to-action principal
  - 3 quick cards (ícone + texto curto)
  - Footnote em itálico no rodapé

Estes dois blocos substituem o antigo `split` (que foi dividido para caber melhor em telas pequenas — agora são dois módulos completos: 18 e 19).

---

## ⚠️ Aviso

O template é neutro em relação à empresa/produto. O bloco de aviso no rodapé ("Material de uso interno") é genérico — mantenha-o ou ajuste conforme a política da sua empresa.

---

Feito para replicar. Bora treinar. 🚀

— GASPAR — Negócios JPA · Nelson Brandão Lisbôa
