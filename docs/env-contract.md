# Contrato de ambiente do Web SUWAVE

Este arquivo registra as variaveis esperadas pelo frontend.

## API

```env
NEXT_PUBLIC_API_BASE_URL=https://99dev.pro/suwave-api
```

Status: aguardando confirmacao do usuario.

## Politica de integracao

- Enquanto a API do modulo nao estiver pronta, usar repository mockado com 3 registros.
- Quando a API estiver pronta e deployada, trocar o repository do modulo para buscar em `NEXT_PUBLIC_API_BASE_URL`.
- Se endpoint protegido exigir token, usar sessao do fluxo auth existente.

## Smoke local

```powershell
npm run lint
npm run build
```

## Commit do web

O web deve ser commitado por modulo apos:

- avaliacao visual do usuario;
- `npm run lint`;
- `npm run build`;
- fluxo principal navegavel.

