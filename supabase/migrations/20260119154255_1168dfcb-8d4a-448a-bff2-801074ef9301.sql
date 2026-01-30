-- Usar os valores existentes do enum
-- admin = equivalente a director (acesso total)
-- employee/viewer = acesso limitado

-- Atribuir role 'admin' (que funciona como director) ao usuário principal
INSERT INTO public.user_roles (user_id, role)
VALUES ('18286151-d49b-47ee-938d-ab89705c953e', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Atribuir role 'viewer' (acesso básico) aos outros usuários
INSERT INTO public.user_roles (user_id, role)
VALUES 
  ('7c395ab8-a7a5-450e-b825-9b12878cbeb2', 'viewer'),
  ('111a0545-72a6-4b96-ae94-c349dd873f73', 'viewer')
ON CONFLICT (user_id, role) DO NOTHING;