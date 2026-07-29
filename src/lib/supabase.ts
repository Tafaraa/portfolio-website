import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { ADMIN_EMAIL, isSupabaseConfigured, SUPABASE_ANON_KEY, SUPABASE_URL } from './site';

// Public, browser-safe values. The anon key is designed to be exposed; every
// table is protected by row-level security, so it only grants what the RLS
// policies allow (here: the signed-in admin reading their own submissions).
// The config itself lives in ./site so that modules which only need to *read*
// it don't drag the auth SDK into the public bundle.
export { ADMIN_EMAIL, isSupabaseConfigured };

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        // Auth callbacks are only ever parsed on the dashboard entry point.
        // The marketing site forwards them there before this client is even
        // constructed (see src/lib/authCallback.ts).
        detectSessionInUrl: true
      }
    })
  : null;

export type ContactStatus = 'new' | 'replied' | 'archived';

export type ContactPricingSnapshot = {
  currency?: string;
  displayCurrency?: { code: string; label: string; rate: number; locale: string };
  displayedEstimate?: { minimum: number; maximum: number; monthly: number } | null;
  project: { id: string; label: string };
  scope: { id: string; label: string };
  timeline: { id: string; label: string };
  budget: { id: string; label: string };
  carePlan: { id: string; label: string; monthlyPrice: number; hostingIncluded: boolean };
  features: { id: string; label: string; price: number }[];
};

export type ContactSubmission = {
  id: string;
  created_at: string;
  request_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  project_type: string | null;
  project_scope: string | null;
  timeline: string | null;
  budget_range: string | null;
  selected_features: string[] | null;
  base_currency: string | null;
  display_currency: string | null;
  exchange_rate: number | null;
  estimate_min: number | null;
  estimate_max: number | null;
  care_plan: string | null;
  monthly_price: number | null;
  pricing_version: number | null;
  pricing_snapshot: ContactPricingSnapshot | null;
  message: string;
  marketing_opt_in: boolean;
  consent_text: string | null;
  source: string | null;
  status: ContactStatus;
  notes: string | null;
  replied_at: string | null;
  unsubscribed_at: string | null;
};
