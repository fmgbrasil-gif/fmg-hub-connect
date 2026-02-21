
-- =============================================
-- RECRIAR BANCO DE DADOS COMPLETO - FMG BRASIL
-- =============================================

-- 1. Enum app_role
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'viewer', 'director', 'employee', 'financial_staff');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 2. Tabela user_roles
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'viewer',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Tabela user_favorites
CREATE TABLE IF NOT EXISTS public.user_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_type text NOT NULL,
  item_id text NOT NULL,
  item_name text NOT NULL,
  item_description text,
  item_url text,
  item_icon text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, item_type, item_id)
);
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- 4. Tabela custom_exclusive_tools
CREATE TABLE IF NOT EXISTS public.custom_exclusive_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  url text,
  icon text NOT NULL DEFAULT 'Package',
  is_active boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.custom_exclusive_tools ENABLE ROW LEVEL SECURITY;

-- 5. Tabela managed_cards
CREATE TABLE IF NOT EXISTS public.managed_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  card_type text NOT NULL CHECK (card_type IN ('central_solucoes', 'base_conhecimento', 'dashboards', 'solucoes_exclusivas', 'acesso_gestao')),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  url text,
  internal_path text,
  icon text NOT NULL DEFAULT 'Package',
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  open_type text CHECK (open_type IN ('external', 'embedded', 'internal')) DEFAULT 'external',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.managed_cards ENABLE ROW LEVEL SECURITY;

-- 6. Funcao has_role (security definer)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 7. Funcao has_financial_access
CREATE OR REPLACE FUNCTION public.has_financial_access(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'financial_staff')
  )
$$;

-- 8. Atualizar handle_new_user para tambem inserir role padrao
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, department)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'analyst',
    'Fiscal'
  );
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'viewer');
  RETURN NEW;
END;
$$;

-- 9. Funcao handle_updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 10. Trigger on_auth_user_created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 11. Triggers updated_at
DROP TRIGGER IF EXISTS handle_updated_at_custom_exclusive_tools ON public.custom_exclusive_tools;
CREATE TRIGGER handle_updated_at_custom_exclusive_tools
  BEFORE UPDATE ON public.custom_exclusive_tools
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS handle_updated_at_managed_cards ON public.managed_cards;
CREATE TRIGGER handle_updated_at_managed_cards
  BEFORE UPDATE ON public.managed_cards
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =============================================
-- RLS POLICIES
-- =============================================

-- user_roles policies
CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles" ON public.user_roles
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles" ON public.user_roles
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service can insert roles" ON public.user_roles
  FOR INSERT
  WITH CHECK (true);

-- user_favorites policies
CREATE POLICY "Users can read own favorites" ON public.user_favorites
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites" ON public.user_favorites
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites" ON public.user_favorites
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- custom_exclusive_tools policies
CREATE POLICY "Anyone can read active tools" ON public.custom_exclusive_tools
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage tools" ON public.custom_exclusive_tools
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- managed_cards policies
CREATE POLICY "Anyone can read cards" ON public.managed_cards
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage cards" ON public.managed_cards
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- DADOS INICIAIS
-- =============================================

-- Custom exclusive tools (3 placeholders)
INSERT INTO public.custom_exclusive_tools (title, description, url, icon, is_active, display_order) VALUES
  ('Solução em Breve 1', 'Nova solução exclusiva em desenvolvimento', NULL, 'Package', false, 1),
  ('Solução em Breve 2', 'Nova solução exclusiva em desenvolvimento', NULL, 'Package', false, 2),
  ('Solução em Breve 3', 'Nova solução exclusiva em desenvolvimento', NULL, 'Package', false, 3);

-- Central de Solucoes
INSERT INTO public.managed_cards (card_type, title, description, url, icon, display_order, is_active, open_type) VALUES
  ('central_solucoes', 'G-Click', 'Sistema de gestão empresarial completo', 'https://gclick.com.br', 'Monitor', 1, true, 'embedded'),
  ('central_solucoes', 'Onvio', 'Plataforma Thomson Reuters para contabilidade', 'https://onvio.com.br', 'Cloud', 2, true, 'embedded'),
  ('central_solucoes', 'Domínio', 'Sistema Domínio Thomson Reuters', 'https://dominio.com.br', 'Server', 3, true, 'embedded'),
  ('central_solucoes', 'e-CAC', 'Centro Virtual de Atendimento da Receita Federal', 'https://cav.receita.fazenda.gov.br', 'Building', 4, true, 'embedded'),
  ('central_solucoes', 'PGFN', 'Procuradoria-Geral da Fazenda Nacional', 'https://www.regularize.pgfn.gov.br', 'Scale', 5, true, 'embedded'),
  ('central_solucoes', 'Prefeitura SP', 'Portal da Prefeitura de São Paulo', 'https://nfe.prefeitura.sp.gov.br', 'Landmark', 6, true, 'embedded'),
  ('central_solucoes', 'SEFAZ SP', 'Secretaria da Fazenda de São Paulo', 'https://www.fazenda.sp.gov.br', 'FileText', 7, true, 'embedded'),
  ('central_solucoes', 'Simples Nacional', 'Portal do Simples Nacional', 'http://www8.receita.fazenda.gov.br/SimplesNacional', 'Calculator', 8, true, 'embedded'),
  ('central_solucoes', 'eSocial', 'Sistema do eSocial', 'https://login.esocial.gov.br', 'Users', 9, true, 'embedded'),
  ('central_solucoes', 'FGTS Digital', 'Sistema FGTS Digital', 'https://fgtsdigital.caixa.gov.br', 'Wallet', 10, true, 'embedded');

-- Base de Conhecimento
INSERT INTO public.managed_cards (card_type, title, description, internal_path, icon, display_order, is_active, open_type) VALUES
  ('base_conhecimento', 'Fiscal', 'Documentação e procedimentos do departamento fiscal', '/base-conhecimento/fiscal', 'FileText', 1, true, 'internal'),
  ('base_conhecimento', 'Contábil', 'Documentação e procedimentos do departamento contábil', '/base-conhecimento/contabil', 'Calculator', 2, true, 'internal'),
  ('base_conhecimento', 'Pessoal', 'Documentação e procedimentos do departamento pessoal', '/base-conhecimento/pessoal', 'Users', 3, true, 'internal'),
  ('base_conhecimento', 'Legalização', 'Documentação e procedimentos de legalização', '/base-conhecimento/legalizacao', 'Scale', 4, true, 'internal'),
  ('base_conhecimento', 'Financeiro', 'Documentação e procedimentos financeiros', '/base-conhecimento/financeiro', 'DollarSign', 5, true, 'internal'),
  ('base_conhecimento', 'Processos', 'Processos e workflows da empresa', '/base-conhecimento/processos', 'GitBranch', 6, true, 'internal');

-- Dashboards
INSERT INTO public.managed_cards (card_type, title, description, url, icon, display_order, is_active, open_type) VALUES
  ('dashboards', 'Dashboard Operacional', 'Visão geral das operações da empresa', 'https://app.powerbi.com', 'BarChart3', 1, true, 'embedded'),
  ('dashboards', 'Dashboard Financeiro', 'Indicadores financeiros e KPIs', 'https://app.powerbi.com', 'TrendingUp', 2, true, 'embedded');

-- Solucoes Exclusivas
INSERT INTO public.managed_cards (card_type, title, description, url, icon, display_order, is_active, open_type) VALUES
  ('solucoes_exclusivas', 'Agente Tributário IA', 'Inteligência artificial para consultas tributárias', 'https://ia.fmgbrasil.com.br', 'Bot', 1, true, 'embedded'),
  ('solucoes_exclusivas', 'Consulta CNPJ', 'Consulta detalhada de CNPJ com dados completos', 'https://cnpj.fmgbrasil.com.br', 'Search', 2, true, 'embedded');

-- Acesso Gestao
INSERT INTO public.managed_cards (card_type, title, description, internal_path, icon, display_order, is_active, open_type) VALUES
  ('acesso_gestao', 'Gestão de Clientes', 'Gerenciamento completo de clientes', '/gestao/clientes', 'Users', 1, true, 'internal'),
  ('acesso_gestao', 'Relatórios', 'Relatórios gerenciais e operacionais', '/gestao/relatorios', 'FileBarChart', 2, true, 'internal'),
  ('acesso_gestao', 'Configurações', 'Configurações do sistema', '/admin', 'Settings', 3, true, 'internal'),
  ('acesso_gestao', 'Usuários', 'Gerenciamento de usuários e permissões', '/admin', 'UserCog', 4, true, 'internal');

-- Organization settings (apenas se nao existir)
INSERT INTO public.organization_settings (id, organization_name, logo_url)
VALUES (1, 'FMG Brasil', NULL)
ON CONFLICT (id) DO NOTHING;
