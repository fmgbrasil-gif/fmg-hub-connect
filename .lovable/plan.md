

## Plano: Recriar o Banco de Dados Completo

O banco de dados foi apagado e precisa ser recriado. Baseado nas migrations existentes no projeto, vou criar **uma unica migration** que recria toda a estrutura necessaria.

---

### Tabelas e Estruturas a Recriar

| Estrutura | Descricao |
|-----------|-----------|
| Enum `app_role` | Valores: `admin`, `viewer`, `director`, `employee`, `financial_staff` |
| `profiles` | Perfis de usuario (id, email, full_name, role, department, avatar_url, is_active) |
| `user_roles` | Roles dos usuarios (user_id, role) |
| `user_favorites` | Favoritos do usuario (item_type, item_id, item_name, etc.) |
| `custom_exclusive_tools` | Ferramentas personalizadas (title, description, url, icon, etc.) |
| `managed_cards` | Cards gerenciados do CMS (card_type, title, url, icon, display_order, open_type) |
| `organization_settings` | Configuracoes da organizacao (logo_url, organization_name) |
| Funcao `has_role()` | Security definer para verificar roles |
| Funcao `has_financial_access()` | Verifica acesso financeiro (admin ou financial_staff) |
| Funcao `handle_new_user()` | Trigger para criar perfil + role padrao ao cadastrar |
| Funcao `handle_updated_at()` | Trigger generico para updated_at |
| Trigger `on_auth_user_created` | Executa handle_new_user ao criar usuario |
| Politicas RLS | Todas as politicas de seguranca para cada tabela |

---

### Detalhes Tecnicos

**Migration unica** que sera criada contendo:

1. Criar enum `app_role` com todos os valores usados no sistema
2. Criar tabela `profiles` com FK para `auth.users`
3. Criar tabela `user_roles` com constraint unique(user_id, role)
4. Criar tabela `user_favorites` com constraint unique(user_id, item_type, item_id)
5. Criar tabela `custom_exclusive_tools` com dados iniciais
6. Criar tabela `managed_cards` com constraint de card_type e dados iniciais (Central de Solucoes, Base de Conhecimento, Dashboards, Solucoes Exclusivas, Acesso Gestao)
7. Criar tabela `organization_settings`
8. Criar todas as funcoes (has_role, has_financial_access, handle_new_user, handle_updated_at)
9. Criar trigger on_auth_user_created
10. Habilitar RLS em todas as tabelas e criar politicas

**Apos a migration**, o arquivo `types.ts` sera atualizado automaticamente, corrigindo todos os erros de build.

---

### Dados Iniciais Incluidos

- 3 custom_exclusive_tools inativos ("Solucao em Breve 1, 2, 3")
- 10 cards de Central de Solucoes (G-Click, Onvio, Dominio, e-CAC, etc.)
- 6 cards de Base de Conhecimento (departamentos)
- 2 cards de Dashboards
- 2 cards de Solucoes Exclusivas
- 4 cards de Acesso Gestao
- 1 registro de organization_settings (FMG Brasil)

---

### Resultado Esperado

- Todos os erros de build serao corrigidos (types.ts atualizado)
- Login e autenticacao funcionarao novamente
- Todas as paginas do sistema voltarao a funcionar
- Dados iniciais dos cards estarao pre-populados

