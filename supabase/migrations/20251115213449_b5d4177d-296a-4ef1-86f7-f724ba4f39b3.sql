-- Fix security warning: add search_path to update function
create or replace function update_custom_tools_updated_at()
returns trigger 
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;