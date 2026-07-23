import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  Check,
  Loader,
  MessageCircle,
  Search,
  Send,
  Trash2
} from 'lucide-react';
import { supabase, type ContactStatus, type ContactSubmission } from '../../lib/supabase';
import {
  BUDGET_OPTIONS,
  CARE_PLANS,
  FEATURE_OPTIONS,
  PROJECT_TYPES,
  SCOPE_OPTIONS,
  TIMELINE_OPTIONS,
  formatMoney,
  getOptionLabel
} from '../../lib/quoteCalculator';
import { GlassCard, StatusBadge, formatDate, formatDateTime } from './ui';

type Props = {
  submissions: ContactSubmission[];
  loading: boolean;
  accessToken: string;
  onChanged: () => void;
};

const STATUS_FILTERS: (ContactStatus | 'all')[] = ['all', 'new', 'replied', 'archived'];

const Inbox = ({ submissions, loading, accessToken, onChanged }: Props) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ContactStatus | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [replySubject, setReplySubject] = useState('');
  const [replyBody, setReplyBody] = useState('');
  const [sending, setSending] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return submissions.filter((s) => {
      if (statusFilter !== 'all' && s.status !== statusFilter) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        (s.organization ?? '').toLowerCase().includes(q) ||
        (s.project_type ?? '').toLowerCase().includes(q) ||
        s.message.toLowerCase().includes(q)
      );
    });
  }, [submissions, search, statusFilter]);

  const selected = submissions.find((s) => s.id === selectedId) ?? null;

  const openDetail = (s: ContactSubmission) => {
    setSelectedId(s.id);
    setNotesDraft(s.notes ?? '');
    setReplySubject(`Re: your message to Tafara Mutsvedu`);
    setReplyBody('');
  };

  const patch = async (id: string, fields: Partial<ContactSubmission>) => {
    if (!supabase) return;
    const { error } = await supabase.from('contact_submissions').update(fields).eq('id', id);
    if (error) toast.error(error.message);
    else onChanged();
  };

  const setStatus = (status: ContactStatus) => selected && patch(selected.id, { status });

  const saveNotes = () => selected && patch(selected.id, { notes: notesDraft }).then(() => toast.success('Notes saved'));

  const remove = async () => {
    if (!selected || !supabase) return;
    if (!window.confirm(`Delete the enquiry from ${selected.name}? This cannot be undone.`)) return;
    const { error } = await supabase.from('contact_submissions').delete().eq('id', selected.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Enquiry deleted');
    setSelectedId(null);
    onChanged();
  };

  const sendReply = async () => {
    if (!selected) return;
    if (replyBody.trim().length < 1) {
      toast.error('Write a reply first.');
      return;
    }
    setSending(true);
    try {
      const res = await fetch('/api/admin-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({
          to: selected.email,
          name: selected.name,
          subject: replySubject,
          message: replyBody
        })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? 'Failed to send reply.');
      }
      toast.success(`Reply sent to ${selected.name}`);
      setReplyBody('');
      await patch(selected.id, { status: 'replied', replied_at: new Date().toISOString() });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send reply.');
    } finally {
      setSending(false);
    }
  };

  const waLink = selected
    ? `https://wa.me/${(selected.phone ?? '').replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${selected.name}, thanks for reaching out via mutsvedutafara.com.`)}`
    : '#';

  const baseCurrency = selected?.pricing_snapshot?.currency ?? selected?.base_currency ?? 'ZAR';
  const baseLocale = baseCurrency === 'ZAR' ? 'en-ZA' : 'en-US';
  const estimateLabel =
    selected?.estimate_min && selected?.estimate_max
      ? `${formatMoney(selected.estimate_min, baseCurrency, baseLocale)} to ${formatMoney(
          selected.estimate_max,
          baseCurrency,
          baseLocale
        )}`
      : 'Needs scoping';
  const convertedEstimate = selected?.pricing_snapshot?.displayedEstimate;
  const selectedDisplayCurrency = selected?.pricing_snapshot?.displayCurrency;
  const convertedEstimateLabel =
    convertedEstimate && selectedDisplayCurrency && selectedDisplayCurrency.code !== baseCurrency
      ? `${formatMoney(
          convertedEstimate.minimum,
          selectedDisplayCurrency.code,
          selectedDisplayCurrency.locale
        )} to ${formatMoney(
          convertedEstimate.maximum,
          selectedDisplayCurrency.code,
          selectedDisplayCurrency.locale
        )}`
      : null;

  return (
    <div>
      {/* Search + filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, or message…"
            className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 outline-none focus:border-emerald-400/40"
          />
        </div>
        <div className="flex gap-1 rounded-full border border-white/10 bg-white/5 p-1">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                statusFilter === f ? 'bg-white text-stone-950' : 'text-white/60 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        {/* List */}
        <div className={selected ? 'hidden lg:block' : ''}>
          <GlassCard className="divide-y divide-white/5 overflow-hidden">
            {loading && filtered.length === 0 && (
              <div className="p-8 text-center text-sm text-white/40">Loading…</div>
            )}
            {!loading && filtered.length === 0 && (
              <div className="p-8 text-center text-sm text-white/40">No enquiries match.</div>
            )}
            {filtered.map((s) => (
              <button
                key={s.id}
                onClick={() => openDetail(s)}
                className={`flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-white/5 ${
                  selectedId === s.id ? 'bg-white/[0.07]' : ''
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400/30 to-teal-400/20 text-sm font-bold text-emerald-200">
                  {s.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-white">{s.name}</p>
                    <span className="shrink-0 text-[11px] text-white/40">{formatDate(s.created_at)}</span>
                  </div>
                  <p className="truncate text-xs text-white/50">{s.email}</p>
                  <p className="mt-1 line-clamp-1 text-xs text-white/40">{s.message}</p>
                </div>
                <div className="shrink-0">
                  {s.status === 'new' && <span className="block h-2 w-2 rounded-full bg-amber-400" />}
                </div>
              </button>
            ))}
          </GlassCard>
        </div>

        {/* Detail */}
        <div className={!selected ? 'hidden lg:block' : ''}>
          {!selected ? (
            <GlassCard className="flex h-full min-h-[300px] items-center justify-center p-8 text-center text-sm text-white/40">
              Select an enquiry to read and reply.
            </GlassCard>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard className="overflow-hidden">
                <div className="flex items-start justify-between gap-3 border-b border-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedId(null)}
                      className="rounded-full p-1.5 text-white/60 hover:bg-white/10 lg:hidden"
                      aria-label="Back to list"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <div>
                      <h3 className="text-lg font-bold text-white">{selected.name}</h3>
                      <a href={`mailto:${selected.email}`} className="text-sm text-emerald-300 hover:underline">
                        {selected.email}
                      </a>
                    </div>
                  </div>
                  <StatusBadge status={selected.status} />
                </div>

                <div className="space-y-5 p-5">
                  <p className="text-[11px] text-white/40">Received {formatDateTime(selected.created_at)}</p>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {[
                      [
                        'Project',
                        selected.pricing_snapshot?.project.label ??
                          getOptionLabel(PROJECT_TYPES, selected.project_type)
                      ],
                      [
                        'Scope',
                        selected.pricing_snapshot?.scope.label ??
                          getOptionLabel(SCOPE_OPTIONS, selected.project_scope)
                      ],
                      [
                        'Timeline',
                        selected.pricing_snapshot?.timeline.label ??
                          getOptionLabel(TIMELINE_OPTIONS, selected.timeline)
                      ],
                      [
                        'Budget',
                        selected.pricing_snapshot?.budget.label ??
                          getOptionLabel(BUDGET_OPTIONS, selected.budget_range)
                      ],
                      ['Planning range', estimateLabel],
                      ...(convertedEstimateLabel
                        ? [['Visitor conversion', convertedEstimateLabel]]
                        : []),
                      [
                        'Hosting & care',
                        selected.pricing_snapshot?.carePlan.label ??
                          getOptionLabel(CARE_PLANS, selected.care_plan)
                      ],
                      [
                        'Monthly',
                        selected.monthly_price
                          ? `${formatMoney(selected.monthly_price, baseCurrency, baseLocale)} / month`
                          : 'Not included'
                      ],
                      ['Organisation', selected.organization || 'Not provided']
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
                        <p className="text-[10px] uppercase tracking-wider text-white/35">{label}</p>
                        <p className="mt-0.5 text-sm font-medium text-white/80">{value}</p>
                      </div>
                    ))}
                  </div>

                  {selected.selected_features && selected.selected_features.length > 0 && (
                    <div>
                      <p className="mb-2 text-[10px] uppercase tracking-wider text-white/35">Selected extras</p>
                      <div className="flex flex-wrap gap-2">
                        {selected.selected_features.map((featureId) => (
                          <span
                            key={featureId}
                            className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-100"
                          >
                            {selected.pricing_snapshot?.features.find((feature) => feature.id === featureId)
                              ?.label ?? getOptionLabel(FEATURE_OPTIONS, featureId)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {(selected.phone || selected.organization) && (
                    <div className="text-sm text-white/60">
                      {selected.phone && (
                        <a href={`tel:${selected.phone}`} className="text-emerald-300 hover:underline">
                          {selected.phone}
                        </a>
                      )}
                    </div>
                  )}

                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-sm leading-relaxed text-white/80 whitespace-pre-wrap">
                    {selected.message}
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className={`rounded-full border px-2.5 py-1 ${selected.marketing_opt_in ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200' : 'border-white/10 bg-white/5 text-white/50'}`}>
                      {selected.marketing_opt_in ? 'Opted in to marketing' : 'No marketing opt-in'}
                    </span>
                    {selected.replied_at && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-white/50">
                        Replied {formatDate(selected.replied_at)}
                      </span>
                    )}
                    {selected.pricing_version && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-white/50">
                        Pricing v{selected.pricing_version}
                      </span>
                    )}
                  </div>

                  {/* Status controls */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-white/40">Status:</span>
                    {(['new', 'replied', 'archived'] as ContactStatus[]).map((st) => (
                      <button
                        key={st}
                        onClick={() => setStatus(st)}
                        className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors ${
                          selected.status === st
                            ? 'border-white bg-white text-stone-950'
                            : 'border-white/15 text-white/60 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  {/* Reply composer */}
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/50">Reply</p>
                    <input
                      value={replySubject}
                      onChange={(e) => setReplySubject(e.target.value)}
                      className="mb-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400/40"
                      placeholder="Subject"
                    />
                    <textarea
                      value={replyBody}
                      onChange={(e) => setReplyBody(e.target.value)}
                      rows={5}
                      placeholder={`Hi ${selected.name.split(' ')[0]},\n\n…`}
                      className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400/40"
                    />
                    <p className="mt-1 text-[11px] text-white/35">Your signature is added automatically. A copy is sent to your inbox.</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={sendReply}
                        disabled={sending}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 px-4 py-2 text-sm font-semibold text-stone-950 transition-opacity hover:opacity-90 disabled:opacity-60"
                      >
                        {sending ? <Loader size={15} className="animate-spin" /> : <Send size={15} />}
                        {sending ? 'Sending…' : 'Send reply'}
                      </button>
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-disabled={!selected.phone}
                        onClick={(event) => {
                          if (!selected.phone) event.preventDefault();
                        }}
                        className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 ${
                          selected.phone ? 'hover:bg-white/10' : 'cursor-not-allowed opacity-40'
                        }`}
                      >
                        <MessageCircle size={15} /> WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/50">Private notes</p>
                    <textarea
                      value={notesDraft}
                      onChange={(e) => setNotesDraft(e.target.value)}
                      rows={3}
                      placeholder="Context, follow-ups, anything you want to remember…"
                      className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400/40"
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <button
                        onClick={saveNotes}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
                      >
                        <Check size={13} /> Save notes
                      </button>
                      <button
                        onClick={remove}
                        className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/20 bg-rose-400/10 px-3 py-1.5 text-xs text-rose-200 hover:bg-rose-400/20"
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
