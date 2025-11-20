// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Для Next.js используем NEXT_PUBLIC_ префикс для клиентских переменных
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

// Проверяем, что переменные существуют
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Supabase URL and Anon Key are required. Please check your .env file.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)