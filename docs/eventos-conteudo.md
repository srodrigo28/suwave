# Eventos e conteudo

Fatia web concluida para mapear o fluxo de eventos e noticias com API conectada e fallback local.

## Pronto

- Rota geral: `/events`.
- Eventos publicos e noticias locais: `/events/public`.
- Eventos privados: `/events/private`.
- Detalhe compartilhavel: `/events/[eventSlug]`.
- Entrada pelo menu `Mais categorias > Evento e noticia`.
- Seeds locais cobrindo eventos publicos, privados e noticia local.
- Consumo do contrato `/api/v1/events` com revalidacao curta e fallback para os seeds locais.

## Proximo passo natural

- Criar publicacao/gestao de evento e registrar interesse/reserva.
