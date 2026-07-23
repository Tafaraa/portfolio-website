import { motion } from 'framer-motion';
import type { ContactStatus } from '../../lib/supabase';

const ACCENTS = {
  emerald: 'from-emerald-400/20 to-emerald-400/5 text-emerald-300',
  teal: 'from-teal-400/20 to-teal-400/5 text-teal-300',
  amber: 'from-amber-400/20 to-amber-400/5 text-amber-300',
  blue: 'from-blue-400/20 to-blue-400/5 text-blue-300'
} as const;

export const StatTile = ({
  label,
  value,
  accent
}: {
  label: string;
  value: number;
  accent: keyof typeof ACCENTS;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${ACCENTS[accent]} p-4 backdrop-blur-xl md:p-5`}
  >
    <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/50 md:text-xs">{label}</p>
    <p className="mt-2 text-3xl font-bold text-white md:text-4xl">{value}</p>
  </motion.div>
);

export const STATUS_STYLES: Record<ContactStatus, string> = {
  new: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  replied: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
  archived: 'border-white/15 bg-white/5 text-white/50'
};

export const StatusBadge = ({ status }: { status: ContactStatus }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium capitalize ${STATUS_STYLES[status]}`}>
    {status}
  </span>
);

export const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl ${className}`}>{children}</div>
);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });

export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString('en-ZA', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
