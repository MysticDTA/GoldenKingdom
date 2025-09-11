import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://nusmpqkhjkehiikghhxg.supabase.co'
const SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51c21wcWtoamtlaGlpa2doaHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NzQ1NDEsImV4cCI6MjA3MzE1MDU0MX0.mqCZGJS3JdD33-9Sxh_5bQJnbnxl9hpfR9_sVdX7MOs
B95HKTJgc9NsQHBr

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
