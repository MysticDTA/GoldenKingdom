import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase project URL
const supabaseUrl = 'https://bjyqsebouppdrgjnpblu.supabase.co';

// Replace with your actual Supabase anon public key
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

// Create the client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
