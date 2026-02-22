

## Plano: Migrar Login para Google OAuth

### Contexto
O login por email/senha esta desabilitado no Supabase (confirmado pelo erro `email_provider_disabled`). O Google OAuth ja esta configurado no Supabase. Precisamos atualizar a aplicacao para usar exclusivamente o login com Google.

### Alteracoes

**1. `src/pages/Login.tsx`** - Simplificar completamente
- Remover formularios de email/senha e tabs (login/signup)
- Remover schemas de validacao (zod)
- Adicionar um unico botao "Entrar com Google"
- Chamar `signInWithGoogle()` do AuthContext
- Manter o layout visual (logo, card, gradiente)

**2. `src/contexts/AuthContext.tsx`** - Adicionar metodo Google OAuth
- Adicionar funcao `signInWithGoogle()` que chama `supabase.auth.signInWithOAuth({ provider: 'google' })`
- Configurar `redirectTo` para `window.location.origin`
- Remover (ou manter como fallback) `signIn` e `signUp` por email/senha
- Atualizar o tipo `AuthContextType` com o novo metodo

### Resultado
- Pagina de login limpa com apenas o botao "Entrar com Google"
- Sem formularios de email/senha
- Fluxo OAuth completo via redirect do Google
- Trigger `handle_new_user` ja cria perfil automaticamente ao cadastrar via Google

### Arquivos modificados

| Arquivo | Alteracao |
|---------|-----------|
| `src/contexts/AuthContext.tsx` | Adicionar `signInWithGoogle()`, atualizar interface |
| `src/pages/Login.tsx` | Substituir formularios por botao Google |

