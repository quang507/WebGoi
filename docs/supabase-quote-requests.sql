create table if not exists public.quote_requests (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  source text not null check (source in ('gio', 'form')),
  ten text,
  sdt text not null,
  tinh text,
  ghichu text,
  items jsonb not null default '[]'::jsonb,
  page text,
  status text not null default 'moi' check (status in ('moi', 'da_goi', 'da_bao_gia', 'chot', 'huy')),
  note text
);
comment on table public.quote_requests is 'Yêu cầu báo giá từ web GÓI (giỏ báo giá + form báo giá nhanh). Chỉ hàm /api/bao-gia ghi bằng service role.';
alter table public.quote_requests enable row level security;
revoke all on public.quote_requests from anon, authenticated;
create index if not exists quote_requests_created_at_idx on public.quote_requests (created_at desc);
