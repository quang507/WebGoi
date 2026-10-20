-- GÓI · trang quản trị (/quan-tri): thêm trạng thái đơn, người sửa, lịch sử thay đổi.
-- Dán toàn bộ vào Supabase → project "Goi" → SQL Editor → Run. Chạy lại nhiều lần cũng không sao.

begin;

-- 1. Thêm 3 trạng thái sau khi chốt: đã cọc, đang in, đã giao
alter table public.quote_requests drop constraint if exists quote_requests_status_check;
alter table public.quote_requests add constraint quote_requests_status_check
  check (status in ('moi', 'da_goi', 'da_bao_gia', 'chot', 'da_coc', 'dang_in', 'da_giao', 'huy'));

-- 2. Ai sửa, sửa lúc nào
alter table public.quote_requests
  add column if not exists updated_at timestamptz,
  add column if not exists updated_by text;

-- 3. Lịch sử thay đổi của từng yêu cầu
create table if not exists public.quote_events (
  id bigint generated always as identity primary key,
  request_id bigint not null references public.quote_requests (id) on delete cascade,
  at timestamptz not null default now(),
  by text,
  status_from text,
  status_to text,
  tong bigint,
  ghi_chu text
);
comment on table public.quote_events is 'Lịch sử sửa yêu cầu báo giá (trigger tự ghi). Chỉ máy chủ (service role) đọc.';
create index if not exists quote_events_request_idx on public.quote_events (request_id, at desc);
alter table public.quote_events enable row level security;
revoke all on public.quote_events from anon, authenticated;

-- 4. Trigger: mỗi lần sửa thì đóng dấu giờ và ghi một dòng lịch sử (trạng thái, tổng tiền, sửa gì)
create or replace function public.quote_requests_log() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  t bigint;
  sua text[] := '{}';
begin
  new.updated_at := now();
  select coalesce(sum(
           coalesce((x ->> 'gia')::bigint, 0) *
           coalesce(nullif(regexp_replace(coalesce(x ->> 'sl', '0'), '\D', '', 'g'), '')::bigint, 0)), 0)
    into t
    from jsonb_array_elements(coalesce(new.items, '[]'::jsonb)) as x;
  if new.status is distinct from old.status then sua := sua || 'đổi trạng thái'::text; end if;
  if new.items is distinct from old.items then sua := sua || 'sửa giá'::text; end if;
  if new.note is distinct from old.note then sua := sua || 'sửa ghi chú'::text; end if;
  if array_length(sua, 1) > 0 then
    insert into public.quote_events (request_id, by, status_from, status_to, tong, ghi_chu)
    values (new.id, new.updated_by, old.status, new.status, t, array_to_string(sua, ', '));
  end if;
  return new;
end $$;
revoke execute on function public.quote_requests_log() from public, anon, authenticated;

drop trigger if exists quote_requests_log on public.quote_requests;
create trigger quote_requests_log before update on public.quote_requests
  for each row execute function public.quote_requests_log();

commit;

-- Kiểm tra sau khi chạy (kết quả phải là 3 dòng: updated_at, updated_by, và bảng quote_events có 0 dòng trở lên):
-- select column_name from information_schema.columns where table_name = 'quote_requests' and column_name like 'updated%';
-- select count(*) from public.quote_events;
