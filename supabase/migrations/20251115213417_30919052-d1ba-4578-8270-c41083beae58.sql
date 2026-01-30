-- Create user_favorites table
create table public.user_favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  item_type text not null,
  item_id text not null,
  item_name text not null,
  item_description text,
  item_url text,
  item_icon text,
  created_at timestamp with time zone default now(),
  unique(user_id, item_type, item_id)
);

-- Enable RLS
alter table public.user_favorites enable row level security;

-- RLS Policies
create policy "Users can view their own favorites"
  on public.user_favorites for select
  using (auth.uid() = user_id);

create policy "Users can insert their own favorites"
  on public.user_favorites for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own favorites"
  on public.user_favorites for delete
  using (auth.uid() = user_id);

-- Index for performance
create index idx_user_favorites_user_id on public.user_favorites(user_id);

-- Create custom_exclusive_tools table
create table public.custom_exclusive_tools (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  url text,
  icon text default 'Package',
  is_active boolean default true,
  display_order integer not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  created_by uuid references auth.users(id),
  unique(display_order)
);

-- Trigger for updated_at
create or replace function update_custom_tools_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_custom_tools_updated_at
  before update on public.custom_exclusive_tools
  for each row
  execute function update_custom_tools_updated_at();

-- Enable RLS
alter table public.custom_exclusive_tools enable row level security;

-- Anyone can view active custom tools
create policy "Anyone can view active custom tools"
  on public.custom_exclusive_tools for select
  using (is_active = true);

-- Directors can manage custom tools
create policy "Directors can manage custom tools"
  on public.custom_exclusive_tools for all
  using (has_role(auth.uid(), 'director'::app_role));

-- Index for ordering
create index idx_custom_tools_order on public.custom_exclusive_tools(display_order);

-- Insert 3 initial cards (inactive by default)
insert into public.custom_exclusive_tools (title, description, display_order, is_active)
values 
  ('Solução em Breve 1', 'Nova ferramenta exclusiva em desenvolvimento', 1, false),
  ('Solução em Breve 2', 'Nova ferramenta exclusiva em desenvolvimento', 2, false),
  ('Solução em Breve 3', 'Nova ferramenta exclusiva em desenvolvimento', 3, false);