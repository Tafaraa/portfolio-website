import toast, { type Toast } from 'react-hot-toast';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

type Tone = 'success' | 'error' | 'info';

// A bit longer than the library default (4s) so people can actually read it,
// and it stays dismissable via the X at any time.
const DEFAULT_DURATION = 8000;

const TONES: Record<
  Tone,
  { icon: typeof CheckCircle2; ring: string; iconColor: string; bar: string }
> = {
  success: {
    icon: CheckCircle2,
    ring: 'border-emerald-500/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    bar: 'bg-emerald-500'
  },
  error: {
    icon: AlertCircle,
    ring: 'border-rose-500/30',
    iconColor: 'text-rose-600 dark:text-rose-400',
    bar: 'bg-rose-500'
  },
  info: {
    icon: Info,
    ring: 'border-sky-500/30',
    iconColor: 'text-sky-600 dark:text-sky-400',
    bar: 'bg-sky-500'
  }
};

const ToastCard = ({
  t,
  tone,
  title,
  message,
  duration
}: {
  t: Toast;
  tone: Tone;
  title: string | undefined;
  message: string;
  duration: number;
}) => {
  const { icon: Icon, ring, iconColor, bar } = TONES[tone];

  return (
    <div
      className={`toast-card pointer-events-auto relative w-[min(92vw,384px)] overflow-hidden rounded-xl border ${ring} bg-white/95 shadow-[0_18px_50px_rgba(28,25,23,0.18)] backdrop-blur-md dark:bg-stone-950/95 dark:shadow-[0_18px_50px_rgba(0,0,0,0.5)] ${
        t.visible ? 'toast-in' : 'toast-out'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 p-4 pr-3">
        <Icon size={20} className={`mt-0.5 shrink-0 ${iconColor}`} aria-hidden="true" />
        <div className="min-w-0 flex-1">
          {title && (
            <p className="text-sm font-semibold text-stone-900 dark:text-white">{title}</p>
          )}
          <p className={`text-sm leading-relaxed text-stone-600 dark:text-dark-muted ${title ? 'mt-0.5' : ''}`}>
            {message}
          </p>
        </div>
        <button
          type="button"
          onClick={() => toast.dismiss(t.id)}
          aria-label="Dismiss notification"
          className="-mr-1 -mt-1 shrink-0 rounded-md p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
      {/* Countdown bar */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-stone-200/70 dark:bg-white/10">
        <div
          className={`toast-progress-bar h-full ${bar}`}
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
};

type NotifyOptions = { title?: string; duration?: number };

const show = (tone: Tone, message: string, title: string | undefined, duration: number) =>
  toast.custom(
    (t) => <ToastCard t={t} tone={tone} title={title} message={message} duration={duration} />,
    { duration }
  );

export const notifySuccess = (message: string, options?: NotifyOptions) =>
  show('success', message, options?.title ?? 'Sent', options?.duration ?? DEFAULT_DURATION);

export const notifyError = (message: string, options?: NotifyOptions) =>
  show('error', message, options?.title ?? 'Something went wrong', options?.duration ?? DEFAULT_DURATION);

export const notifyInfo = (message: string, options?: NotifyOptions) =>
  show('info', message, options?.title, options?.duration ?? DEFAULT_DURATION);
