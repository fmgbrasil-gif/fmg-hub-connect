-- Política 1: Admins podem fazer tudo (criar, editar, excluir cards)
CREATE POLICY "Admins manage cards"
  ON public.managed_cards
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Política 2: Usuários autenticados podem ver cards ativos
CREATE POLICY "Authenticated users view active cards"
  ON public.managed_cards
  FOR SELECT
  USING (auth.role() = 'authenticated' AND is_active = true);