-- Contact form submissions + the admin dashboard's access rules.
-- Run this once in the Supabase SQL editor (Dashboard -> SQL Editor -> New query).
-- Safe to re-run: it only adds what is missing.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null,
  marketing_opt_in boolean not null default false,
  consent_text text not null,
  source text not null default 'contact-form',
  unsubscribed_at timestamptz
);

-- Dashboard columns (added separately so existing tables upgrade cleanly).
alter table public.contact_submissions
  add column if not exists status text not null default 'new',
  add column if not exists notes text,
  add column if not exists replied_at timestamptz,
  add column if not exists request_id uuid,
  add column if not exists phone text,
  add column if not exists organization text,
  add column if not exists project_type text,
  add column if not exists project_scope text,
  add column if not exists timeline text,
  add column if not exists budget_range text,
  add column if not exists selected_features text[] not null default '{}'::text[],
  add column if not exists base_currency text,
  add column if not exists display_currency text,
  add column if not exists exchange_rate numeric,
  add column if not exists estimate_min integer,
  add column if not exists estimate_max integer,
  add column if not exists care_plan text,
  add column if not exists monthly_price integer,
  add column if not exists pricing_version integer,
  add column if not exists pricing_snapshot jsonb,
  -- Salted SHA-256 of the submitting IP, written by the contact function. Used
  -- only to rate-limit repeat submissions; the raw address is never stored.
  add column if not exists ip_hash text;

-- Backs the rate-limit lookup: "how many rows from this hash in the last hour".
create index if not exists contact_submissions_ip_hash_recent_idx
  on public.contact_submissions (ip_hash, created_at desc);

create index if not exists contact_submissions_email_recent_idx
  on public.contact_submissions (email, created_at desc);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create unique index if not exists contact_submissions_request_id_idx
  on public.contact_submissions (request_id)
  where request_id is not null;

create index if not exists contact_submissions_project_type_idx
  on public.contact_submissions (project_type);

-- ---------------------------------------------------------------------------
-- Access control
-- ---------------------------------------------------------------------------
-- RLS is on. The Netlify function uses the service-role key and bypasses RLS to
-- insert new submissions. The dashboard uses the anon key as a signed-in user,
-- so we grant full access ONLY to the one admin email.
alter table public.contact_submissions enable row level security;

-- Set this to your dashboard email before running.
-- The policies below check the signed-in user's email against it.
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'tafara@mutsvedutafara.com'
$$;

drop policy if exists "admin reads submissions" on public.contact_submissions;
create policy "admin reads submissions"
  on public.contact_submissions for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admin updates submissions" on public.contact_submissions;
create policy "admin updates submissions"
  on public.contact_submissions for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admin deletes submissions" on public.contact_submissions;
create policy "admin deletes submissions"
  on public.contact_submissions for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Published calculator pricing
-- ---------------------------------------------------------------------------
-- The complete configuration lives in one JSON document so a dashboard publish
-- is atomic: visitors never see half-updated prices. Pricing is public by
-- design; only the authenticated admin can insert or update it.
create table if not exists public.pricing_config (
  id text primary key default 'default' check (id = 'default'),
  published_config jsonb not null check (jsonb_typeof(published_config) = 'object'),
  published_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

alter table public.pricing_config enable row level security;

-- Visitors only need the fixed row ID and published JSON. Keep admin audit
-- metadata out of the public API response.
revoke select on public.pricing_config from anon;
grant select (id, published_config) on public.pricing_config to anon;

drop policy if exists "public reads published pricing" on public.pricing_config;
create policy "public reads published pricing"
  on public.pricing_config for select
  to anon
  using (id = 'default');

drop policy if exists "admin reads published pricing" on public.pricing_config;
create policy "admin reads published pricing"
  on public.pricing_config for select
  to authenticated
  using (public.is_admin() and id = 'default');

drop policy if exists "admin inserts published pricing" on public.pricing_config;
create policy "admin inserts published pricing"
  on public.pricing_config for insert
  to authenticated
  with check (public.is_admin() and id = 'default');

drop policy if exists "admin updates published pricing" on public.pricing_config;
create policy "admin updates published pricing"
  on public.pricing_config for update
  to authenticated
  using (public.is_admin() and id = 'default')
  with check (public.is_admin() and id = 'default');

-- Convenience view: opted-in, not-unsubscribed contacts for marketing exports.
create or replace view public.marketing_audience as
  select distinct on (email) email, name, created_at
  from public.contact_submissions
  where marketing_opt_in = true and unsubscribed_at is null
  order by email, created_at desc;
