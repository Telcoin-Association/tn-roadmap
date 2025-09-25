import { useEffect, useMemo, useState } from 'react';
import { LearnMore } from './components/LearnMore';
import { PhaseOverview } from './components/PhaseOverview';
import { ProgressBar } from './components/ProgressBar';
import { RoadToMainnet } from './components/RoadToMainnet';
import { SecurityAudits } from './components/SecurityAudits';
import { loadStatus, type Status } from './data/loadStatus';
import { formatList } from './utils/formatList';

function SkeletonSection({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-2xl border border-slate-200 bg-white/60 p-6 dark:border-slate-800 dark:bg-slate-900/60 ${className ?? ''}`}>
      <div className="h-4 w-32 rounded bg-slate-200/80 dark:bg-slate-700/80" />
      <div className="mt-4 space-y-3">
        <div className="h-3 w-full rounded bg-slate-200/60 dark:bg-slate-800/70" />
        <div className="h-3 w-5/6 rounded bg-slate-200/60 dark:bg-slate-800/70" />
        <div className="h-3 w-2/3 rounded bg-slate-200/60 dark:bg-slate-800/70" />
      </div>
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-3xl border border-transparent bg-white/50 p-10 text-center shadow-soft dark:bg-slate-900/40">
      <div className="mx-auto h-7 w-56 rounded bg-slate-200/80 dark:bg-slate-700/80" />
      <div className="mx-auto h-4 w-64 rounded bg-slate-200/60 dark:bg-slate-700/70" />
      <div className="mx-auto h-3 w-48 rounded bg-slate-200/60 dark:bg-slate-700/70" />
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 pb-16 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="border-b border-slate-200/60 bg-white/60 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 text-center md:px-8">
          {showSkeleton ? (
            <HeaderSkeleton />
          ) : (
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
                Telcoin Network
              </p>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
                Telcoin Network Status
              </h1>
              <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-300">{headerDescription}</p>
              <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                <ProgressBar value={status.meta.overallTrajectoryPct} label="Overall trajectory" />
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  Last updated <time dateTime={status.meta.lastUpdated}>{formattedLastUpdated}</time>
                </p>
              </div>
            </div>
          )}
        </div>
      </header>
      <main
        className="mx-auto mt-12 flex max-w-6xl flex-col gap-12 px-6 md:px-8"
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
            <PhaseOverview phases={status.phases} />
            <SecurityAudits
              notes={status.security.notes}
              publicFindings={status.security.publicFindings}
              afterPriorityFixes={status.security.afterPriorityFixes}
            />
            <RoadToMainnet steps={status.roadmap} />
            <LearnMore phases={status.phases} links={status.links} />
          </>
        )}
      </main>
      <footer className="mt-16 border-t border-slate-200 bg-white/70 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
        © {new Date().getFullYear()} Telcoin Network — roadmap snapshot for engineering stakeholders.
      </footer>
    </div>
  );
}
