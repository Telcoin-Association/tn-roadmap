import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LearnMore } from './components/LearnMore';
import { PhaseOverview } from './components/PhaseOverview';
import { ProgressBar } from './components/ProgressBar';
import { RoadToDeploymentFlow } from './components/RoadToDeployment/Flow';
import { RoadToMainnet } from './components/RoadToMainnet';
import { SecurityAudits } from './components/SecurityAudits';
import { GradientCanvas } from './components/GradientCanvas';
import { loadStatus, type Status } from './data/loadStatus';
import type { Phase as RoadmapPhase } from './data/roadmap';
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
  const reduceMotion = useReducedMotion();

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

  const handleFlowSelect = useCallback(
    (phase: RoadmapPhase) => {
      const target = phase.links?.[0]?.href;
      if (!target) return;
      const elementId = target.startsWith('#') ? target.slice(1) : target;
      const element = document.getElementById(elementId);
      if (!element) return;
      element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      const accordionTrigger = element.querySelector('button');
      if (accordionTrigger instanceof HTMLButtonElement) {
        window.setTimeout(() => {
          accordionTrigger.focus({ preventScroll: true });
          accordionTrigger.click();
        }, reduceMotion ? 0 : 160);
      }
    },
    [reduceMotion]
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg text-fg">
      <GradientCanvas />
      <header className="relative isolate border-b border-border/60 bg-bg/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 text-center md:px-8">
          {showSkeleton ? (
            <HeaderSkeleton />
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <NetworkIcon className="h-5 w-5" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fg-muted/80">
                  Telcoin Network
                </p>
              </div>
              <h1 className="text-3xl font-bold text-fg md:text-4xl">Telcoin Network Status</h1>
              <p className="mx-auto max-w-2xl text-base text-fg-muted">{headerDescription}</p>
              <div className="relative mx-auto max-w-xl overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-6 text-left shadow-glow">
                <div className="pointer-events-none absolute inset-y-0 -left-1 w-1/2 bg-[radial-gradient(circle_at_top,var(--primary)/0.15,transparent_60%)]" />
                <div className="pointer-events-none absolute inset-y-0 -right-1 w-1/2 bg-[radial-gradient(circle_at_bottom,var(--accent)/0.12,transparent_60%)]" />
                <ProgressBar value={status.meta.overallTrajectoryPct} label="Overall trajectory" />
                <p className="mt-4 text-sm text-fg-muted">
                  Last updated <time dateTime={status.meta.lastUpdated}>{formattedLastUpdated}</time>
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </header>
      <main
        className="relative mx-auto mt-12 flex max-w-6xl flex-col gap-16 px-6 pb-16 md:px-8"
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
            <SkeletonSection className="h-80" />
            <SkeletonSection className="h-72" />
          </>
        ) : (
          <>
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <PhaseOverview phases={status.phases} />
            </motion.section>

            <motion.section
              id="security-section"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
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
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            >
              <RoadToDeploymentFlow onSelectPhase={handleFlowSelect} />
            </motion.section>

            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            >
              <RoadToMainnet steps={status.roadmap} />
            </motion.section>

            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            >
              <LearnMore phases={status.phases} links={status.links} />
            </motion.section>
          </>
        )}
      </main>
      <footer className="border-t border-border/60 bg-bg/80 py-8 text-center text-sm text-fg-muted">
        © {new Date().getFullYear()} Telcoin Network — roadmap snapshot for engineering stakeholders.
      </footer>
    </div>
  );
}
