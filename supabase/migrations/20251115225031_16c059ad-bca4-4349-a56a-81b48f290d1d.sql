-- Create managed_cards table for all site cards
CREATE TABLE public.managed_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Identification
  card_type text NOT NULL CHECK (card_type IN ('central_solucoes', 'base_conhecimento', 'dashboards', 'solucoes_exclusivas')),
  title text NOT NULL,
  description text NOT NULL,
  
  -- Navigation and Links
  url text,
  internal_path text,
  
  -- Visual
  icon text NOT NULL DEFAULT 'Package',
  
  -- Controls
  display_order integer NOT NULL,
  is_active boolean DEFAULT true,
  
  -- Open type (for Exclusive Solutions)
  open_type text DEFAULT 'external' CHECK (open_type IN ('external', 'embedded', 'internal')),
  
  -- Audit
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Indexes for performance
CREATE INDEX idx_managed_cards_type ON public.managed_cards(card_type);
CREATE INDEX idx_managed_cards_active ON public.managed_cards(is_active);
CREATE INDEX idx_managed_cards_order ON public.managed_cards(card_type, display_order);

-- Enable RLS
ALTER TABLE public.managed_cards ENABLE ROW LEVEL SECURITY;

-- Anyone can view active cards
CREATE POLICY "Anyone can view active cards"
ON public.managed_cards FOR SELECT
USING (is_active = true);

-- Directors can manage all cards
CREATE POLICY "Directors can manage all cards"
ON public.managed_cards FOR ALL
USING (has_role(auth.uid(), 'director'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_managed_cards_updated_at
BEFORE UPDATE ON public.managed_cards
FOR EACH ROW
EXECUTE FUNCTION update_custom_tools_updated_at();

-- Migrate existing data from Central de Soluções
INSERT INTO public.managed_cards (card_type, title, description, url, icon, display_order, is_active)
VALUES 
  ('central_solucoes', 'G-Click', 'Sistema de gestão contábil completo', 'https://www.gclick.com.br', 'Mouse', 1, true),
  ('central_solucoes', 'Onvio', 'Plataforma de gestão de escritório contábil', 'https://www.onvio.com.br', 'FileSpreadsheet', 2, true),
  ('central_solucoes', 'Domínio Sistemas', 'Sistema integrado de gestão empresarial', 'https://www.dominiosistemas.com.br', 'Settings', 3, true),
  ('central_solucoes', 'e-CAC', 'Portal de serviços da Receita Federal', 'https://cav.receita.fazenda.gov.br/autenticacao/login', 'FileText', 4, true),
  ('central_solucoes', 'SEFAZ', 'Secretaria da Fazenda - Serviços Fiscais', 'https://www.sefaz.ba.gov.br', 'Building', 5, true),
  ('central_solucoes', 'eSocial', 'Sistema de escrituração digital das obrigações fiscais', 'https://www.gov.br/esocial', 'Users', 6, true),
  ('central_solucoes', 'FGTS Digital', 'Sistema de gestão do FGTS', 'https://www.fgts.gov.br', 'DollarSign', 7, true),
  ('central_solucoes', 'Conectividade Social', 'Portal da Caixa para empregadores', 'https://conectividade.caixa.gov.br', 'Network', 8, true),
  ('central_solucoes', 'Junta Comercial', 'Registro e legalização de empresas', 'https://www.juceb.ba.gov.br', 'Building2', 9, true),
  ('central_solucoes', 'Simples Nacional', 'Portal do Simples Nacional', 'https://www8.receita.fazenda.gov.br/SimplesNacional', 'Calculator', 10, true);

-- Migrate existing data from Base de Conhecimento
INSERT INTO public.managed_cards (card_type, title, description, internal_path, icon, display_order, is_active, open_type)
VALUES 
  ('base_conhecimento', 'Dep. Legalização', 'Tutoriais e processos para abertura de empresas e regularizações', '/legalizacao', 'FileText', 1, true, 'internal'),
  ('base_conhecimento', 'Dep. Pessoal', 'Gestão de folha de pagamento, admissões e demissões', '/pessoal', 'Users', 2, true, 'internal'),
  ('base_conhecimento', 'Dep. Fiscal', 'Procedimentos fiscais e apuração de impostos', '/fiscal', 'Scale', 3, true, 'internal'),
  ('base_conhecimento', 'Dep. Contábil', 'Processos contábeis e demonstrações financeiras', '/contabil', 'Calculator', 4, true, 'internal'),
  ('base_conhecimento', 'Acesso Comum', 'Guias e tutoriais de acesso aos principais sistemas', '/acesso-comum', 'Key', 5, true, 'internal'),
  ('base_conhecimento', 'Acesso Gestão', 'Documentação para gestores e coordenadores', '/acesso-gestao', 'Shield', 6, true, 'internal');

-- Migrate existing data from Dashboards
INSERT INTO public.managed_cards (card_type, title, description, url, icon, display_order, is_active)
VALUES 
  ('dashboards', 'Análise de Demandas Diárias', 'Acompanhamento de tarefas e demandas do dia a dia', 'https://lookerstudio.google.com/reporting/b5e84d14-1a78-44fc-83ee-2488f3c8bd11', 'BarChart', 1, true),
  ('dashboards', 'Análise de Clientes x Responsáveis', 'Visão estratégica da distribuição de clientes por responsável', 'https://lookerstudio.google.com/reporting/87097db4-8c6c-400e-90b0-3b06d4e3f79b', 'Users', 2, true);

-- Migrate existing data from Soluções Exclusivas (fixed tools)
INSERT INTO public.managed_cards (card_type, title, description, url, icon, display_order, is_active, open_type)
VALUES 
  ('solucoes_exclusivas', 'Analisador de Relatórios', 'Ferramenta de análise de relatórios', '#', 'BarChart', 1, true, 'external'),
  ('solucoes_exclusivas', 'Análise de Débitos com IA (v2)', 'Ferramenta inteligente para análise fiscal de débitos', 'https://an-lise-de-d-bitos-com-ia-v2-365727872947.us-west1.run.app', 'Brain', 2, true, 'embedded');