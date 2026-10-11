-- Run in Supabase SQL Editor. NEVER expose service-role key to browser.
create extension if not exists pgcrypto;
create type public.membership_status as enum ('applicant','identity_verified','professional_review','approved','rejected','suspended');
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null default '', bio text not null default '', city text not null default '',
 relationship_goal text not null default '', professional_category text not null default '',
 status public.membership_status not null default 'applicant',
 identity_verified_at timestamptz, professional_verified_at timestamptz, approved_at timestamptz,
 visible boolean not null default false, created_at timestamptz not null default now(),
 constraint profile_text_lengths check (char_length(display_name)<=100 and char_length(bio)<=2000 and char_length(city)<=100)
);
create table public.applications (
 id uuid primary key default gen_random_uuid(), user_id uuid not null unique references auth.users(id) on delete cascade,
 professional_summary text not null, motivation text not null, submitted_at timestamptz not null default now(),
 constraint application_lengths check(char_length(professional_summary)<=4000 and char_length(motivation)<=4000)
);
create table public.review_events (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id),
 reviewer_id uuid references auth.users(id), event text not null, note text not null default '', created_at timestamptz not null default now()
);
create table public.staff (user_id uuid primary key references auth.users(id) on delete cascade, role text not null check(role in ('reviewer','admin')));
create table public.introductions (
 id uuid primary key default gen_random_uuid(), member_a uuid not null references public.profiles(id),
 member_b uuid not null references public.profiles(id), created_at timestamptz not null default now(),
 accepted_a boolean not null default false, accepted_b boolean not null default false,
 unique(member_a,member_b), check(member_a<>member_b)
);
create table public.messages (
 id uuid primary key default gen_random_uuid(), introduction_id uuid not null references public.introductions(id) on delete cascade,
 sender_id uuid not null references public.profiles(id), body text not null,
 created_at timestamptz not null default now(), constraint body_length check(char_length(body) between 1 and 4000)
);
create index on public.messages(introduction_id,created_at);
create index on public.introductions(member_a);
create index on public.introductions(member_b);
create function public.is_staff() returns boolean language sql stable security definer set search_path=public as $$select exists(select 1 from public.staff where user_id=auth.uid())$$;
create function public.is_approved() returns boolean language sql stable security definer set search_path=public as $$select exists(select 1 from public.profiles where id=auth.uid() and status='approved')$$;
create function public.can_message(intro_id uuid) returns boolean language sql stable security definer set search_path=public as $$select exists(select 1 from public.introductions i where i.id=intro_id and (i.member_a=auth.uid() or i.member_b=auth.uid()) and i.accepted_a and i.accepted_b and public.is_approved() and exists(select 1 from public.profiles p where p.id=case when i.member_a=auth.uid() then i.member_b else i.member_a end and p.status='approved'))$$;
alter table public.profiles enable row level security;
alter table public.applications enable row level security;
alter table public.review_events enable row level security;
alter table public.staff enable row level security;
alter table public.introductions enable row level security;
alter table public.messages enable row level security;
create policy profiles_read on public.profiles for select to authenticated using (id=auth.uid() or public.is_staff() or (status='approved' and visible and public.is_approved()));
-- Profile updates go through a dedicated server endpoint or admin workflow; users cannot alter verification fields.
create policy applications_read on public.applications for select to authenticated using(user_id=auth.uid() or public.is_staff());
create policy reviews_staff on public.review_events for select to authenticated using(public.is_staff());
create policy staff_self on public.staff for select to authenticated using(user_id=auth.uid());
create policy intros_read on public.introductions for select to authenticated using((member_a=auth.uid() or member_b=auth.uid()) and public.is_approved());
create policy messages_read on public.messages for select to authenticated using(public.can_message(introduction_id));
create policy messages_insert on public.messages for insert to authenticated with check(sender_id=auth.uid() and public.can_message(introduction_id));
-- No direct client writes for applications, profiles, introductions or reviews. API routes validate access.
