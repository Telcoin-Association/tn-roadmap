import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { LearnMore } from './components/LearnMore';
import { PhaseOverview } from './components/PhaseOverview';
import { ProgressBar } from './components/ProgressBar';
import { RoadToMainnet } from './components/RoadToMainnet';
import { SecurityAudits } from './components/SecurityAudits';
import { loadStatus, type Status } from './data/loadStatus';
import { TelcoinAnimatedLogo } from './components/TelcoinAnimatedLogo';

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
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

  const formattedLastUpdated = useMemo(() => {
    if (!status) return '';
    try {
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'UTC'
      }).format(new Date(status.meta.lastUpdated));
    } catch (error) {
      console.error('Failed to format last updated timestamp', error);
      return status.meta.lastUpdated;
    }
  }, [status]);

  const showSkeleton = status === null;
  const headerDescription =
    'Visibility into our Horizon, Adiri, and Mainnet progress and what remains before launch.';

  return (
    <div className="min-h-screen bg-bg bg-hero-ambient text-fg">
      <header className="border-b-2 border-border/60 bg-card backdrop-blur">
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
                <div className="flex min-w-0 flex-1 flex-wrap items-start gap-4">
                  <TelcoinAnimatedLogo className="h-28 w-28 shrink-0 md:h-32 md:w-32" />
                  <div className="min-w-[220px] flex-1 space-y-3 text-left">
                    <h1 className="text-2xl font-extrabold text-fg md:text-3xl">Telcoin Network Status</h1>
                    <p className="max-w-xl text-sm text-fg-muted md:text-base">{headerDescription}</p>
                  </div>
                </div>
                <div className="w-full min-w-[260px] max-w-sm rounded-3xl border-2 border-border/60 bg-card p-6 shadow-soft backdrop-blur">
                  <ProgressBar value={status.meta.overallTrajectoryPct} label="Road to Mainnet" />
                  <p className="mt-4 text-sm text-fg-muted">
                    Last updated <time dateTime={status.meta.lastUpdated}>{formattedLastUpdated}</time>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
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
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <PhaseOverview phases={status.phases} />
            </motion.section>

            <motion.section
              id="security-section"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
            >
              <SecurityAudits
                notes={status.security.notes}
                publicFindings={status.security.publicFindings}
                afterPriorityFixes={status.security.afterPriorityFixes}
              />
            </motion.section>

            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
            >
              <RoadToMainnet steps={status.roadmap} />
            </motion.section>

            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
            >
              <LearnMore phases={status.phases} links={status.links} />
            </motion.section>
          </>
        )}
      </main>
      <footer className="border-t-2 border-border/60 bg-card py-8 text-center text-sm text-fg-muted backdrop-blur">
        © 2025 Telcoin Network
      </footer>
    </div>
  );
}
