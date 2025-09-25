import type { Phase } from '../data/statusSchema';
import { formatList } from '../utils/formatList';

const STATUS_LABELS: Record<Phase['status'], { text: string; className: string; ariaLabel: string }> = {
  in_progress: {
    text: 'In progress',
    className: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200',
    ariaLabel: 'Phase is in progress'
  },
  upcoming: {
    text: 'Upcoming',
    className: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
    ariaLabel: 'Phase is upcoming'
  },
  complete: {
    text: 'Complete',
    className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200',
    ariaLabel: 'Phase is complete'
  }
};

type PhaseOverviewProps = {
  phases: Phase[];
};

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 text-blue-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export function PhaseOverview({ phases }: PhaseOverviewProps) {
  const phaseTitles = phases.map((phase) => phase.title);
  const readablePhaseList = formatList(phaseTitles);
  const phaseListText = readablePhaseList || 'each network phase';

  return (
    <section aria-labelledby="phase-overview-heading" className="space-y-6">
      <div className="flex items-center gap-3">
        <ClockIcon />
        <div>
          <h2 id="phase-overview-heading" className="text-xl font-semibold text-slate-900 dark:text-white">
            Phase overview
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Track where Telcoin Network stands across {phaseListText}.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {phases.map((phase) => {
          const badge = STATUS_LABELS[phase.status];
          return (
            <article
              key={phase.key}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <header className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{phase.title}</h3>
                </div>
                <span
                  aria-label={badge.ariaLabel}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${badge.className}`}
                  role="status"
                >
                  {badge.text}
                </span>
              </header>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{phase.summary}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
