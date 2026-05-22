# Plano Login e Cadastro para Anunciar

## Identificacao

| Campo | Valor |
| --- | --- |
| Nome do fluxo | Login e Cadastro para Anunciar |
| Arquivo | `login-cad.md` |
| Entrada principal | Toque em `Anunciar` na navegacao inferior |
| Objetivo | Preparar o usuario para criar anuncios |
| Proxima fase | Integracao com API de autenticacao e perfil |

## Objetivo

Montar o fluxo inicial que decide se o usuario pode seguir para `Anunciar` ou se precisa entrar, criar conta e completar perfil antes de publicar.

Nesta fase, o foco e:

- Criar as telas e a navegacao do fluxo.
- Preparar a verificacao de sessao ao tocar em `Anunciar`.
- Definir uma base de estado persistente para autenticacao e perfil.
- Deixar o caminho pronto para a API sem acoplar as telas a dados remotos agora.

## Fluxo Principal

```text
Usuario toca em Anunciar
  -> verifica sessao
    -> se logado e perfil completo: abre fluxo de anuncio
    -> se nao logado: abre Entrar para anunciar
    -> se cadastro iniciado e perfil incompleto: abre Completar perfil
```

## Telas do Fluxo

### Tela 1: Entrar para anunciar

#### Objetivo

Explicar que criar anuncios exige login ou cadastro antes de continuar.

#### Entrada

- Usuario toca em `Anunciar`.
- Sistema identifica que nao existe sessao valida.

#### Estrutura visual

- Barra de status do aparelho.
- Ilustracao ou composicao visual relacionada a anunciar.
- Titulo: `Entre para anunciar`.
- Texto de apoio informando que o usuario precisa entrar ou criar conta gratis.
- Navegacao inferior preservada.
- Item `Anunciar` continua em destaque.

#### Acoes

- Botao primario: `Entrar com WhatsApp`.
- Botao secundario: `Entrar com e-mail`.
- Botao de cadastro: `Criar conta gratis`.
- Link de apoio: `Ja tem conta? Entrar`.

#### Navegacao esperada

| Acao | Destino inicial |
| --- | --- |
| Entrar com WhatsApp | Fluxo futuro de autenticacao por WhatsApp |
| Entrar com e-mail | Fluxo futuro de login por e-mail |
| Criar conta gratis | Tela `Criar conta` |
| Ja tem conta? Entrar | Login futuro |

### Tela 2: Criar conta

#### Objetivo

Coletar os dados iniciais para criar uma conta no aplicativo.

#### Estrutura visual

- Header com botao voltar.
- Titulo central: `Criar conta`.
- Formulario com inputs.
- Botao principal no rodape do formulario.
- Navegacao inferior preservada.

#### Campos iniciais

| Campo | Tipo inicial |
| --- | --- |
| Nome completo | Texto |
| WhatsApp | Telefone |
| E-mail | E-mail |
| Senha | Senha |
| Confirmar senha | Senha |
| Aceito os termos de uso | Checkbox |

#### Acoes

- Voltar para `Entrar para anunciar`.
- Alternar visibilidade de senha.
- Continuar cadastro.

#### Validacoes futuras

- Nome obrigatorio.
- WhatsApp valido.
- E-mail valido.
- Senha com regra minima.
- Confirmacao de senha igual a senha.
- Aceite de termos obrigatorio.

#### Destino

```text
Continuar cadastro
  -> Completar perfil
```

### Tela 3: Completar perfil

#### Objetivo

Coletar informacoes pessoais complementares antes de liberar o usuario para anunciar.

#### Estrutura visual

- Header com botao voltar.
- Titulo central: `Complete seu perfil`.
- Area para foto de perfil.
- Formulario pessoal.
- Texto curto explicando que os dados ajudam a criar o perfil de anunciante.
- Botao principal.
- Navegacao inferior preservada.

#### Campos iniciais

| Campo | Tipo inicial |
| --- | --- |
| Foto de perfil | Upload futuro |
| Nome completo | Texto |
| CPF | Documento |
| Data de nascimento | Data |
| Genero | Select |
| Cidade / UF | Texto ou select futuro |
| WhatsApp | Telefone |

#### Acoes

- Adicionar foto de perfil.
- Voltar para `Criar conta`.
- Salvar e continuar.

#### Validacoes futuras

- CPF valido.
- Data de nascimento valida.
- Cidade e UF informadas.
- WhatsApp valido.
- Dados obrigatorios definidos pela API.

#### Destino

```text
Salvar e continuar
  -> marca perfil como completo
  -> abre fluxo de anuncio
```

## Regra do Botao Anunciar

### Estado atual desejado

O item `Anunciar` da navegacao inferior passa a ser uma entrada protegida por estado de autenticacao.

### Decisao de rota

| Estado | Destino |
| --- | --- |
| Sem sessao | Tela `Entrar para anunciar` |
| Sessao ativa e perfil incompleto | Tela `Completar perfil` |
| Sessao ativa e perfil completo | Fluxo de criacao de anuncio |

## Estado Global

## Zustand

Zustand deve ser usado para preparar o estado inicial do fluxo de autenticacao e cadastro.

### Motivos

- Guardar sessao mock durante a fase de telas.
- Persistir progresso basico do cadastro.
- Evitar prop drilling entre shell, navegacao e telas.
- Facilitar troca posterior por API real.

### Estado inicial sugerido

```ts
type AuthState = {
  isAuthenticated: boolean;
  profileCompleted: boolean;
  draftAccount?: {
    fullName?: string;
    whatsapp?: string;
    email?: string;
  };
};
```

### Acoes iniciais sugeridas

```ts
setAuthenticated()
setProfileCompleted()
saveAccountDraft()
clearSession()
```

### Persistencia

- Persistir somente dados de mock e progresso leve nesta fase.
- Evitar persistir senha em estado global.
- Evitar persistir CPF sem decisao de seguranca e API.
- Preparar persistencia para ser substituida por token/sessao vindos do backend.

## Rotas Sugeridas

| Tela | Rota sugerida |
| --- | --- |
| Entrar para anunciar | `/auth/announce` |
| Criar conta | `/auth/register` |
| Completar perfil | `/auth/profile` |
| Criar anuncio | `/listings/new` |

## Estrutura Sugerida

```text
src/
  app/
    auth/
      announce/
        page.tsx
        _components/
      register/
        page.tsx
        _components/
      profile/
        page.tsx
        _components/
    listings/
      new/
        page.tsx
  stores/
    auth-store.ts
```

## Fase 1: Telas e Navegacao

1. Instalar e configurar Zustand, caso ainda nao exista no projeto.
2. Criar store inicial de autenticacao com persistencia controlada.
3. Alterar o clique de `Anunciar` para passar pela verificacao de estado.
4. Criar a tela `Entrar para anunciar`.
5. Criar a tela `Criar conta`.
6. Criar a tela `Completar perfil`.
7. Criar a navegacao entre as tres telas.
8. Manter a navegacao inferior consistente durante o fluxo.

## Fase 2: Formularios Funcionais Locais

1. Adicionar estado local aos formularios.
2. Aplicar validacoes basicas no cliente.
3. Salvar apenas rascunho seguro no store.
4. Simular conclusao de perfil sem API.
5. Redirecionar para `/listings/new` quando o perfil estiver completo.

## Fase 3: API

1. Definir endpoints de login, cadastro e perfil.
2. Substituir estado mock por sessao real.
3. Definir estrategia de token/cookie.
4. Validar seguranca de senha, CPF, foto e telefone.
5. Ligar upload de foto.
6. Ligar cidade ativa ao cadastro e ao perfil do anunciante.

## Cuidados de Seguranca

- Nao armazenar senha em Zustand persistido.
- Nao guardar CPF em persistencia local antes de definir politica de seguranca.
- Nao tratar mock de login como autenticacao real.
- Separar tela visual, store e futura camada de API.
- Proteger criacao de anuncio tambem no backend quando a API existir.

## Validacoes do Fluxo

- Usuario deslogado tocando em `Anunciar` vai para a tela de entrada.
- Botao `Criar conta gratis` abre `Criar conta`.
- Botao `Continuar cadastro` leva a `Completar perfil`.
- Usuario com perfil incompleto nao entra direto na criacao de anuncio.
- Usuario logado e com perfil completo segue para `Anunciar`.
- Telas nao quebram em viewport pequeno.
- Navegacao inferior continua previsivel.

## Criterios de Aceite da Primeira Entrega

- Fluxo visual das tres telas criado.
- Navegacao entre telas funcionando.
- Clique em `Anunciar` direcionado por estado de autenticacao mock.
- Zustand preparado para sessao/progresso basico.
- Estrutura pronta para integracao com API.
- Nenhum dado sensivel persistido indevidamente.

## Proximos Passos

1. Aprovar o desenho das rotas e regras do clique em `Anunciar`.
2. Implementar a primeira fase com telas e Zustand.
3. Revisar responsividade e estados dos formularios.
4. Partir para contratos de API de autenticacao, cadastro e perfil.
