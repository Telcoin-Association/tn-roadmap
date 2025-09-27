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
    <section aria-labelledby="phase-overview-heading" className="space-y-3 md:space-y-4">
      <div className="flex items-start gap-2 md:gap-3">
        <div className="flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-2xl bg-primary/20 text-primary">
          <CompassIcon className="h-4 w-4 md:h-5 md:w-5" />
        </div>
        <div className="space-y-0.5 md:space-y-1">
          <h2 id="phase-overview-heading" className="text-[0.95rem] font-semibold text-fg">
            {SECTION_COPY.phaseOverview.heading}
          </h2>
          <p className="text-[0.65rem] leading-tight text-fg-muted">
            {SECTION_COPY.phaseOverview.descriptionTemplate(phaseListText)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 items-stretch">
        {phases.map((phase) => {
          const badge = STATUS_LABELS[phase.status];
          const Icon = PHASE_ICONS[phase.key] ?? NetworkIcon;
          const isLive = microEnabled && phase.status === 'in_progress';

          return (
            <motion.article
              key={phase.key}
              className="group relative flex flex-col overflow-hidden rounded-[20px] bg-[radial-gradient(circle_at_12%_-20%,hsl(201_92%_60%/0.5),transparent_52%),radial-gradient(circle_at_92%_120%,hsl(248_83%_64%/0.36),transparent_54%),linear-gradient(150deg,hsl(220_74%_14%/0.9),hsl(220_74%_10%/0.95))] p-[0.5px] shadow-[0_24px_70px_-54px_hsl(220_72%_6%/0.68)] transition will-change-transform hover:-translate-y-1 hover:shadow-[0_30px_85px_-56px_hsl(201_92%_56%/0.6)] focus-within:-translate-y-1 focus-within:shadow-[0_30px_85px_-56px_hsl(201_92%_56%/0.6)]"
              whileHover={{ y: -8 }}
              data-phase-card
            >
              <div
                className="flex flex-col gap-1 rounded-[18px] border border-white/10 bg-card/85 px-2 pb-2 pt-2 backdrop-blur md:gap-3 md:px-4 md:pb-4 md:pt-3"
                data-phase-card-surface
              >
                <header className="flex items-start justify-between gap-2 md:gap-3" data-phase-card-header>
                  <div className="flex items-center gap-1.5 md:gap-2.5" data-phase-card-title-group>
                    <div className="flex h-[1.125rem] w-[1.125rem] items-center justify-center rounded-2xl bg-primary/12 text-primary md:h-9 md:w-9 md:bg-primary/10">
                      <Icon className="h-3 w-3 md:h-5 md:w-5" />
                    </div>
                    <div className="space-y-0.5 md:space-y-1">
                      <h3 className="text-[0.74rem] font-semibold leading-tight text-fg md:text-lg">{phase.title}</h3>
                      <p className="text-[0.5rem] uppercase tracking-[0.28em] text-fg-muted/70 md:text-xs md:tracking-[0.2em]">
                        {phase.key}
                      </p>
                    </div>
                  </div>

                  <span
                    aria-label={badge.ariaLabel}
                    className={`${microEnabled ? 'live-indicator ' : ''}inline-flex items-center rounded-full border border-white/10 bg-white/5 px-1 py-[0.18rem] text-[0.54rem] font-semibold tracking-wide backdrop-blur-sm md:px-2.5 md:py-0.5 md:text-xs ${badge.className}`}
                    data-live={isLive ? 'true' : undefined}
                    role="status"
                  >
                    {badge.text}
                  </span>
                </header>

                <p
                  className="text-[0.62rem] leading-tight text-fg-muted transition group-hover:text-fg group-focus-within:text-fg md:text-sm md:leading-6"
                  data-phase-card-summary
                >
                  {phase.summary}
                </p>

                <div className="mt-auto pt-2 md:pt-4" data-phase-card-footer>
                  <a
                    className="inline-flex items-center text-[0.58rem] font-semibold text-primary transition hover:text-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:text-xs"
                    href={phase.learnMore}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
