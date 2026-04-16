create table if not exists users (
  id text primary key,
  username text unique not null,
  current_challenge text
);

create table if not exists credentials (
  id text primary key,
  user_id text references users(id) on delete cascade,
  public_key bytea not null,
  counter integer not null default 0,
  device_type text,
  backed_up boolean default false,
  transports text[] default '{}'
);

create table if not exists admins (
  id text primary key,
  username text unique not null,
  password_hash text,
  current_challenge text
);

create table if not exists admin_credentials (
  id text primary key,
  admin_id text references admins(id) on delete cascade,
  public_key bytea not null,
  counter integer not null default 0,
  transports text[] default '{}'
);

create table if not exists user_data (
  user_id text primary key references users(id) on delete cascade,
  data jsonb,
  updated_at timestamptz default now()
);

create table if not exists global_exams (
  id uuid primary key default gen_random_uuid(),
  metadata jsonb,
  questions jsonb,
  created_at timestamptz default now()
);
