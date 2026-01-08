
import { createClient } from '@supabase/supabase-js';

// These should be environment variables in a real app, but for now we'll use placeholders
// that the user needs to replace or we can load from .env.local if present.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://obijleonxnpsgpmqcdik.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iaWpsZW9ueG5wc2dwbXFjZGlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNjM4NjEsImV4cCI6MjA4MTkzOTg2MX0.lTr2Px0wbwdTzww9NJAV4at6qh_85K6z_kGand2IvqU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
