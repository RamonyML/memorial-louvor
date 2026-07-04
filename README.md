# Escala de Louvor — Igreja Batista Memorial

Sistema web para gerenciar a escala do Ministério de Louvor: uma página
pública com a escala do mês e uma área administrativa (protegida por
senha) onde quem organiza a escala cadastra cultos, define quem toca
cada instrumento, gerencia a equipe e exporta a escala como imagem
para o WhatsApp.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`. A área administrativa fica em `/admin`.

## Senha da área administrativa

Por enquanto (antes de existir um backend com login de verdade), a
área `/admin` é protegida por uma senha única guardada no front-end.

- Senha padrão: `louvor2026`
- Para trocar: copie `.env.example` para `.env` e defina
  `VITE_ADMIN_PASSWORD=sua_senha` (reinicie o `npm run dev` depois).

Isso **não é segurança real** — é só uma trava para visitantes casuais
não editarem a escala. Não reutilize uma senha importante aqui.

## Onde os dados ficam guardados (por enquanto)

Os dados (cultos e membros) ficam salvos no `localStorage` do
navegador — ou seja, cada navegador/dispositivo tem sua própria cópia,
e os dados não são compartilhados entre quem acessa o site. Isso é
temporário: veja `src/data/repository.ts`, que concentra todo o acesso
a dados. Quando definirmos onde hospedar e armazenar isso de verdade
(banco de dados + API), só essa camada precisa mudar — as telas não
precisam ser tocadas.

## Estrutura do projeto

```
src/
  data/         tipos, dados de exemplo (seed) e repository (localStorage)
  context/      estado global: escala (cultos/membros), autenticação, toast
  components/
    icons/      ícones dos instrumentos (SVG) + wrapper do Material Symbols
    layout/     cabeçalho e layout da área administrativa
    schedule/   componentes da escala (lista, editor, card público)
    members/    componentes da equipe
    export/     template usado para gerar a imagem (PNG) da escala
    common/     botão, modal, toast, empty state
  pages/        as telas (pública, login, escala, músicos, exportar)
```

## Stack

React + TypeScript + Vite, React Router, html2canvas (para exportar a
escala como imagem). Fontes: Poppins, Fredoka e Dongle (Google Fonts).
Ícones: Material Symbols + SVGs próprios para os instrumentos.

## Protótipo anterior

A versão anterior (single-file, sem backend real, primeiro rascunho)
foi guardada em `_prototipo-antigo/` só como referência.
