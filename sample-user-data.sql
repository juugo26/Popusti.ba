-- Sample SQL to insert test admin user
-- Run this after creating the user in Supabase Auth

-- Step 1: Create user in Supabase Auth (do this in Supabase Dashboard)
-- Email: 3cigana@gmail.com
-- Password: idegas222

-- Step 2: Get the user ID from auth.users table
-- SELECT id FROM auth.users WHERE email = '3cigana@gmail.com';

-- Step 3: Insert user into users table with admin role
-- Replace 'USER_AUTH_ID_FROM_SUPABASE' with the actual ID from step 2
INSERT INTO users (id, email, role) VALUES 
('USER_AUTH_ID_FROM_SUPABASE', '3cigana@gmail.com', 'admin');

-- Alternative: If you want to create the user programmatically, you can use:
-- INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, created_at, updated_at)
-- VALUES ('3cigana@gmail.com', crypt('idegas222', gen_salt('bf')), NOW(), NOW(), NOW());
-- 
-- Then get the ID and insert into users table:
-- INSERT INTO users (id, email, role) 
-- SELECT id, email, 'admin' FROM auth.users WHERE email = '3cigana@gmail.com';
