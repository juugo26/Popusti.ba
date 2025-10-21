import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Only create client if environment variables are properly set
export const supabase = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key'
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export interface CatalogData {
  id?: string
  title: string
  store: string
  category: string
  city: string
  valid_from: string
  valid_to: string
  cover_image_url?: string
  pdf_url?: string
  image_urls?: string[]
  is_featured?: boolean
  created_at?: string
  updated_at?: string
}

export interface NewsletterSubscription {
  id?: string
  email: string
  created_at?: string
}
