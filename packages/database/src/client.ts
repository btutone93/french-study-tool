import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './types'

export type { Database }
export type TypedSupabaseClient = SupabaseClient<Database>

export const createSupabaseClient = (
  supabaseUrl: string,
  supabaseKey: string
): TypedSupabaseClient => {
  return createClient<Database>(supabaseUrl, supabaseKey)
}