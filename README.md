# Suwave

<p align="center">
  <img src="./public/suwave-logo-transparent.png" alt="Logo Suwave" width="170" />
</p>

<p align="center">
  <strong>Uma experiência mobile de marketplace com cara de aplicativo.</strong>
</p>

<p align="center">
  Compra, venda, serviços e oportunidades em uma interface visual, rápida e feita para navegar no celular.
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img alt="React" src="https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="PWA" src="https://img.shields.io/badge/PWA-ready-0F7A33?style=for-the-badge" />
</p>

## Sobre

Suwave é um protótipo de marketplace mobile construído com foco em navegação simples, categorias visuais e fluxos que lembram um app nativo.

O projeto reúne uma home promocional, cards de ofertas, categorias de serviços e um fluxo de empregos que leva o usuário do menu de vagas até o detalhe de uma empresa com oportunidades disponíveis.

## Preview

<p align="center">
  <img src="./preview/atual/home.png" alt="Home atual da Suwave" width="330" />
</p>

### Fluxo de empregos

<p align="center">
  <img src="./preview/emprego/1-emprego-menu.png" alt="Menu de empregos" width="180" />
  <img src="./preview/emprego/2-empresa-list.png" alt="Lista de empresas com vagas" width="180" />
  <img src="./preview/emprego/3-empresa-description.png" alt="Detalhe da empresa e vagas" width="180" />
  <img src="./preview/emprego/4-empresa-vagas.png" alt="Continuação das vagas" width="180" />
</p>

## Destaques

- Home mobile com banner promocional, busca e navegação inferior.
- Categorias com ícones, estados selecionados e menu lateral.
- Fluxo de `Empregos` com vagas abertas e detalhe da empresa.
- Lista de vagas com cargo, modalidade e ação de contato.
- Convite de instalação no celular com suporte progressivo a PWA.
- Manifest e ícones dedicados para instalação.
- Animações de transição e microinterações com Motion.
- Layout adaptado para celular real e apresentação em moldura de aparelho no desktop.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| Next.js 16 | App Router, metadata e manifest |
| React 19 | Componentes e estados interativos |
| TypeScript | Tipagem do projeto |
| Motion | Animações e transições |
| React Icons | Ícones da interface |
| CSS Modules | Estilos do fluxo mobile |

## Rodando localmente

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Next.js no terminal.

### Comandos úteis

```bash
npm run build
npm run lint
```

## Estrutura principal

```text
src/app/
  _components/
    app-shell.tsx
    suwave-home.module.css
  companies/
    [companySlug]/
  home/
    _components/
  jobs/
    companies/
      page.tsx
    page.tsx
  listings/
    vehicles/
      pickups/
        page.tsx
    page.tsx
  layout.tsx
  manifest.ts
  page.tsx

src/models/
src/repositories/
src/shared/

preview/
  atual/
  emprego/

public/
  marketplace/
  suwave-icon-192.png
  suwave-icon-512.png
  suwave-logo-transparent.png
```

## PWA

O projeto inclui manifest, ícones de instalação e um bottom sheet que convida o usuário a instalar a experiência no celular.

Em navegadores compatíveis, o fluxo usa o prompt nativo de instalação. Em iPhone, a interface orienta o usuário a adicionar o app à Tela de Início pelo menu de compartilhamento.

## Status

O projeto está em evolução. O fluxo visual principal e a jornada de empregos já estão modelados, enquanto novas categorias e telas podem ser conectadas a partir da base existente.

---

<p align="center">
  Feito para explorar como um marketplace local pode ficar leve, visual e acolhedor no celular.
</p>
