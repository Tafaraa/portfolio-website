import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { Download, UserMinus, UserCheck } from 'lucide-react';
import { supabase, type ContactSubmission } from '../../lib/supabase';
import { GlassCard, formatDate } from './ui';

type Props = {
  submissions: ContactSubmission[];
  onChanged: () => void;
};

const Marketing = ({ submissions, onChanged }: Props) => {
  // One row per email who ever opted in, newest first.
  const audience = useMemo(() => {
    const seen = new Map<string, ContactSubmission>();
    for (const s of submissions) {
      if (!s.marketing_opt_in) continue;
      const existing = seen.get(s.email);
      if (!existing || new Date(s.created_at) > new Date(existing.created_at)) seen.set(s.email, s);
    }
    return [...seen.values()].sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
  }, [submissions]);

  const active = audience.filter((a) => !a.unsubscribed_at);

  const exportCsv = () => {
    const rows = active.map((a) => [a.name, a.email, formatDate(a.created_at)]);
    const csv = [['Name', 'Email', 'Opted in'], ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `marketing-list-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${active.length} contacts`);
  };

  const toggleUnsub = async (s: ContactSubmission) => {
    if (!supabase) return;
    const value = s.unsubscribed_at ? null : new Date().toISOString();
    // Apply to every row for this email so the person is fully opted out.
    const { error } = await supabase
      .from('contact_submissions')
      .update({ unsubscribed_at: value })
      .eq('email', s.email);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(value ? 'Unsubscribed' : 'Re-subscribed');
    onChanged();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white">Marketing audience</h3>
          <p className="text-sm text-white/50">
            {active.length} active {active.length === 1 ? 'contact' : 'contacts'} who opted in. POPIA: honour unsubscribes.
          </p>
        </div>
        <button
          onClick={exportCsv}
          disabled={active.length === 0}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 px-5 py-2.5 text-sm font-semibold text-stone-950 transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      <GlassCard className="divide-y divide-white/5 overflow-hidden">
        {audience.length === 0 && (
          <div className="p-8 text-center text-sm text-white/40">No one has opted in yet.</div>
        )}
        {audience.map((a) => (
          <div key={a.email} className="flex items-center gap-3 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400/30 to-emerald-400/20 text-sm font-bold text-blue-200">
              {a.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {a.name}
                {a.unsubscribed_at && (
                  <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/50">
                    unsubscribed
                  </span>
                )}
              </p>
              <p className="truncate text-xs text-white/50">{a.email}</p>
            </div>
            <span className="hidden shrink-0 text-[11px] text-white/40 sm:block">{formatDate(a.created_at)}</span>
            <button
              onClick={() => toggleUnsub(a)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                a.unsubscribed_at
                  ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/20'
                  : 'border-white/15 bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {a.unsubscribed_at ? <UserCheck size={13} /> : <UserMinus size={13} />}
              {a.unsubscribed_at ? 'Re-subscribe' : 'Unsubscribe'}
            </button>
          </div>
        ))}
      </GlassCard>
    </div>
  );
};

export default Marketing;
