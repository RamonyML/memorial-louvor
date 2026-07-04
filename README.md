# Escala de Louvor — Igreja Batista Memorial

Sistema web para gerenciar a escala do Ministério de Louvor: uma página
pública com a escala do mês e uma área administrativa (login com
e-mail e senha) onde quem organiza a escala cadastra cultos, define
quem toca cada instrumento, gerencia a equipe e exporta a escala como
imagem para o WhatsApp/status.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`. A área administrativa fica em `/admin`.

## Autenticação da área administrativa

O login em `/admin` usa **Firebase Authentication com e-mail e senha**.
Não existe cadastro pelo site — as contas são criadas manualmente em
*Firebase Console → Authentication → Users → Add user*. Qualquer
conta criada lá consegue entrar; para dar acesso a mais pessoas (outros
líderes de louvor), basta criar mais usuários por lá.

## Banco de dados

Os dados (cultos e membros) ficam no **Firestore** (projeto
`memorial-louvor`). Na primeira vez que o banco estiver vazio, o app
popula automaticamente com os dados iniciais (`src/data/seed.ts`).
Todo o acesso a dados passa por `src/data/repository.ts` — se um dia
trocar de backend, só esse arquivo muda.

A escala sincroniza em tempo real: qualquer edição feita por um admin
aparece na hora para quem está com a página pública aberta, sem precisar
recarregar.

### Regras do Firestore

Como o login é só front-end (não há Firebase Admin/Cloud Functions
validando nada no servidor), a segurança de escrita depende das regras
do Firestore. Configure em *Firebase Console → Firestore Database →
Regras*:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Isso permite que qualquer pessoa **leia** a escala (necessário para a
página pública) mas só quem estiver logado (com uma conta criada
manualmente no Firebase Console) consegue **escrever** — mesmo que
alguém descubra a configuração do Firebase (que não é segredo, é
pública em qualquer app web) ou tente burlar o front-end.

## Estrutura do projeto

```
src/
  firebase/     configuração do Firebase (app, Firestore, Auth)
  data/         tipos, dados de seed e repository (Firestore)
  context/      estado global: escala (cultos/membros), autenticação, toast
  components/
    icons/      ícones dos instrumentos (SVG) + wrapper do Material Symbols
    layout/     cabeçalho e layout da área administrativa
    schedule/   componentes da escala (lista, editor, card público)
    members/    componentes da equipe
    export/     templates usados para gerar a imagem (paisagem/retrato)
    common/     botão, modal, toast, empty state
  pages/        as telas (pública, login, escala, músicos, exportar)
```

## Stack

React + TypeScript + Vite, React Router, Firebase (Firestore + Auth),
html2canvas (para exportar a escala como imagem). Fontes: Poppins,
Fredoka e Dongle (Google Fonts). Ícones: Material Symbols + SVGs
próprios para os instrumentos.

## Protótipo anterior

A versão anterior (single-file, sem backend real, primeiro rascunho)
foi guardada em `_prototipo-antigo/` só como referência.
