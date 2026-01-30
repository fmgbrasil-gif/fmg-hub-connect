-- Remover a constraint existente que limita os valores de card_type
ALTER TABLE public.managed_cards DROP CONSTRAINT IF EXISTS managed_cards_card_type_check;

-- Adicionar nova constraint com o valor acesso_gestao incluído
ALTER TABLE public.managed_cards ADD CONSTRAINT managed_cards_card_type_check 
  CHECK (card_type IN ('central_solucoes', 'base_conhecimento', 'dashboards', 'solucoes_exclusivas', 'acesso_gestao'));

-- Inserir cards iniciais para a página Acesso Gestão
INSERT INTO public.managed_cards (card_type, title, description, internal_path, icon, display_order, is_active, open_type)
VALUES 
  ('acesso_gestao', 'Base de Conhecimento', 'Tutoriais e processos dos departamentos', '/base-conhecimento', 'BookOpen', 1, true, 'internal'),
  ('acesso_gestao', 'Central de Soluções', 'Acesso rápido aos sistemas', '/central-solucoes', 'Wrench', 2, true, 'internal'),
  ('acesso_gestao', 'Dashboards', 'Análises e relatórios estratégicos', '/dashboards', 'BarChart3', 3, true, 'internal'),
  ('acesso_gestao', 'Soluções Exclusivas FMG', 'Ferramentas e recursos exclusivos', '/solucoes-exclusivas', 'Sparkles', 4, true, 'internal')
ON CONFLICT DO NOTHING;