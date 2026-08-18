// Landing page for the signed unsubscribe links in marketing mail.
//
// The work happens on load rather than behind a button. A person who clicks
// "unsubscribe" has already made their choice; asking them to confirm it is a
// dark pattern, and POPIA treats objection as something that must simply work.
// The token in the URL is the authorisation, so there is nothing to sign in to.

import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Check, AlertCircle, Loader } from 'lucide-react';

type State =
  | { status: 'working' }
  | { status: 'done'; email: string }
  | { status: 'failed'; message: string };

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const [state, setState] = useState<State>({ status: 'working' });
  // StrictMode mounts effects twice in development; the request is idempotent
  // server-side, but firing it twice makes the logs lie about real traffic.
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const token = params.get('token');
    if (!token) {
      setState({
        status: 'failed',
        message: 'This link is missing its token. Reply to any email from me and I will remove you by hand.'
      });
      return;
    }

    fetch(`/api/unsubscribe?token=${encodeURIComponent(token)}`, { method: 'POST' })
      .then(async (res) => {
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.error ?? 'That did not work.');
        setState({ status: 'done', email: data?.email ?? '' });
      })
      .catch((err: unknown) => {
        setState({
          status: 'failed',
          message: err instanceof Error ? err.message : 'That did not work.'
        });
      });
  }, [params]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-stone-50 to-stone-100 px-6 text-stone-900 dark:from-dark-bg dark:to-dark-surface dark:text-dark-text">
      <div className="w-full max-w-md text-center">
        {state.status === 'working' && (
          <>
            <Loader size={32} className="mx-auto animate-spin text-stone-400" aria-hidden />
            <h1 className="mt-6 text-2xl font-bold tracking-tight">Removing you from the list</h1>
            <p className="mt-2 text-sm text-stone-600 dark:text-dark-muted">One moment.</p>
          </>
        )}

        {state.status === 'done' && (
          <>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10">
              <Check size={26} className="text-emerald-700 dark:text-emerald-400" aria-hidden />
            </div>
            <h1 className="mt-6 text-2xl font-bold tracking-tight">You're unsubscribed</h1>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-dark-muted">
              {state.email ? <><strong className="font-semibold">{state.email}</strong> will not</> : 'You will not'}{' '}
              receive any more updates from me. If you have an enquiry open, it is untouched and I will still
              reply to it.
            </p>
          </>
        )}

        {state.status === 'failed' && (
          <>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-500/10">
              <AlertCircle size={26} className="text-amber-700 dark:text-amber-400" aria-hidden />
            </div>
            <h1 className="mt-6 text-2xl font-bold tracking-tight">That link did not work</h1>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-dark-muted">{state.message}</p>
            <a
              href="mailto:tafara@mutsvedutafara.com?subject=Please%20unsubscribe%20me"
              className="mt-5 inline-block text-sm font-medium underline underline-offset-4"
            >
              Email me instead
            </a>
          </>
        )}

        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-stone-900 dark:text-dark-muted dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to the site
        </Link>
      </div>
    </div>
  );
};

export default Unsubscribe;
