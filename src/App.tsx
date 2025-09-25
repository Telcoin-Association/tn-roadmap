import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { LearnMore } from './components/LearnMore';
import { PhaseOverview } from './components/PhaseOverview';
import { ProgressBar } from './components/ProgressBar';
import { RoadToMainnet } from './components/RoadToMainnet';
import { SecurityAudits } from './components/SecurityAudits';
import { loadStatus, type Status } from './data/loadStatus';
import { formatList } from './utils/formatList';
import { NetworkIcon } from './components/icons';

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

function SkeletonSection({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl border border-border/60 bg-card/70 p-6 shadow-glow ${className ?? ''}`}
    >
      <div className="h-4 w-32 rounded-full bg-bg-elev" />
      <div className="mt-4 space-y-3">
        <div className="h-3 w-full rounded-full bg-bg-elev/80" />
        <div className="h-3 w-5/6 rounded-full bg-bg-elev/70" />
        <div className="h-3 w-2/3 rounded-full bg-bg-elev/60" />
      </div>
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-3xl border border-border/60 bg-card/80 p-10 text-center shadow-glow">
      <div className="mx-auto h-7 w-56 rounded-full bg-bg-elev" />
      <div className="mx-auto h-4 w-64 rounded-full bg-bg-elev/80" />
      <div className="mx-auto h-3 w-48 rounded-full bg-bg-elev/70" />
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
  const phaseTitles = status?.phases.map((phase) => phase.title) ?? [];
  const readablePhaseList = formatList(phaseTitles);
  const headerDescription = readablePhaseList
    ? `Visibility into our ${readablePhaseList} progress and what remains before launch.`
    : 'Visibility into Telcoin Network progress and what remains before launch.';

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="border-b border-border/70 bg-white/80 backdrop-blur">
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
              <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                    <NetworkIcon className="h-4 w-4" />
                    Telcoin Network
                  </span>
                  <div className="space-y-3">
                    <h1 className="text-3xl font-semibold text-fg md:text-4xl">Telcoin Network Status</h1>
                    <p className="max-w-xl text-base text-fg-muted md:text-lg">{headerDescription}</p>
                  </div>
                </div>
                <div className="w-full max-w-sm rounded-3xl border border-border/80 bg-white p-6 shadow-soft">
                  <ProgressBar value={status.meta.overallTrajectoryPct} label="Overall trajectory" />
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
      <footer className="border-t border-border/70 bg-white/90 py-8 text-center text-sm text-fg-muted">
        © {new Date().getFullYear()} Telcoin Network — roadmap snapshot for engineering stakeholders.
      </footer>
    </div>
  );
}
