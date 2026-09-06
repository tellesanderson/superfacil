# SuperFácil — Sites & Landing Pages Profissionais

Site oficial: [https://superfacil.inf.br](https://superfacil.inf.br)

## 📌 Novo Posicionamento
O site da **SuperFácil** foi totalmente reconstruído com foco em **Desenvolvimento de Sites e Landing Pages de Alta Conversão** para pequenos comércios, empresas locais, autônomos e pessoas físicas.

O diferencial central é a **proximidade, ausência de burocracia e alta confiabilidade técnica** (mais de 12 anos de experiência técnica sênior em engenharia web), entregando sites rápidos, bonitos e seguros sem contratos engessados.

---

## 🚀 Estrutura de Páginas

1. **Home (`index.html`)**:
   - Proposta de valor em 5 segundos.
   - Chamadas diretas para orçamento no WhatsApp.
   - Visão geral dos serviços, métricas e destaques do portfólio.
   - Depoimentos reais de pequenos empresários e autônomos.
2. **Serviços (`servicos.html`)**:
   - 4 faixas de escopo detalhadas: Landing Page, Site Institucional Local, Site Pessoal/Portfólio e Cardápio/Catálogo WhatsApp.
   - Prazos médios de entrega (3 a 8 dias úteis).
   - O que está sempre incluso (responsividade, WebP, SSL, SEO básico).
   - Processo em 4 passos simples e seção de FAQ.
3. **Portfólio (`portfolio.html`)**:
   - 8 modelos distintos com identidades visuais personalizadas por nicho:
     - *Gastronomia*: Sabor & Brasa (Hamburgueria / Restaurante)
     - *Beleza & Estética*: Studio Elegance (Salão / Estética)
     - *Serviços & Direito*: Vanguard Advocacia (Escritório Jurídico)
     - *Fitness*: IronFit Club (Academia / Crossfit / Personal)
     - *Saúde*: Clínica Dr. Lucas (Odontologia / Consultório)
     - *Pessoal & Eventos*: Momento Único (Casamentos / RSVP)
     - *Cursos & Digital*: Método Acelerador (Infoproduto / Curso Online)
     - *Currículo & Freelancer*: Perfil Profissional (Portfólio de Especialista)
   - Filtro interativo por categoria e modal de visualização em alta resolução.
   - Botão direto "Quero um site neste estilo" integrado ao WhatsApp.
4. **Sobre (`sobre.html`)**:
   - Apresentação transparente e acessível do desenvolvedor.
   - A bagagem técnica de +12 anos como garantia de durabilidade, velocidade e estabilidade do código.
   - 4 pilares: Conversa direta, Código limpo, Segurança sem surpresas e Total liberdade.
5. **Contato (`contato.html`)**:
   - Formulário com validação em tempo real e envio direto via API Web3Forms (`0bf83006-d944-4243-b156-4240b82f1b48`).
   - Proteção anti-spam via honeypot invisível (`botcheck`).
   - Links rápidos de contato (WhatsApp, E-mail, Localização).
6. **Página 404 (`404.html`)**:
   - Página de erro moderna, acolhedora e com atalhos para a Home e WhatsApp.
7. **Redirecionamentos de Legado**:
   - `Empresa.html` → redireciona para `sobre.html`.
   - `services.html` → redireciona para `servicos.html`.
   - `fale.html` → redireciona para `contato.html`.
   - `blog.html` → redireciona para `servicos.html`.

---

## 🔒 Segurança & Cloudflare CSP

O site opera com headers de segurança configurados no Cloudflare:
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `Content-Security-Policy`:
  - `script-src`: `'self' https://cdn.jsdelivr.net`
  - `style-src`: `'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://fonts.googleapis.com`
  - `img-src`: `'self' data: https:`
  - `font-src`: `'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com`
  - `connect-src`: `'self' https://api.whatsapp.com https://wa.me https://api.web3forms.com`
  - `frame-ancestors`: `'none'`
  - `base-uri`: `'self'`

> **Dica Cloudflare**: No painel do Cloudflare (Transform Rules / Response Headers), certifique-se de que o nome do header seja apenas `Content-Security-Policy` para evitar duplicação no valor da resposta.

---

## ⚡ Performance & Otimização
- **100% WebP**: Todas as imagens do site e do portfólio foram comprimidas para o formato moderno `.webp`, reduzindo o peso total em mais de 85%.
- **Dimensões Explícitas**: Tags `<img>` com `width` e `height` definidos para eliminar Layout Shift (CLS).
- **Sem Frameworks Pesados**: Vanilla CSS e Vanilla JS puros, garantindo carregamento quase instantâneo (< 1.2s) e pontuação de topo nos Core Web Vitals.
- **SEO Técnico**: `sitemap.xml`, `robots.txt`, meta tags Open Graph / Twitter e Schema.org JSON-LD configurados em todas as páginas.