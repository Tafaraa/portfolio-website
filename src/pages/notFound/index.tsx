import { ArrowLeft, ArrowRight, Code2, Compass, Home } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SEO from '../../components/ui/SEO';
import ThemeToggle from '../../components/ui/ThemeToggle';

const helpfulLinks = [
  { label: 'See my work', href: '/#projects' },
  { label: 'What I build', href: '/#about' },
  { label: 'Start a project', href: '/#contact' }
];

const NotFound = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
    <SEO
      title="Page not found | Tafara Mutsvedu"
      description="That page does not exist. Return to Tafara Mutsvedu's portfolio, view recent work, or start a project."
      canonical={pathname}
      noIndex
    />

    <div className="relative min-h-screen overflow-hidden bg-stone-950 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.22),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(59,130,246,0.16),transparent_30%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:auto,auto,48px_48px,48px_48px]" />

      <header className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-12">
        <Link to="/" className="inline-flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-stone-950">
            <Code2 size={18} aria-hidden="true" />
          </span>
          Tafara Mutsvedu
        </Link>
        <ThemeToggle />
      </header>

      <main className="relative z-10 flex min-h-[calc(100vh-80px)] items-center px-6 py-16 md:px-12">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.75fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
              Error 404
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-bold tracking-[-0.05em] sm:text-7xl lg:text-8xl">
              Wrong turn.
              <span className="block text-white/45">Nothing lives here.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
              The link may be old, mistyped, or moved. Your next useful stop is the portfolio.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-950 transition-transform hover:-translate-y-0.5"
              >
                <Home size={17} aria-hidden="true" />
                Back to the portfolio
              </Link>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Start a project
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                <Compass size={21} aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold">Try one of these</p>
                <p className="text-sm text-white/45">Useful places, no dead ends.</p>
              </div>
            </div>

            <nav aria-label="Helpful pages" className="mt-6 divide-y divide-white/10">
              {helpfulLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between gap-4 py-4 text-sm font-medium text-white/75 transition-colors hover:text-white"
                >
                  {item.label}
                  <ArrowRight
                    size={16}
                    className="text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-emerald-300"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-5 inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Go back one page
            </button>
          </aside>
        </div>
      </main>
    </div>
    </>
  );
};

export default NotFound;
