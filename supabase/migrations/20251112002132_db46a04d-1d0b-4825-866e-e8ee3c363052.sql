-- Adicionar role de director para o usuário adriano@fmgbrasil.com.br
-- Primeiro, precisamos encontrar o user_id do usuário com este email

DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Buscar o user_id do email adriano@fmgbrasil.com.br
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = 'adriano@fmgbrasil.com.br';

  -- Se o usuário existe, adicionar a role de director
  IF v_user_id IS NOT NULL THEN
    -- Remover role anterior se existir (para evitar duplicatas)
    DELETE FROM public.user_roles
    WHERE user_id = v_user_id AND role = 'director';

    -- Inserir a role de director
    INSERT INTO public.user_roles (user_id, role)
    VALUES (v_user_id, 'director');

    RAISE NOTICE 'Role de director adicionada para adriano@fmgbrasil.com.br';
  ELSE
    RAISE NOTICE 'Usuário adriano@fmgbrasil.com.br não encontrado. O usuário precisa fazer login primeiro.';
  END IF;
END $$;