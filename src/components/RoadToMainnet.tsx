import type { RoadmapItem } from '../data/statusSchema';

type RoadToMainnetProps = {
  steps: RoadmapItem[];
};

const STATE_STYLES: Record<RoadmapItem['state'], { dot: string; border: string; label: string }> = {
  in_progress: {
    dot: 'border-blue-500 bg-white text-blue-500',
    border: 'border-blue-500',
    label: 'In progress'
  },
  up_next: {
    dot: 'border-slate-400 bg-white text-slate-600',
    border: 'border-slate-300 dark:border-slate-600',
    label: 'Up next'
  },
  planned: {
    dot: 'border-slate-300 bg-white text-slate-500',
    border: 'border-slate-200 dark:border-slate-700',
    label: 'Planned'
  },
  complete: {
    dot: 'border-emerald-500 bg-emerald-500 text-white',
    border: 'border-emerald-500',
    label: 'Complete'
  }
};

export function RoadToMainnet({ steps }: RoadToMainnetProps) {
  return (
    <section aria-labelledby="roadmap-heading" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 id="roadmap-heading" className="text-xl font-semibold text-slate-900 dark:text-white">
            Road to Mainnet
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Milestones required to unlock mainnet launch readiness.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition dark:border-slate-700"
            aria-label="Previous milestones"
            disabled
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition dark:border-slate-700"
            aria-label="Next milestones"
            disabled
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
      <ol className="relative space-y-6 border-l border-slate-200 pl-6 dark:border-slate-700">
        {steps.map((step) => {
          const style = STATE_STYLES[step.state];
          return (
            <li key={step.title} className="relative ml-1">
              <div
                className={`absolute -left-[11px] mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 ${style.dot}`}
                aria-hidden="true"
              >
                <span className="text-[10px] font-semibold">•</span>
              </div>
              <div className={`rounded-2xl border bg-white p-4 shadow-soft dark:bg-slate-900 ${style.border}`}>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-300">{style.label}</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{step.title}</h3>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
