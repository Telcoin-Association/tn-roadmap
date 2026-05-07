import { useEffect, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { LearnMore } from './components/LearnMore';
import { PhaseOverview } from './components/PhaseOverview';
import { ProgressBar } from './components/ProgressBar';
import RoadToMainnet from './components/RoadToMainnet';
import { SecurityAudits } from './components/SecurityAudits';
import { loadStatus, type Status } from './data/loadStatus';
import { TelcoinAnimatedLogo } from './components/TelcoinAnimatedLogo';
import LastUpdated from '@/components/LastUpdated';
import { getLatestDeveloperNotesDate } from '@/data/developerNotes';
import AdiriLogoUrl from '@/assets/adiri.svg?url';

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function SkeletonSection({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl border-2 border-border/60 bg-card p-6 shadow-glow backdrop-blur ${className ?? ''}`}
    >
      <div className="h-4 w-32 rounded-full bg-white/10" />
      <div className="mt-4 space-y-3">
        <div className="h-3 w-full rounded-full bg-white/20" />
        <div className="h-3 w-5/6 rounded-full bg-white/10" />
        <div className="h-3 w-2/3 rounded-full bg-white/5" />
      </div>
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-3xl border-2 border-border/60 bg-card p-10 text-center shadow-glow backdrop-blur">
      <div className="mx-auto h-7 w-56 rounded-full bg-white/15" />
      <div className="mx-auto h-4 w-64 rounded-full bg-white/10" />
      <div className="mx-auto h-3 w-48 rounded-full bg-white/5" />
    </div>
  );
}

export default function App() {
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    const data = loadStatus();
    const timeout = window.setTimeout(() => {
      setStatus(data);
    }, 120);

    return () => window.clearTimeout(timeout);
  }, []);

  const showSkeleton = status === null;
  const headerDescription =
    'Visibility into Telcoin Network development and what remains before launching mainnet.';

  const onHome = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const base = window.location.pathname + window.location.search;
    history.replaceState(null, '', base);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-bg bg-hero-ambient text-fg">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }} />
      <header className="relative bg-card backdrop-blur">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-8">
          {showSkeleton ? (
            <HeaderSkeleton />
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-8"
            >
              <div className="flex flex-wrap items-start gap-6 md:flex-nowrap md:justify-between">
                <div className="flex min-w-0 flex-1 flex-col gap-4">
                  <div className="flex min-w-0 flex-col items-center gap-4 sm:flex-row sm:items-start">
                    <a
                      href="/"
                      onClick={onHome}
                      aria-label="Telcoin Roadmap home"
                      className="mx-auto flex shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:mx-0"
                    >
                      <TelcoinAnimatedLogo className="h-24 w-24 shrink-0 sm:h-28 sm:w-28 md:h-32 md:w-32" />
                    </a>
                    <div className="min-w-0 flex-1 text-center sm:min-w-[220px] sm:text-left">
                      <a
                        href="/"
                        onClick={onHome}
                        className="block space-y-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <h1 className="bg-gradient-to-r from-fg via-primary to-fg bg-clip-text text-2xl font-extrabold text-transparent md:text-3xl">
                          Telcoin Network Roadmap
                        </h1>
                        <p className="max-w-xl text-sm text-fg-muted md:text-base">
                          {headerDescription}
                        </p>
                      </a>
                      <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
                        <a
                          href="https://github.com/telcoin-association/telcoin-network"
                          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          target="_blank"
                          rel="noreferrer"
                        >
                          GitHub
                        </a>
                        <a
                          href="https://telscan.io/"
                          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Explorer
                        </a>
                        <a
                          href="https://www.telcoin.network/faucet"
                          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Faucet
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full max-w-full flex-col items-start gap-4 md:w-auto md:min-w-[260px] md:max-w-sm md:items-end">
                  <div className="w-full rounded-3xl border border-[#19C8FF]/40 bg-card p-6 shadow-[0_0_30px_rgba(25,200,255,0.2)] backdrop-blur">
                    <ProgressBar
                      value={status.meta.overallTrajectoryPct}
                      label="Road to Mainnet"
                    />
                    <div className="mt-4 flex w-full justify-center">
                      <LastUpdated lastUpdated={getLatestDeveloperNotesDate()} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </header>
      <main
        className="mx-auto max-w-5xl space-y-16 px-6 py-16 md:px-8"
        aria-busy={showSkeleton}
        aria-live="polite"
      >
        {showSkeleton || !status ? (
          <>
            <div className="grid gap-6 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonSection key={index} />
              ))}
            </div>
            <SkeletonSection className="h-64" />
            <SkeletonSection className="h-72" />
          </>
        ) : (
          <>
            <section className="px-6 md:px-8">
              <motion.div
                className="relative flex flex-col items-center gap-4 overflow-hidden rounded-[16px] border border-primary/40 bg-[#172552] px-6 py-6 shadow-[0_0_30px_rgba(25,200,255,0.12)] backdrop-blur md:px-10 md:py-8"
                animate={{ boxShadow: ['0 0 30px rgba(25,200,255,0.12)', '0 0 40px rgba(25,200,255,0.22)', '0 0 30px rgba(25,200,255,0.12)'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
                <div className="relative flex items-center justify-center gap-4">
                  <span className="inline-flex items-center rounded-full border border-success/40 bg-success/15 px-3 py-1 text-sm font-semibold text-success">
                    Live
                  </span>
                  <p className="text-2xl font-bold text-fg md:text-3xl">
                    Adiri Testnet Final Phase
                  </p>
                </div>
                <p className="relative max-w-2xl text-center text-sm leading-relaxed text-fg-muted">
                  Telcoin Network's Adiri testnet has launched as a stable network.
                  This build – the final phase before mainnet – is ready for MNOs to onboard as validators and developers to build dApps.
                </p>
                <p className="relative text-center text-sm text-fg-muted">
                  For developer access and support, contact{' '}
                  <a href="mailto:devs@telcoin.org" className="text-primary hover:underline">
                    devs@telcoin.org
                  </a>
                </p>
              </motion.div>
            </section>

            <section>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] p-6 backdrop-blur-sm md:p-8">
                <PhaseOverview phases={status.phases} />
              </div>
            </section>

            <section id="security-section">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] p-6 backdrop-blur-sm md:p-8">
                <SecurityAudits
                  notes={status.security.notes}
                  publicFindings={status.security.publicFindings}
                  afterPriorityFixes={status.security.afterPriorityFixes}
                />
              </div>
            </section>

            <section>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] p-6 backdrop-blur-sm md:p-8">
                <RoadToMainnet />
              </div>
            </section>

            <section>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] p-6 backdrop-blur-sm md:p-8">
                <LearnMore phases={status.phases} links={status.links} />
              </div>
            </section>
          </>
        )}
      </main>
      <footer className="relative bg-card py-8 text-center text-sm text-fg-muted backdrop-blur">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        © 2025{' '}
        <a href="https://www.telcoin.network/" className="text-primary hover:underline">
          Telcoin Network
        </a>
      </footer>
    </div>
  );
}
