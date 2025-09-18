import { createClient } from '@supabase/supabase-js';

// Paste your Project URL here
const supabaseURL = https://bjyqsebouppdrgjnpblu.supabase.co

// Paste your anon public key here
const supabaseAnonKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqeXFzZWJvdXBwZHJnam5wYmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNTc2MjMsImV4cCI6MjA3MzczMzYyM30.KoUAdz-rce4PbhFZdVn8R5HQMiQDzvjnICLwocZHc3A

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
