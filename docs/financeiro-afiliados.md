# Financeiro e afiliados

## Pronto no web

- `/wallet`: Carteira SUWAVE com saldo disponivel, cashback, comissao, status financeiro, cupons e regras do saldo.
- `/wallet/statement`: Extrato financeiro com filtros de todos, entradas e saidas.
- `/affiliate`: Conta de afiliado com codigo, metricas, formas de saque, valor minimo, regras e privacidade.
- Menu Mais: links para Carteira SUWAVE e Conta Afiliado.

## Contrato seed

- `WalletSummary`: saldo, cashback, comissao, cupons, movimentos e conta de afiliado.
- `WalletMovement`: recarga, cashback, comissao, compra e saque, com entrada/saida.
- `AffiliateAccount`: codigo, status, comissao disponivel/pendente/total, convidados, conversao, regras e opcoes de saque.

## Integracoes preparadas

- Sistema financeiro: saldo interno, extrato, movimentacoes e status.
- Sistema de afiliados: codigo, regra AF, comissao e privacidade do comprador.
- Sistema de saque: opcoes carteira/banco, valor minimo e validacao futura.
- Sistema de checkout/produtos: base pronta para registrar comissao por produto afiliado.
- API financeira: web consome `/api/v1/finance/wallet`, `/wallet/movements`, `/affiliate` e `/affiliate/withdrawals` via proxy Next quando houver token.

## Proxima fatia

- Persistir solicitacao de saque em banco.
- Registrar eventos financeiros para admin.
- Conectar com checkout real e produtos com afiliado aberto, por aprovacao ou fechado.
