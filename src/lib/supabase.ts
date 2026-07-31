import { createClient } from "@supabase/supabase-js";

function getSupabaseUrl(): string {
  if (typeof process === "undefined") return "";
  return process.env.NEXT_PUBLIC_SUPABASE_URL || "";
}

function getAnonKey(): string {
  if (typeof process === "undefined") return "";
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
}

function getServiceKey(): string {
  if (typeof process === "undefined") return "";
  return process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

let _client: ReturnType<typeof createClient> | null = null;
let _adminClient: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!_client) {
    _client = createClient(getSupabaseUrl(), getAnonKey());
  }
  return _client;
}

function getAdminClient() {
  if (!_adminClient) {
    _adminClient = createClient(getSupabaseUrl(), getServiceKey());
  }
  return _adminClient;
}

// Supabase client (public anon key — RLS enforced)
export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_, prop) {
    return (getClient() as any)[prop];
  },
});

// Supabase admin client (service role — bypasses RLS, server-side only)
export const supabaseAdmin = new Proxy({} as ReturnType<typeof createClient>, {
  get(_, prop) {
    return (getAdminClient() as any)[prop];
  },
});
