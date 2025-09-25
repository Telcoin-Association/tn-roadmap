import type { RoadmapItem } from '../data/statusSchema';
import { ChevronIcon, LaunchIcon, NetworkIcon, TimelineIcon } from './icons';

type RoadToMainnetProps = {
  steps: RoadmapItem[];
};

const STATE_STYLES: Record<
  RoadmapItem['state'],
  { border: string; label: string; icon: typeof NetworkIcon; chip: string }
> = {
  in_progress: {
    border: 'border-[#16c8ff]/60',
    label: 'In progress',
    icon: LaunchIcon,
    chip: 'bg-[#16c8ff]/15 text-[#0f172a] dark:bg-[#16c8ff]/25 dark:text-[#16c8ff]'
  },
  up_next: {
    border: 'border-slate-300 dark:border-slate-600',
    label: 'Up next',
    icon: TimelineIcon,
    chip: 'bg-slate-100 text-slate-600 dark:bg-slate-800/70 dark:text-slate-200'
  },
  planned: {
    border: 'border-slate-200 dark:border-slate-700',
    label: 'Planned',
    icon: NetworkIcon,
    chip: 'bg-slate-50 text-slate-500 dark:bg-slate-800/60 dark:text-slate-300'
  },
  complete: {
    border: 'border-emerald-500/70',
    label: 'Complete',
    icon: LaunchIcon,
    chip: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200'
  }
};

export function RoadToMainnet({ steps }: RoadToMainnetProps) {
  return (
    <section aria-labelledby="roadmap-heading" className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#16c8ff]/15">
            <TimelineIcon className="h-6 w-6" />
          </div>
          <div>
            <h2 id="roadmap-heading" className="text-xl font-semibold text-slate-900 dark:text-white">
              Road to Mainnet
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Milestones required to unlock mainnet launch readiness.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/70 text-slate-500 transition dark:border-white/10 dark:bg-white/10 dark:text-slate-300"
            aria-label="Previous milestones"
            disabled
          >
            <ChevronIcon className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/70 text-slate-500 transition dark:border-white/10 dark:bg-white/10 dark:text-slate-300"
            aria-label="Next milestones"
            disabled
          >
            <ChevronIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <ol className="relative space-y-6 border-l border-white/20 pl-6 dark:border-white/10">
        {steps.map((step) => {
          const style = STATE_STYLES[step.state];
          const Icon = style.icon;
          return (
            <li key={step.title} className="relative ml-1">
              <div className="absolute -left-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#16c8ff]/10 backdrop-blur" aria-hidden="true">
                <Icon className="h-5 w-5" />
              </div>
              <div className={`rounded-2xl border bg-white/85 p-5 shadow-soft backdrop-blur dark:bg-white/5 ${style.border}`}>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${style.chip}`}>
                  {style.label}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">{step.title}</h3>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
