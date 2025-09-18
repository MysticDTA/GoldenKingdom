import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase project URL
const supabaseUrl = https://bjyqsebouppdrgjnpblu.supabase.co 
// Replace with your actual Supabase anon public key
const supabaseAnonKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqeXFzZWJvdXBwZHJnam5wYmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNTc2MjMsImV4cCI6MjA3MzczMzYyM30.KoUAdz-rce4PbhFZdVn8R5HQMiQDzvjnICLwocZHc3A

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

