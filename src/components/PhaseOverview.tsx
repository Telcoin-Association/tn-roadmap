import { motion, useReducedMotion } from 'framer-motion';

import HorizonLogoUrl from '@/assets/horizon.svg?url';
import AdiriLogoUrl from '@/assets/adiri.svg?url';
import type { Phase } from '../data/statusSchema';
import { NetworkIcon } from './icons';
import { formatList } from '../utils/formatList';

const STATUS_LABELS: Record<
  Phase['status'],
  { text: string; className: string; ariaLabel: string; shouldPulse?: boolean }
> = {
  in_progress: {
    text: 'In progress',
    className: 'border-primary/50 bg-primary/20 text-primary',
    ariaLabel: 'Phase is in progress',
    shouldPulse: true
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

const PHASE_LOGOS: Partial<Record<Phase['key'], { src: string; alt: string }>> = {
  devnet: { src: HorizonLogoUrl, alt: 'Horizon logo' },
  testnet: { src: AdiriLogoUrl, alt: 'Adiri logo' },
  mainnet: { src: '/IMG/Mainnet.svg', alt: 'Mainnet Logo' }
};

type PhaseOverviewProps = {
  phases: Phase[];
};

export function PhaseOverview({ phases }: PhaseOverviewProps) {
  const phaseTitles = phases.map((phase) => phase.title);
  const readablePhaseList = formatList(phaseTitles);
  const phaseListText = readablePhaseList || 'each network phase';
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="phase-overview-heading" className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/20 text-primary">
          <img
            src="/IMG/Info.svg"
            alt="Phase overview"
            className="h-6 w-6 md:h-7 md:w-7 shrink-0"
            loading="eager"
          />
        </div>
        <div className="space-y-1">
          <h2 id="phase-overview-heading" className="text-xl font-bold text-fg">
            Phase overview
          </h2>
          <p className="text-sm text-fg-muted">
            Track where Telcoin Network stands across {phaseListText}.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {phases.map((phase) => {
          const badge = STATUS_LABELS[phase.status];
          const Icon = NetworkIcon;
          const logo = PHASE_LOGOS[phase.key];

          const subtitle = 'Release';

          return (
            <motion.article
              key={phase.key}
              className="group flex h-full flex-col gap-5 rounded-2xl border-2 border-border/60 bg-card p-6 shadow-soft backdrop-blur transition hover:-translate-y-1 hover:shadow-glow focus-within:-translate-y-1"
              whileHover={{ y: -8 }}
            >
              <header className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary md:h-10 md:w-10">
                    {logo ? (
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="h-auto w-full max-h-9 max-w-9 shrink-0 object-contain md:max-h-10 md:max-w-10"
                        loading="eager"
                        decoding="async"
                      />
                    ) : (
                      <Icon className="h-5 w-5 md:h-6 md:w-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-fg">{phase.title}</h3>
                    <p
                      className="text-xs uppercase tracking-[0.2em] text-fg-muted/70"
                      data-phase-subtitle="release"
                    >
                      {subtitle}
                    </p>
                  </div>
                </div>
                <motion.span
                  aria-label={badge.ariaLabel}
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${badge.className}`}
                  role="status"
                  animate={!reduceMotion && badge.shouldPulse ? { opacity: [1, 0.5, 1] } : undefined}
                  transition={
                    !reduceMotion && badge.shouldPulse
                      ? { duration: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
                      : undefined
                  }
                >
                  {badge.text}
                </motion.span>
              </header>
              <p className="text-sm leading-relaxed text-fg-muted transition group-hover:text-fg">
                {phase.summary}
              </p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
