import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseKey = 'public-anon-key'; 

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;