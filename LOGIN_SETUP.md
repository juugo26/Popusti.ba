# Login Setup Instructions

This document explains how to set up the Supabase login functionality for the popustiba application.

## Prerequisites

1. A Supabase project created at [supabase.com](https://supabase.com)
2. Your Supabase project URL and anon key

## Setup Steps

### 1. Environment Configuration

Create a `.env.local` file in the root directory with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Setup

Run the SQL commands from `database-schema.sql` in your Supabase SQL editor to create the necessary tables and policies.

### 3. Create Test User

#### Option A: Using Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to Authentication > Users
3. Click "Add user" and create a user with:
   - Email: `3cigana@gmail.com`
   - Password: `banankomali123`
4. Copy the user ID from the created user
5. Run the SQL from `sample-user-data.sql` in the SQL editor, replacing `USER_AUTH_ID_FROM_SUPABASE` with the actual user ID

#### Option B: Using SQL (Advanced)
Run the complete SQL from `sample-user-data.sql` in your Supabase SQL editor.

### 4. Test the Login

1. Start your development server: `npm run dev`
2. Navigate to `/login`
3. Use the test credentials:
   - Email: `3cigana@gmail.com`
   - Password: `idegas222`

## Features

- ✅ Email/password authentication using Supabase Auth
- ✅ Admin role checking from users table
- ✅ Success/error message display
- ✅ Responsive form with max width of 400px
- ✅ Centered layout
- ✅ Form validation
- ✅ Loading states

## Database Schema

The `users` table structure:
```sql
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Security

- Row Level Security (RLS) is enabled on the users table
- Users can only view and update their own data
- Admin role is checked on every authentication state change
