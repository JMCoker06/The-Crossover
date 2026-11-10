create table if not exists posts (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  title       text not null check (char_length(trim(title)) > 0),
  body        text,
  image_url   text,
  video_url   text,
  upvotes     integer not null default 0,
  flags       text[] not null default '{}',
  secret_key  text,
  repost_id   bigint references posts(id) on delete set null
);

create table if not exists comments (
  id          bigint generated always as identity primary key,
  post_id     bigint not null references posts(id) on delete cascade,
  created_at  timestamptz not null default now(),
  content     text not null check (char_length(trim(content)) > 0),
  secret_key  text
);

create index if not exists posts_created_at_idx on posts (created_at desc);
create index if not exists posts_upvotes_idx on posts (upvotes desc);
create index if not exists comments_post_id_idx on comments (post_id);

-- No real auth in this project, so the anon key can read and write.
alter table posts enable row level security;
alter table comments enable row level security;

create policy "posts are public"     on posts for select using (true);
create policy "posts can be added"   on posts for insert with check (true);
create policy "posts can be edited"  on posts for update using (true);
create policy "posts can be removed" on posts for delete using (true);

create policy "comments are public"     on comments for select using (true);
create policy "comments can be added"   on comments for insert with check (true);
create policy "comments can be removed" on comments for delete using (true);