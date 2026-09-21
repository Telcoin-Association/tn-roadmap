import { useState, type MouseEvent } from 'react';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { motion } from 'framer-motion';
import { PhaseOverview } from './components/PhaseOverview';
import { ProgressBar } from './components/ProgressBar';
import { TabbedPanel } from './components/TabbedPanel';
import { LatestUpdates } from './components/LatestUpdates';
import { loadStatus, type Status } from './data/loadStatus';
import { TelcoinAnimatedLogo } from './components/TelcoinAnimatedLogo';
import { getWhatsNew } from '@/data/whatsNew';
import LastUpdated from '@/components/LastUpdated';
import AdiriLogoUrl from '@/assets/adiri.svg?url';

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};


export default function App() {
  const [status] = useState<Status>(() => loadStatus());
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
      <SiteHeader />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }} />
      <header className="relative bg-card pt-16 backdrop-blur">
        <div className="container-fluid py-16">
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
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col items-start gap-4 md:w-[420px] md:shrink-0 md:items-end">
                  <div className="w-full rounded-3xl border border-[#19C8FF]/40 bg-card p-6 shadow-[0_0_30px_rgba(25,200,255,0.2)] backdrop-blur">
                    <ProgressBar
                      value={status.meta.overallTrajectoryPct}
                      label="Road to Mainnet"
                    />
                  </div>
                </div>
              </div>
              {(() => {
                const { milestones: newItems } = getWhatsNew();
                if (newItems.length === 0) return null;
                return (
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5 backdrop-blur">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">What's New</h2>
                      <LastUpdated lastUpdated={status.meta.lastUpdated} />
                    </div>
                    <div className="mb-4 flex justify-center">
                      <div className="inline-flex items-center gap-3 rounded-3xl border border-[#19C8FF]/40 bg-card px-6 py-4 shadow-[0_0_30px_rgba(25,200,255,0.2)] backdrop-blur">
                        <span className="relative flex items-center justify-center">
                          <motion.span
                            className="absolute inset-0 rounded-full border border-success/40"
                            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                            transition={{ repeat: Infinity, duration: 2.8, ease: 'easeOut', repeatDelay: 0.4 }}
                          />
                          <motion.span
                            className="relative inline-flex items-center rounded-full border border-success/40 bg-success/15 px-3 py-1 text-sm font-semibold text-success"
                            animate={{ scale: [1, 1.07, 1] }}
                            transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                          >
                            Live
                          </motion.span>
                        </span>
                        <span className="text-xl font-semibold text-fg">Adiri Testnet Final Phase</span>
                      </div>
                    </div>
                    <LatestUpdates />
                  </div>
                );
              })()}
            </motion.div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </header>
      <main className="container-fluid space-y-16 py-16">
          <>
            <section>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] p-6 backdrop-blur-sm md:p-8">
                <PhaseOverview phases={status.phases} />
              </div>
            </section>

            <section id="security-section">
              <TabbedPanel phases={status.phases} links={status.links} notes={status.security.notes} />
            </section>
          </>
      </main>
      <SiteFooter />
    </div>
  );
}
