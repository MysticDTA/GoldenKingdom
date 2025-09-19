import { createClient } from '@supabase/supabase-js'

const supabaseURL = process.env.NEXTPUBLICSUPABASE_URL!
const supabaseAnonKey = process.env.NEXTPUBLICSUPABASEANONKEY!

export const supabase = createClient(supabaseURL, supabaseAnonKey)
