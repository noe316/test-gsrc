-- 관리자 계정 생성을 위한 SQL 스크립트
-- Supabase 대시보드의 SQL Editor에서 실행하세요.

-- 1. auth.users 테이블에 사용자 추가 (비밀번호는 자동으로 해시 처리되지 않으므로, 실제로는 Supabase Auth API를 통해 가입하는 것이 가장 좋습니다)
-- 하지만 개발 환경에서 빠르게 테스트하기 위해 아래와 같이 직접 삽입할 수 있습니다.
-- 주의: 이 방법은 'password'라는 비밀번호를 그대로 사용할 수 없으며, 암호화된 비밀번호 해시가 필요합니다.
-- 가장 쉬운 방법은 Supabase 대시보드 > Authentication > Users 에서 'Add User' 버튼을 클릭하여 사용자를 생성하는 것입니다.

-- 테스트용 계정 정보:
-- Email: admin@example.com
-- Password: password123

-- SQL로 직접 생성하기보다는 아래 절차를 따르는 것을 권장합니다:
-- 1. Supabase 대시보드 접속 (https://supabase.com/dashboard/project/_/auth/users)
-- 2. 'Add User' 버튼 클릭
-- 3. Email: admin@example.com 입력
-- 4. Password: password123 입력 (또는 원하는 비밀번호)
-- 5. 'Auto Confirm User' 체크
-- 6. 'Create User' 클릭

-- 만약 SQL로 권한 등을 관리해야 한다면 아래와 같이 profiles 테이블 등을 만들어서 관리할 수 있습니다.
-- 예시:
/*
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  role text default 'user'
);

-- 트리거를 통해 auth.users에 사용자가 생길 때마다 profiles에도 자동으로 추가되도록 설정
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
*/
