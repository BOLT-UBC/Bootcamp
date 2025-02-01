// Configuring Typescript to be properly set up for Vite
interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  