

## Plano: Integrar Formulário Pipefy no Dashboard

Adicionar um botão "Registro de Eventos" no Dashboard que abre o formulário do Pipefy em um dialog (usando o componente `IframeDialog` já existente no projeto).

### Alterações

**`src/pages/Dashboard.tsx`**
- Importar `IframeDialog`, `useState` e o ícone `CalendarPlus` (ou `FileEdit`)
- Adicionar um botão abaixo dos cards existentes: "Registro de Eventos - RH"
- Ao clicar, abre o `IframeDialog` com a URL `https://app.pipefy.com/public/form/K6nLZ7ae?embedded=true`
- Estilo: botão centralizado com ícone, visual consistente com o restante da página

### Estrutura Visual

```text
[Hub FMG Brasil]
[Acesso Comum] [Acesso Gestão]

────────────────────────────
[📋 Registro de Eventos - RH]  ← botão novo
────────────────────────────
```

### Detalhes
- Reutiliza o `IframeDialog` existente (já tem loading state, fullscreen, abrir em nova aba)
- Nenhuma nova dependência necessária
- Um único arquivo modificado: `Dashboard.tsx`

