-- Add RLS policies for customer_transactions table
-- This table contains sensitive financial data and needs proper access control

-- Ensure RLS is enabled (should already be, but adding for safety)
ALTER TABLE public.customer_transactions ENABLE ROW LEVEL SECURITY;

-- Admins can manage all customer transactions
CREATE POLICY "Admins manage customer transactions"
  ON public.customer_transactions
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Financial staff can manage all customer transactions
CREATE POLICY "Financial staff manage customer transactions"
  ON public.customer_transactions
  FOR ALL
  USING (public.has_financial_access(auth.uid()))
  WITH CHECK (public.has_financial_access(auth.uid()));

-- Viewers can only view customer transactions
CREATE POLICY "Viewers can view customer transactions"
  ON public.customer_transactions
  FOR SELECT
  USING (public.has_role(auth.uid(), 'viewer'::app_role));