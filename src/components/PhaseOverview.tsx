import type { Phase } from '../data/statusSchema';
import {
  CompassIcon,
  LaunchIcon,
  MainnetIcon,
  NetworkIcon,
  TestnetIcon
} from './icons';
import { formatList } from '../utils/formatList';

const STATUS_LABELS: Record<Phase['status'], { text: string; className: string; ariaLabel: string }> = {
  in_progress: {
    text: 'In progress',
    className:
      'bg-[#16c8ff]/15 text-[#0f172a] dark:bg-[#16c8ff]/25 dark:text-[#16c8ff] border border-[#16c8ff]/40',
    ariaLabel: 'Phase is in progress'
  },
  upcoming: {
    text: 'Upcoming',
    className: 'bg-slate-100 text-slate-600 dark:bg-slate-800/70 dark:text-slate-200 border border-slate-200/60 dark:border-slate-600',
    ariaLabel: 'Phase is upcoming'
  },
  complete: {
    text: 'Complete',
    className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200 border border-emerald-200/60 dark:border-emerald-500/50',
    ariaLabel: 'Phase is complete'
  }
};

const PHASE_ICONS: Partial<Record<Phase['key'], typeof NetworkIcon>> = {
  devnet: LaunchIcon,
  testnet: TestnetIcon,
  mainnet: MainnetIcon
};

type PhaseOverviewProps = {
  phases: Phase[];
};

export function PhaseOverview({ phases }: PhaseOverviewProps) {
  const phaseTitles = phases.map((phase) => phase.title);
  const readablePhaseList = formatList(phaseTitles);
  const phaseListText = readablePhaseList || 'each network phase';

  return (
    <section aria-labelledby="phase-overview-heading" className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#16c8ff]/15 backdrop-blur">
          <CompassIcon className="h-6 w-6" />
        </div>
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
          const Icon = PHASE_ICONS[phase.key] ?? NetworkIcon;
          return (
            <article
              key={phase.key}
              className="group flex flex-col gap-5 rounded-2xl border border-white/30 bg-white/80 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5"
            >
              <header className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#16c8ff]/15">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{phase.title}</h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{phase.key}</p>
                  </div>
                </div>
                <span
                  aria-label={badge.ariaLabel}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium shadow-sm backdrop-blur ${badge.className}`}
                  role="status"
                >
                  {badge.text}
                </span>
              </header>
              <p className="text-sm leading-relaxed text-slate-600 transition group-hover:text-slate-700 dark:text-slate-300 dark:group-hover:text-slate-200">
                {phase.summary}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
