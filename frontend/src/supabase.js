import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "❌ Supabase URL or Anon Key is missing. Check your .env.local file."
  );
} else {
  console.log("✅ Supabase URL and Anon Key loaded.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

(async () => {
  try {
    console.log("🔄 Checking Supabase connection...");
    const { data, error } = await supabase.from("users").select("*").limit(1);
    if (error) throw error;
    console.log("✅ Supabase is connected! Sample data:", data);
  } catch (err) {
    console.error("❌ Supabase connection failed:", err.message);
  }
})();
