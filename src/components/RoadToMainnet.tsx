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
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <TimelineIcon className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h2 id="roadmap-heading" className="text-xl font-semibold text-fg">
            Road to Mainnet
          </h2>
          <p className="text-sm text-fg-muted">
            Milestones required to unlock mainnet launch readiness.
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-border/80 bg-white p-6 shadow-soft">
        <ol className="space-y-4">
          {steps.map((step) => {
            const style = STATE_STYLES[step.state];
            const Icon = style.icon;
            return (
              <li key={step.title} className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-bg p-4 text-sm text-fg">
                <div className="flex items-center justify-between gap-3">
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${style.chip}`}>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-primary shadow-soft" aria-hidden="true">
                      <Icon className="h-4 w-4" />
                    </span>
                    {style.label}
                  </span>
                  <ChevronIcon className="h-4 w-4 text-fg-muted/80" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-fg">{step.title}</h3>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
