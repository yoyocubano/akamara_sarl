
import { createClient } from '@supabase/supabase-js';

// These should be environment variables in a real app, but for now we'll use placeholders
// that the user needs to replace or we can load from .env.local if present.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
