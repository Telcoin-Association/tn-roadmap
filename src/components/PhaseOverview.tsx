import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Phase } from '../data/statusSchema';
import { CompassIcon, LaunchIcon, MainnetIcon, NetworkIcon, TestnetIcon } from './icons';
import { formatList } from '../utils/formatList';
import { SECTION_COPY } from '../data/sectionCopy';
import { getUiFlag } from '../utils/uiFlags';

const STATUS_LABELS: Record<Phase['status'], { text: string; className: string; ariaLabel: string }> = {
  in_progress: {
    text: 'In progress',
    className: 'border-primary/50 bg-primary/20 text-primary',
    ariaLabel: 'Phase is in progress'
  },
  upcoming: {
    text: 'Upcoming',
    className: 'border-border/70 bg-white/10 text-fg-muted',
    ariaLabel: 'Phase is upcoming'
  },
  complete: {
    text: 'Complete',
    className: 'border-success/40 bg-success/15 text-success',
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
  const microEnabled = useMemo(() => getUiFlag('micro'), []);

  return (
    <section aria-labelledby="phase-overview-heading" className="space-y-3">
      <div className="flex items-start gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-2xl bg-primary/20 text-primary">
          <CompassIcon className="h-3.5 w-3.5" />
        </div>
        <div className="space-y-1">
          <h2 id="phase-overview-heading" className="text-base font-semibold text-fg">
            {SECTION_COPY.phaseOverview.heading}
          </h2>
          <p className="text-[0.7rem] leading-snug text-fg-muted">
            {SECTION_COPY.phaseOverview.descriptionTemplate(phaseListText)}
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {phases.map((phase) => {
          const badge = STATUS_LABELS[phase.status];
          const Icon = PHASE_ICONS[phase.key] ?? NetworkIcon;
          const isLive = microEnabled && phase.status === 'in_progress';
          return (
            <motion.article
              key={phase.key}
              className="group relative h-full overflow-hidden rounded-[22px] bg-[radial-gradient(circle_at_12%_-20%,hsl(201_92%_60%/0.55),transparent_56%),radial-gradient(circle_at_92%_120%,hsl(248_83%_64%/0.4),transparent_58%),linear-gradient(150deg,hsl(220_74%_14%/0.9),hsl(220_74%_10%/0.96))] p-[0.5px] shadow-[0_28px_75px_-50px_hsl(220_72%_6%/0.7)] transition will-change-transform hover:-translate-y-1 hover:shadow-[0_34px_90px_-52px_hsl(201_92%_56%/0.6)] focus-within:-translate-y-1 focus-within:shadow-[0_34px_90px_-52px_hsl(201_92%_56%/0.6)]"
              whileHover={{ y: -8 }}
              data-phase-card
            >
              <div
                className="flex h-full flex-col gap-1 rounded-[20px] border border-white/10 bg-card/85 px-2.5 pb-2.5 pt-2 backdrop-blur"
                data-phase-card-surface
              >
                <header className="flex items-center justify-between gap-2" data-phase-card-header>
                  <div className="flex items-center gap-1.5" data-phase-card-title-group>
                    <div className="flex h-5 w-5 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-[0.8rem] font-semibold text-fg">{phase.title}</h3>
                      <p className="text-[0.55rem] uppercase tracking-[0.3em] text-fg-muted/70">{phase.key}</p>
                    </div>
                  </div>
                  <span
                    aria-label={badge.ariaLabel}
                    className={`${microEnabled ? 'live-indicator ' : ''}inline-flex items-center rounded-full border border-white/10 bg-white/5 px-1.5 py-[0.2rem] text-[0.58rem] font-semibold tracking-wide backdrop-blur-sm ${badge.className}`}
                    data-live={isLive ? 'true' : undefined}
                    role="status"
                  >
                    {badge.text}
                  </span>
                </header>
                <p
                  className="text-[0.68rem] leading-snug text-fg-muted transition group-hover:text-fg group-focus-within:text-fg"
                  data-phase-card-summary
                >
                  {phase.summary}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
