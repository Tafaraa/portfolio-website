import { useMemo } from 'react';
import type { ContactSubmission } from '../../lib/supabase';
import { GlassCard } from './ui';

type Props = { submissions: ContactSubmission[] };

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Donut = ({ value, label, sub, color }: { value: number; label: string; sub: string; color: string }) => {
  const r = 52;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 140 140" className="h-32 w-32">
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (pct / 100) * c}
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
        <text x="70" y="66" textAnchor="middle" className="fill-white text-2xl font-bold">
          {Math.round(pct)}%
        </text>
        <text x="70" y="86" textAnchor="middle" className="fill-white/40 text-[9px] uppercase tracking-wider">
          {label}
        </text>
      </svg>
      <p className="mt-2 text-xs text-white/50">{sub}</p>
    </div>
  );
};

const Insights = ({ submissions }: Props) => {
  const monthly = useMemo(() => {
    const now = new Date();
    const buckets: { label: string; count: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      buckets.push({ label: MONTHS[d.getMonth()], count: 0 });
    }
    const firstMonth = new Date(now.getFullYear(), now.getMonth() - 5, 1).getTime();
    for (const s of submissions) {
      const t = new Date(s.created_at);
      if (t.getTime() < firstMonth) continue;
      const idx = (t.getFullYear() - now.getFullYear()) * 12 + (t.getMonth() - now.getMonth()) + 5;
      if (idx >= 0 && idx < 6) buckets[idx].count += 1;
    }
    return buckets;
  }, [submissions]);

  const maxCount = Math.max(1, ...monthly.map((m) => m.count));
  const total = submissions.length;
  const optedIn = submissions.filter((s) => s.marketing_opt_in && !s.unsubscribed_at).length;
  const replied = submissions.filter((s) => s.status === 'replied').length;
  const optInRate = total ? (optedIn / total) * 100 : 0;
  const replyRate = total ? (replied / total) * 100 : 0;

  const statuses = [
    { key: 'new', label: 'New', count: submissions.filter((s) => s.status === 'new').length, color: '#fbbf24' },
    { key: 'replied', label: 'Replied', count: replied, color: '#34d399' },
    { key: 'archived', label: 'Archived', count: submissions.filter((s) => s.status === 'archived').length, color: '#94a3b8' }
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Monthly bar chart */}
      <GlassCard className="p-5 lg:col-span-2">
        <h3 className="text-sm font-semibold text-white">Enquiries · last 6 months</h3>
        <div className="mt-6 flex items-end justify-between gap-3" style={{ height: 180 }}>
          {monthly.map((m) => (
            <div key={m.label} className="flex flex-1 flex-col items-center justify-end gap-2">
              <span className="text-xs font-semibold text-white/70">{m.count}</span>
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-emerald-400/40 to-teal-400 transition-all duration-700"
                style={{ height: `${(m.count / maxCount) * 140}px`, minHeight: m.count ? 6 : 2 }}
              />
              <span className="text-[11px] text-white/40">{m.label}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Rates */}
      <GlassCard className="flex items-center justify-around p-5">
        <Donut value={optInRate} label="opt-in" sub={`${optedIn} of ${total}`} color="#60a5fa" />
        <Donut value={replyRate} label="replied" sub={`${replied} of ${total}`} color="#34d399" />
      </GlassCard>

      {/* Status breakdown */}
      <GlassCard className="p-5">
        <h3 className="text-sm font-semibold text-white">Status breakdown</h3>
        <div className="mt-5 space-y-4">
          {statuses.map((st) => {
            const pct = total ? (st.count / total) * 100 : 0;
            return (
              <div key={st.key}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-white/60">{st.label}</span>
                  <span className="text-white/40">{st.count}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, backgroundColor: st.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};

export default Insights;
