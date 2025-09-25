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
    border: 'border-primary/50',
    label: 'In progress',
    icon: LaunchIcon,
    chip: 'bg-primary/15 text-primary'
  },
  up_next: {
    border: 'border-border',
    label: 'Up next',
    icon: TimelineIcon,
    chip: 'bg-bg-elev text-fg-muted'
  },
  planned: {
    border: 'border-border/80',
    label: 'Planned',
    icon: NetworkIcon,
    chip: 'bg-bg-elev/70 text-fg-muted'
  },
  complete: {
    border: 'border-success/40',
    label: 'Complete',
    icon: LaunchIcon,
    chip: 'bg-success/15 text-success'
  }
};

export function RoadToMainnet({ steps }: RoadToMainnetProps) {
  return (
    <section aria-labelledby="roadmap-heading" className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <TimelineIcon className="h-6 w-6" />
          </div>
          <div>
            <h2 id="roadmap-heading" className="text-xl font-semibold text-fg">
              Road to Mainnet
            </h2>
            <p className="text-sm text-fg-muted">
              Milestones required to unlock mainnet launch readiness.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/80 text-fg-muted transition hover:text-primary focus-visible:ring-2"
            aria-label="Previous milestones"
            disabled
          >
            <ChevronIcon className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/80 text-fg-muted transition hover:text-primary focus-visible:ring-2"
            aria-label="Next milestones"
            disabled
          >
            <ChevronIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <ol className="relative space-y-6 border-l border-border/60 pl-6">
        {steps.map((step) => {
          const style = STATE_STYLES[step.state];
          const Icon = style.icon;
          return (
            <li key={step.title} className="relative ml-1">
              <div className="absolute -left-5 flex h-10 w-10 items-center justify-center rounded-full bg-primary/12 text-primary" aria-hidden="true">
                <Icon className="h-5 w-5" />
              </div>
              <div className={`rounded-2xl border bg-card/95 p-5 shadow-glow ${style.border}`}>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${style.chip}`}>
                  {style.label}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-fg">{step.title}</h3>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
