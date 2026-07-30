import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import type { Session } from '@supabase/supabase-js';
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  Inbox as InboxIcon,
  KeyRound,
  LineChart,
  Lock,
  LogOut,
  Mail,
  Megaphone,
  RefreshCw,
  ShieldAlert
} from 'lucide-react';
import { supabase, isSupabaseConfigured, ADMIN_EMAIL, type ContactSubmission } from '../../lib/supabase';
import { authRedirectOrigin, DASHBOARD_PATH } from '../../lib/site';
import { consumeAuthCallbackError } from '../../lib/authCallback';
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

// The public site is a different document, so this is a real navigation rather
// than a router link.
const BackToSite = ({ className = '' }: { className?: string }) => (
  <a
    href="/"
    className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 ${className}`}
  >
    <ArrowLeft size={15} aria-hidden="true" /> Back to site
  </a>
);

// Supabase reports a consumed, mistyped or timed-out link the same way. The
// raw wording ("Email link is invalid or has expired") reads like a bug, so say
// what actually happened and what to do about it.
const describeCallbackError = (code: string, message: string) => {
  if (code === 'otp_expired' || /expired|invalid/i.test(message)) {
    return 'That sign-in link is no longer valid. Links are single-use and time out, and some email clients open them once while scanning. Send a fresh one — the same email carries a code you can type in instead.';
  }
  if (code === 'access_denied') return 'That sign-in attempt was rejected. Send a fresh link and try again.';
  return message;
};

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'verifying' | 'error'>('idle');
  const [error, setError] = useState('');

  // A link that failed carries its reason in the URL. Read it once, then wipe
  // it from the address bar so refreshing doesn't replay a stale message.
  useEffect(() => {
    const failure = consumeAuthCallbackError();
    if (failure) {
      setState('error');
      setError(describeCallbackError(failure.code, failure.message));
    }
  }, []);

  const sendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setState('sending');
    setError('');
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      // Never window.location.origin: the apex domain 301s to www, which
      // breaks the round trip. authRedirectOrigin() pins production to the
      // canonical host while leaving localhost and deploy previews alone.
      options: { emailRedirectTo: `${authRedirectOrigin()}${DASHBOARD_PATH}` }
    });
    if (err) {
      setState('error');
      setError(err.message);
    } else {
      setState('sent');
    }
  };

  // Same email, no link to click. Immune to scanners that follow links and to
  // any redirect misconfiguration, which makes it the reliable way in when the
  // link round trip misbehaves.
  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setState('verifying');
    setError('');
    const { error: err } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: 'email'
    });
    if (err) {
      setState('sent');
      setError(err.message);
    }
    // On success onAuthStateChange swaps this screen for the dashboard.
  };

  return (
    <div className="admin-shell flex min-h-screen items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8">
          {/* Brand mark + private-area label */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
              <Lock size={17} aria-hidden="true" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300/70">
                Private area
              </p>
              <p className="text-sm font-semibold text-white">Command center</p>
            </div>
          </div>

          <h1 className="mt-7 text-xl font-bold text-white">Welcome back, Tafara.</h1>
          <p className="mt-1.5 text-sm leading-relaxed text-white/55">
            Enter your email and I'll send a one-time sign-in link. No passwords to remember.
          </p>

          <AnimatePresence mode="wait">
            {state === 'sent' || state === 'verifying' ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 space-y-4"
              >
                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-center">
                  <Mail className="mx-auto mb-3 h-7 w-7 text-emerald-300" aria-hidden="true" />
                  <p className="text-sm font-semibold text-white">Check your inbox</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    Tap the link to sign in, or enter the code from the same email below.
                  </p>
                </div>

                {/* The code path needs no redirect and no link for a scanner to
                    consume, so it works even when the link round trip fails. */}
                <form onSubmit={verifyCode} className="space-y-3">
                  <label htmlFor="admin-code" className="block text-xs font-medium text-white/60">
                    Sign-in code
                  </label>
                  <div className="relative">
                    <KeyRound
                      size={16}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35"
                      aria-hidden="true"
                    />
                    <input
                      id="admin-code"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 8))}
                      placeholder="123456"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm tracking-[0.3em] text-white placeholder-white/25 outline-none transition-colors focus:border-emerald-400/60 focus:bg-white/[0.07]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={state === 'verifying' || code.length < 6}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-stone-950 transition-colors hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {state === 'verifying' ? (
                      <>
                        <RefreshCw size={15} className="animate-spin" aria-hidden="true" />
                        Checking…
                      </>
                    ) : (
                      <>
                        Sign in with code
                        <ArrowRight size={15} aria-hidden="true" />
                      </>
                    )}
                  </button>
                  {error && (
                    <p className="flex items-start gap-1.5 text-xs text-rose-300">
                      <ShieldAlert size={14} className="mt-px shrink-0" aria-hidden="true" />
                      <span>{error}</span>
                    </p>
                  )}
                </form>

                <button
                  type="button"
                  onClick={() => {
                    setState('idle');
                    setCode('');
                    setError('');
                  }}
                  className="w-full text-center text-xs text-white/45 underline underline-offset-4 transition-colors hover:text-white/70"
                >
                  Use a different email or send another link
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={sendLink} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="admin-email" className="mb-1.5 block text-xs font-medium text-white/60">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35"
                      aria-hidden="true"
                    />
                    <input
                      id="admin-email"
                      type="email"
                      required
                      autoFocus
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@mutsvedutafara.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-emerald-400/60 focus:bg-white/[0.07]"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-stone-950 transition-colors hover:bg-emerald-300 disabled:cursor-wait disabled:opacity-60"
                >
                  {state === 'sending' ? (
                    <>
                      <RefreshCw size={15} className="animate-spin" aria-hidden="true" />
                      Sending link…
                    </>
                  ) : (
                    <>
                      Send sign-in link
                      <ArrowRight size={15} aria-hidden="true" />
                    </>
                  )}
                </button>
                {error && (
                  <p className="flex items-start gap-1.5 text-xs text-rose-300">
                    <ShieldAlert size={14} className="mt-px shrink-0" aria-hidden="true" />
                    <span>{error}</span>
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-5 flex flex-col items-center gap-3">
          <BackToSite />
          <p className="text-center text-xs text-white/35">Protected area · authorised access only</p>
        </div>
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
          <div className="mt-5 flex items-center justify-center gap-2">
            <BackToSite />
            <button
              onClick={() => supabase?.auth.signOut()}
              className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm text-white hover:bg-white/20"
            >
              Sign out
            </button>
          </div>
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
          <div className="flex flex-wrap items-center gap-2">
            <BackToSite />
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

        {/* Tabs. Four labelled tabs in one row need ~430px, so on a phone they
            wrap to 2x2 and the pill container squares off to match. */}
        <div className="mt-8 grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-white/5 p-1 sm:flex sm:rounded-full">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative flex min-w-0 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors sm:flex-1 sm:rounded-full sm:px-4 ${
                tab === t.id ? 'text-stone-950' : 'text-white/70 hover:text-white'
              }`}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="admin-tab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 sm:rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <t.icon size={16} className="relative shrink-0" />
              <span className="relative truncate">{t.label}</span>
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
