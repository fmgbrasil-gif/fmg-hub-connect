-- Fix overly permissive RLS policies - Directors only access for business tables

-- 1. COMPANIES TABLE
DROP POLICY IF EXISTS "Allow all companies" ON companies;
DROP POLICY IF EXISTS "Acesso público total Companies" ON companies;

CREATE POLICY "Directors can manage companies"
  ON companies FOR ALL
  USING (has_role(auth.uid(), 'director'::app_role))
  WITH CHECK (has_role(auth.uid(), 'director'::app_role));

-- 2. VEHICLES TABLE
DROP POLICY IF EXISTS "Allow all vehicles" ON vehicles;

CREATE POLICY "Directors can manage vehicles"
  ON vehicles FOR ALL
  USING (has_role(auth.uid(), 'director'::app_role))
  WITH CHECK (has_role(auth.uid(), 'director'::app_role));

-- 3. VEHICLE_DOCUMENTS TABLE
DROP POLICY IF EXISTS "Allow all documents" ON vehicle_documents;

CREATE POLICY "Directors can manage vehicle documents"
  ON vehicle_documents FOR ALL
  USING (has_role(auth.uid(), 'director'::app_role))
  WITH CHECK (has_role(auth.uid(), 'director'::app_role));

-- 4. VEHICLE_MOVEMENTS TABLE
DROP POLICY IF EXISTS "Allow all movements" ON vehicle_movements;

CREATE POLICY "Directors can manage vehicle movements"
  ON vehicle_movements FOR ALL
  USING (has_role(auth.uid(), 'director'::app_role))
  WITH CHECK (has_role(auth.uid(), 'director'::app_role));

-- 5. CUSTOMERS TABLE
DROP POLICY IF EXISTS "Allow all customers" ON customers;

CREATE POLICY "Directors can manage customers"
  ON customers FOR ALL
  USING (has_role(auth.uid(), 'director'::app_role))
  WITH CHECK (has_role(auth.uid(), 'director'::app_role));

-- 6. CUSTOMER_TRANSACTIONS TABLE
DROP POLICY IF EXISTS "Allow all transactions" ON customer_transactions;

CREATE POLICY "Directors can manage customer transactions"
  ON customer_transactions FOR ALL
  USING (has_role(auth.uid(), 'director'::app_role))
  WITH CHECK (has_role(auth.uid(), 'director'::app_role));

-- 7. APP_SETTINGS TABLE
DROP POLICY IF EXISTS "Allow all settings" ON app_settings;

CREATE POLICY "Directors can manage app settings"
  ON app_settings FOR ALL
  USING (has_role(auth.uid(), 'director'::app_role))
  WITH CHECK (has_role(auth.uid(), 'director'::app_role));

-- 8. ACCOUNTING_ENTRIES TABLE
DROP POLICY IF EXISTS "Acesso público total Accounting" ON accounting_entries;

CREATE POLICY "Directors can manage accounting entries"
  ON accounting_entries FOR ALL
  USING (has_role(auth.uid(), 'director'::app_role))
  WITH CHECK (has_role(auth.uid(), 'director'::app_role));

-- 9. BANK_TRANSACTIONS TABLE
DROP POLICY IF EXISTS "Acesso público total Bank" ON bank_transactions;

CREATE POLICY "Directors can manage bank transactions"
  ON bank_transactions FOR ALL
  USING (has_role(auth.uid(), 'director'::app_role))
  WITH CHECK (has_role(auth.uid(), 'director'::app_role));