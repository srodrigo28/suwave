# Plano Splash Screen SUWAVE

## Identificacao

| Campo | Valor |
| --- | --- |
| Nome da tela | Splash Screen SUWAVE |
| Fluxo | `APP_START > ABRIR_APP > SPLASH_SCREEN` |
| Destino automatico | `HOME` |
| Interacao do usuario | Nenhuma |

## Objetivo

Criar a tela inicial do aplicativo SUWAVE com entrada curta, fluida e memoravel, preparando a transicao imediata para a Home sem exibir carregamento, spinner ou controles interativos.

## Resultado Esperado

- Tela inicial funcional e exibida automaticamente ao abrir o aplicativo.
- Animacao do logo definida e limitada a um tempo curto.
- Fluxo automatico para a Home.
- Estrutura limpa para evoluir junto com autenticacao, cidade ativa e carregamento inicial.
- Experiencia com aparencia instantanea, sem travamentos perceptiveis.

## Estrutura Visual

### Topo

- Manter a barra de status do sistema com hora, sinal e bateria.

### Tela

- Fundo preto ocupando toda a area visivel.
- Cor base: `#000000`.
- Conteudo centralizado verticalmente e horizontalmente.

### Logo textual

- Texto: `SUWAVE`.
- Cor: branco `#FFFFFF`.
- Tipografia: sans-serif.
- Peso: negrito.
- Espacamento: levemente aumentado entre letras.
- Sem botoes, campos, loaders ou mensagens auxiliares.

## Fluxo

```text
APP_START
  -> ABRIR_APP
  -> SPLASH_SCREEN
  -> HOME
```

### Comportamento

1. A Splash Screen e carregada imediatamente no inicio do aplicativo.
2. A animacao de entrada do logo inicia sem acao do usuario.
3. Ao terminar a animacao e a pausa final, a Home e exibida automaticamente.
4. A troca para a Home deve usar fade rapido ou corte direto.

## Logica do Sistema

### Responsabilidades da Splash

- Exibir a identidade inicial da SUWAVE.
- Cobrir a entrada visual do aplicativo enquanto o shell inicial aparece.
- Encerrar rapidamente e liberar a Home.

### Fora do escopo visual da Splash

- Exibir carregamento.
- Exibir erro.
- Solicitar login.
- Solicitar permissao.
- Solicitar escolha de cidade.
- Bloquear o usuario aguardando dados remotos.

## Animacao

### Estado inicial

- Tela completamente preta.
- Logo textual invisivel.
- Nenhum brilho permanente visivel.

### Efeito de luz

- Uma linha horizontal luminosa atravessa o centro da tela.
- Direcao: esquerda para direita.
- Cor: branco quente suave.
- Espessura: proporcional a altura visual das letras.
- A luz deve funcionar como revelacao, nao como efeito agressivo.

### Revelacao do logo

- O texto `SUWAVE` aparece conforme a linha de luz passa.
- A opacidade aumenta progressivamente.
- Um glow leve acompanha a revelacao.
- O brilho deve reduzir no fim da animacao.

### Estado final

- Logo totalmente visivel.
- Glow residual removido ou quase imperceptivel.
- Tela pronta para transicao imediata.

## Tempo

| Etapa | Duracao alvo |
| --- | --- |
| Revelacao principal | `1.2s` a `1.8s` |
| Pausa final | aproximadamente `0.5s` |
| Limite percebido | nao ultrapassar `2s` antes da Home |

## Transicao Para Home

- Preferencia: fade rapido.
- Alternativa: corte direto quando a Home ja estiver pronta.
- Nao mostrar spinner.
- Nao mostrar skeleton dentro da Splash.
- A transicao deve parecer continuidade do inicio do app, nao uma tela intermediaria longa.

## Integracoes Previstas

| Sistema | Papel no fluxo |
| --- | --- |
| Inicializacao do aplicativo | Decide quando a Splash aparece |
| Autenticacao | Pode preparar estado antes da Home sem alterar o visual base |
| Carregamento da Home | Deve iniciar sem prender a Splash alem do limite |
| Cidade ativa | Deve estar preparada para hidratar a Home no fluxo futuro |

## Regras de Implementacao

- Preferir uma unica responsabilidade visual para a Splash.
- Evitar duplicar shell, status bar ou transicoes ja existentes no app.
- Manter a animacao leve para nao travar em dispositivos pequenos.
- Garantir fallback simples caso animacoes avancadas nao rodem bem.
- Respeitar preferencias de reducao de movimento quando suportadas.
- Nao depender de rede para exibir a Splash.

## Validacoes

- A Splash aparece automaticamente ao abrir o app.
- Nao ha botoes nem necessidade de toque.
- A tela nao mostra carregamento visivel.
- A animacao e fluida e curta.
- O fluxo chega a Home automaticamente.
- O efeito nao ultrapassa o limite de tempo definido.
- A tela funciona em dispositivos pequenos sem corte incoerente do logo.
- O status do aparelho permanece coerente com o shell visual do app.

## Criterios de Aceite

- Fundo preto integral.
- Texto `SUWAVE` centralizado em branco.
- Revelacao feita por linha luminosa horizontal da esquerda para a direita.
- Glow presente apenas durante a revelacao.
- Transicao automatica para Home.
- Estrutura pronta para evoluir com autenticacao, cidade ativa e inicializacao do app.

## Proximos Passos

1. Revisar o plano com o cliente e aprovar timing, intensidade da luz e transicao.
2. Implementar a versao visual da Splash no shell atual do aplicativo.
3. Validar abertura em desktop mobile frame e viewport pequeno real.
4. Ajustar a integracao futura com autenticacao e cidade ativa sem aumentar o tempo da Splash.
