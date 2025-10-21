-- Create catalogs table
CREATE TABLE catalogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  store TEXT NOT NULL,
  category TEXT NOT NULL,
  city TEXT NOT NULL,
  valid_from DATE NOT NULL,
  valid_to DATE NOT NULL,
  cover_image_url TEXT,
  pdf_url TEXT,
  image_urls TEXT[],
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stores table
CREATE TABLE stores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create newsletter_subscriptions table
CREATE TABLE newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table for role management
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default stores
INSERT INTO stores (name) VALUES 
('Bingo'),
('Konzum'),
('Robot'),
('DM'),
('Techno Shop');

-- Insert default categories
INSERT INTO categories (name) VALUES 
('Namirnice'),
('Elektronika'),
('Kuća'),
('Kozmetika');

-- Create indexes for better performance
CREATE INDEX idx_catalogs_store ON catalogs(store);
CREATE INDEX idx_catalogs_category ON catalogs(category);
CREATE INDEX idx_catalogs_city ON catalogs(city);
CREATE INDEX idx_catalogs_valid_to ON catalogs(valid_to);
CREATE INDEX idx_catalogs_is_featured ON catalogs(is_featured);
CREATE INDEX idx_catalogs_created_at ON catalogs(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE catalogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to catalogs
CREATE POLICY "Public catalogs are viewable by everyone" ON catalogs
  FOR SELECT USING (true);

-- Create policies for newsletter subscriptions (anyone can insert)
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscriptions
  FOR INSERT WITH CHECK (true);

-- Create policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Create storage bucket for catalog files
INSERT INTO storage.buckets (id, name, public) VALUES ('catalog-files', 'catalog-files', true);

-- Create storage policies
CREATE POLICY "Public catalog files are viewable by everyone" ON storage.objects
  FOR SELECT USING (bucket_id = 'catalog-files');

CREATE POLICY "Anyone can upload catalog files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'catalog-files');

CREATE POLICY "Anyone can update catalog files" ON storage.objects
  FOR UPDATE USING (bucket_id = 'catalog-files');

-- Sample SQL to insert test admin user
-- Note: This should be run after the user is created in Supabase Auth
-- Replace 'USER_AUTH_ID_FROM_SUPABASE' with the actual auth.users.id from Supabase
/*
INSERT INTO users (id, email, role) VALUES 
('USER_AUTH_ID_FROM_SUPABASE', '3cigana@gmail.com', 'admin');
*/
