import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import type { Session } from '@supabase/supabase-js';
import {
  BadgeDollarSign,
  Inbox as InboxIcon,
  LineChart,
  LogOut,
  Mail,
  Megaphone,
  RefreshCw,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { supabase, isSupabaseConfigured, ADMIN_EMAIL, type ContactSubmission } from '../../lib/supabase';
import Inbox from './Inbox';
import Marketing from './Marketing';
import Insights from './Insights';
import Pricing from './Pricing';
import { StatTile } from './ui';

type Tab = 'inbox' | 'pricing' | 'marketing' | 'insights';

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
};

const ConfigNotice = () => (
  <div className="flex min-h-screen items-center justify-center bg-stone-950 px-6 text-center">
    <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <ShieldAlert className="mx-auto mb-4 h-10 w-10 text-amber-400" />
      <h1 className="text-xl font-bold text-white">Dashboard not configured</h1>
      <p className="mt-3 text-sm leading-relaxed text-white/60">
        Set <code className="rounded bg-white/10 px-1.5 py-0.5">VITE_SUPABASE_URL</code>,{' '}
        <code className="rounded bg-white/10 px-1.5 py-0.5">VITE_SUPABASE_ANON_KEY</code> and{' '}
        <code className="rounded bg-white/10 px-1.5 py-0.5">VITE_ADMIN_EMAIL</code> in Netlify, then redeploy.
      </p>
    </div>
  </div>
);

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const sendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setState('sending');
    setError('');
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/admin` }
    });
    if (err) {
      setState('error');
      setError(err.message);
    } else {
      setState('sent');
    }
  };

  return (
    <div className="admin-shell flex min-h-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-emerald-300">
          <Sparkles size={13} /> Private dashboard
        </div>
        <h1 className="text-2xl font-bold text-white">Welcome back.</h1>
        <p className="mt-2 text-sm text-white/55">
          Enter your email and I'll send a one-time sign-in link. No passwords.
        </p>

        <AnimatePresence mode="wait">
          {state === 'sent' ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-center"
            >
              <Mail className="mx-auto mb-3 h-8 w-8 text-emerald-300" />
              <p className="text-sm font-medium text-white">Check your inbox</p>
              <p className="mt-1 text-xs text-white/60">Tap the link in the email to sign in. You can close this tab.</p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={sendLink} className="mt-6 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@mutsvedutafara.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-emerald-400/50"
              />
              <button
                type="submit"
                disabled={state === 'sending'}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 px-4 py-3 text-sm font-semibold text-stone-950 transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {state === 'sending' ? 'Sending link…' : 'Send sign-in link'}
              </button>
              {error && <p className="text-xs text-rose-300">{error}</p>}
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const AdminApp = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<Tab>('inbox');

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const email = session?.user?.email?.toLowerCase();
  const isAdmin = Boolean(email && (!ADMIN_EMAIL || email === ADMIN_EMAIL));

  const fetchSubmissions = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setSubmissions(data as ContactSubmission[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (session && isAdmin) fetchSubmissions();
  }, [session, isAdmin, fetchSubmissions]);

  const stats = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const total = submissions.length;
    const thisMonth = submissions.filter((s) => new Date(s.created_at).getTime() >= monthStart).length;
    const unreplied = submissions.filter((s) => s.status === 'new').length;
    const optedIn = submissions.filter((s) => s.marketing_opt_in && !s.unsubscribed_at).length;
    return { total, thisMonth, unreplied, optedIn };
  }, [submissions]);

  if (!isSupabaseConfigured) return <ConfigNotice />;
  if (!ready) {
    return (
      <div className="admin-shell flex min-h-screen items-center justify-center">
        <RefreshCw className="h-6 w-6 animate-spin text-white/40" />
      </div>
    );
  }
  if (!session) return <SignIn />;

  if (!isAdmin) {
    return (
      <div className="admin-shell flex min-h-screen items-center justify-center px-6 text-center">
        <div className="max-w-sm rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <ShieldAlert className="mx-auto mb-4 h-10 w-10 text-rose-400" />
          <h1 className="text-lg font-bold text-white">Not authorised</h1>
          <p className="mt-2 text-sm text-white/60">This account can't access the dashboard.</p>
          <button
            onClick={() => supabase?.auth.signOut()}
            className="mt-5 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm text-white hover:bg-white/20"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof InboxIcon }[] = [
    { id: 'inbox', label: 'Inbox', icon: InboxIcon },
    { id: 'pricing', label: 'Pricing', icon: BadgeDollarSign },
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
    { id: 'insights', label: 'Insights', icon: LineChart }
  ];

  return (
    <div className="admin-shell min-h-screen text-white">
      <Toaster position="top-right" toastOptions={{ style: { background: '#1c1917', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-300/70">{greeting()}</p>
            <h1 className="mt-1 text-2xl font-bold md:text-3xl">Tafara's command center</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchSubmissions}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
            <button
              onClick={() => supabase?.auth.signOut()}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10"
            >
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:grid-cols-4 md:gap-4">
          <StatTile label="Total enquiries" value={stats.total} accent="emerald" />
          <StatTile label="This month" value={stats.thisMonth} accent="teal" />
          <StatTile label="Awaiting reply" value={stats.unreplied} accent="amber" />
          <StatTile label="Marketing opt-ins" value={stats.optedIn} accent="blue" />
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-1 rounded-full border border-white/10 bg-white/5 p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                tab === t.id ? 'text-stone-950' : 'text-white/70 hover:text-white'
              }`}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="admin-tab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <t.icon size={16} className="relative" />
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {tab === 'inbox' && (
                <Inbox
                  submissions={submissions}
                  loading={loading}
                  accessToken={session.access_token}
                  onChanged={fetchSubmissions}
                />
              )}
              {tab === 'marketing' && <Marketing submissions={submissions} onChanged={fetchSubmissions} />}
              {tab === 'insights' && <Insights submissions={submissions} />}
              {tab === 'pricing' && <Pricing userId={session.user.id} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminApp;
