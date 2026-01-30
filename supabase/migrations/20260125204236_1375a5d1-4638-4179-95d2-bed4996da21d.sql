-- Add RLS policies for all tables that have RLS enabled but no policies
-- Based on the application's role-based access model

-- =====================================================
-- ADMIN-ONLY TABLES (business configuration/management)
-- =====================================================

-- accounting_entries: Financial data - admin only
CREATE POLICY "Admins manage accounting entries"
  ON public.accounting_entries FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- ai_settings: System configuration - admin only
CREATE POLICY "Admins manage AI settings"
  ON public.ai_settings FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- app_settings: System configuration - admin only
CREATE POLICY "Admins manage app settings"
  ON public.app_settings FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- bank_transactions: Financial data - admin only
CREATE POLICY "Admins manage bank transactions"
  ON public.bank_transactions FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- companies: Company configuration - admin only
CREATE POLICY "Admins manage companies"
  ON public.companies FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- contacts: Contact management - admin only
CREATE POLICY "Admins manage contacts"
  ON public.contacts FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- customers: Customer data - admin only
CREATE POLICY "Admins manage customers"
  ON public.customers FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- data_sources: Data configuration - admin only
CREATE POLICY "Admins manage data sources"
  ON public.data_sources FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- departments: Organization structure - admin only
CREATE POLICY "Admins manage departments"
  ON public.departments FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- imports: Data import management - admin only
CREATE POLICY "Admins manage imports"
  ON public.imports FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- people: People management - admin only
CREATE POLICY "Admins manage people"
  ON public.people FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- services: Service management - admin only
CREATE POLICY "Admins manage services"
  ON public.services FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- signup_requests: User registration requests - admin only
CREATE POLICY "Admins manage signup requests"
  ON public.signup_requests FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- custom_exclusive_tools: Admin tool management
CREATE POLICY "Admins manage custom tools"
  ON public.custom_exclusive_tools FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users view active custom tools"
  ON public.custom_exclusive_tools FOR SELECT
  USING (auth.role() = 'authenticated' AND is_active = true);

-- =====================================================
-- VEHICLE TABLES (admin only - business data)
-- =====================================================

CREATE POLICY "Admins manage vehicles"
  ON public.vehicles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins manage vehicle documents"
  ON public.vehicle_documents FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins manage vehicle movements"
  ON public.vehicle_movements FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- =====================================================
-- TAX/FISCAL REFERENCE TABLES (read for authenticated, admin manages)
-- =====================================================

-- cclasstrib_items
CREATE POLICY "Admins manage cclasstrib"
  ON public.cclasstrib_items FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users read cclasstrib"
  ON public.cclasstrib_items FOR SELECT
  USING (auth.role() = 'authenticated');

-- ccredpres_items
CREATE POLICY "Admins manage ccredpres"
  ON public.ccredpres_items FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users read ccredpres"
  ON public.ccredpres_items FOR SELECT
  USING (auth.role() = 'authenticated');

-- cnae_items
CREATE POLICY "Admins manage cnae"
  ON public.cnae_items FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users read cnae"
  ON public.cnae_items FOR SELECT
  USING (auth.role() = 'authenticated');

-- cst_items
CREATE POLICY "Admins manage cst"
  ON public.cst_items FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users read cst"
  ON public.cst_items FOR SELECT
  USING (auth.role() = 'authenticated');

-- lc116_items
CREATE POLICY "Admins manage lc116"
  ON public.lc116_items FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users read lc116"
  ON public.lc116_items FOR SELECT
  USING (auth.role() = 'authenticated');

-- nbs_items
CREATE POLICY "Admins manage nbs"
  ON public.nbs_items FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users read nbs"
  ON public.nbs_items FOR SELECT
  USING (auth.role() = 'authenticated');

-- ncm_items
CREATE POLICY "Admins manage ncm"
  ON public.ncm_items FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users read ncm"
  ON public.ncm_items FOR SELECT
  USING (auth.role() = 'authenticated');

-- nbs_lc116_correlations
CREATE POLICY "Admins manage nbs_lc116 correlations"
  ON public.nbs_lc116_correlations FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users read nbs_lc116 correlations"
  ON public.nbs_lc116_correlations FOR SELECT
  USING (auth.role() = 'authenticated');

-- ncm_cclasstrib_correlations
CREATE POLICY "Admins manage ncm_cclasstrib correlations"
  ON public.ncm_cclasstrib_correlations FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users read ncm_cclasstrib correlations"
  ON public.ncm_cclasstrib_correlations FOR SELECT
  USING (auth.role() = 'authenticated');

-- pdf_chunks (knowledge base)
CREATE POLICY "Admins manage pdf chunks"
  ON public.pdf_chunks FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users read pdf chunks"
  ON public.pdf_chunks FOR SELECT
  USING (auth.role() = 'authenticated');

-- =====================================================
-- CORRELATION TABLES (user-specific data)
-- =====================================================

-- correlation_queries
CREATE POLICY "Users manage own correlation queries"
  ON public.correlation_queries FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins manage all correlation queries"
  ON public.correlation_queries FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- correlation_suggestions
CREATE POLICY "Users read suggestions for own queries"
  ON public.correlation_suggestions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.correlation_queries cq 
      WHERE cq.id = correlation_suggestions.query_id 
      AND cq.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins manage all correlation suggestions"
  ON public.correlation_suggestions FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- correlation_decisions
CREATE POLICY "Users manage own correlation decisions"
  ON public.correlation_decisions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins manage all correlation decisions"
  ON public.correlation_decisions FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- =====================================================
-- USER-SPECIFIC TABLES
-- =====================================================

-- profiles: Users can view all profiles but only update their own
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "System can insert profiles"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- user_favorites: User-specific data
CREATE POLICY "Users manage own favorites"
  ON public.user_favorites FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);