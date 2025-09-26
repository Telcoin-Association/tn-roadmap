import { useCallback, useMemo, useState } from 'react';
import type { RoadmapItem } from '../data/statusSchema';
import { ChevronIcon, LaunchIcon, NetworkIcon, TimelineIcon } from './icons';
import { SECTION_COPY } from '../data/sectionCopy';
import { getUiFlag } from '../utils/uiFlags';

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
    border: 'border-border/80',
    label: 'Up next',
    icon: TimelineIcon,
    chip: 'bg-white/10 text-fg-muted'
  },
  planned: {
    border: 'border-border/80',
    label: 'Planned',
    icon: NetworkIcon,
    chip: 'bg-white/5 text-fg-muted'
  },
  complete: {
    border: 'border-success/40',
    label: 'Complete',
    icon: LaunchIcon,
    chip: 'bg-success/15 text-success'
  }
};

export function RoadToMainnet({ steps }: RoadToMainnetProps) {
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const microEnabled = useMemo(() => getUiFlag('micro'), []);

  const handleToggle = useCallback((title: string) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [title]: !prev[title]
    }));
  }, []);

  return (
    <section aria-labelledby="roadmap-heading" className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/20 text-primary">
          <TimelineIcon className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h2 id="roadmap-heading" className="text-xl font-bold text-fg">
            {SECTION_COPY.roadmap.heading}
          </h2>
          <p className="text-sm text-fg-muted">{SECTION_COPY.roadmap.description}</p>
        </div>
      </div>
      <div className="rounded-2xl border-2 border-border/60 bg-card p-6 shadow-soft backdrop-blur">
        <ol className="space-y-4">
          {steps.map((step, index) => {
            const style = STATE_STYLES[step.state];
            const Icon = style.icon;
            const isLive = step.state === 'in_progress';
            const isExpanded = Boolean(expandedSteps[step.title]);
            const detailsId = `roadmap-step-${index}-details`;
            return (
              <li
                key={step.title}
                className="roadmap-step flex flex-col gap-3 rounded-2xl border-2 border-white/10 bg-white/5 p-4 text-sm text-fg backdrop-blur"
                data-expanded={isExpanded ? 'true' : 'false'}
              >
                <button
                  type="button"
                  className="roadmap-step-toggle"
                  onClick={() => handleToggle(step.title)}
                  aria-expanded={isExpanded}
                  aria-controls={detailsId}
                >
                  <div className="roadmap-step-header flex items-center justify-between gap-3">
                    <span
                      className={`${microEnabled ? 'live-indicator ' : ''}inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${style.chip}`}
                      data-live={microEnabled && isLive ? 'true' : undefined}
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary shadow-soft" aria-hidden="true">
                        <Icon className="h-4 w-4" />
                      </span>
                      {style.label}
                    </span>
                    <ChevronIcon className="h-4 w-4 text-fg-muted/80" aria-hidden="true" data-role="chevron" />
                  </div>
                </button>
                <h3 className="text-base font-semibold text-fg">{step.title}</h3>
                <div
                  id={detailsId}
                  className="roadmap-step-details text-sm text-fg-muted"
                  aria-hidden={!isExpanded}
                >
                  <div className="roadmap-step-details-inner leading-relaxed">{step.details}</div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
