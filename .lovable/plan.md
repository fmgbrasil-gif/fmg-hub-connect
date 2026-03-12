

## Plano: Adicionar Login com Email/Senha + Google OAuth

### Alteracoes

**1. `src/contexts/AuthContext.tsx`**
- Adicionar funcoes `signIn(email, password)` e `signUp(email, password, fullName)`
- Atualizar `AuthContextType` com os novos metodos
- Manter `signInWithGoogle` existente

**2. `src/pages/Login.tsx`**
- Adicionar Tabs com duas abas: "Entrar" e "Criar Conta"
- Aba "Entrar": formulario com email + senha + botao "Entrar" + botao "Entrar com Google"
- Aba "Criar Conta": formulario com nome + email + senha + botao "Criar Conta"
- Separador visual "ou" entre o formulario e o botao Google
- Usar componentes existentes: Input, Label, Tabs, Separator
- Tratar erros com toast

### Detalhes Tecnicos

**AuthContext - novas funcoes:**

```typescript
signIn: (email: string, password: string) => Promise<{ error: any }>;
signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
```

- `signIn` chama `supabase.auth.signInWithPassword({ email, password })`
- `signUp` chama `supabase.auth.signUp({ email, password, options: { data: { full_name: fullName }, emailRedirectTo: window.location.origin } })`

**Login.tsx - estrutura visual:**

```
[Logo FMG]
Hub Interno FMG

[Tab: Entrar] [Tab: Criar Conta]

--- Aba Entrar ---
Email: [________]
Senha: [________]
[Entrar]

──── ou ────

[Entrar com Google]

--- Aba Criar Conta ---
Nome: [________]
Email: [________]
Senha: [________]
[Criar Conta]
```

### Importante
- O provider de email/senha precisa estar habilitado no Supabase Dashboard (Authentication > Providers > Email). Se nao estiver, o login por email/senha retornara erro.

### Arquivos modificados

| Arquivo | Alteracao |
|---------|-----------|
| `src/contexts/AuthContext.tsx` | Adicionar `signIn` e `signUp` |
| `src/pages/Login.tsx` | Tabs com formularios + Google OAuth |
