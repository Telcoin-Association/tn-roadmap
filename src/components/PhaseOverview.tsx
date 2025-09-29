import { motion, useReducedMotion } from 'framer-motion';
import type { Phase } from '../data/statusSchema';
import { CompassIcon, LaunchIcon, MainnetIcon, NetworkIcon, TestnetIcon } from './icons';
import adiriLogo from '../assets/adiri.svg';
import horizonLogo from '../assets/horizon.svg';
import { formatList } from '../utils/formatList';

const STATUS_LABELS: Record<Phase['status'], { text: string; className: string; ariaLabel: string; shouldPulse?: boolean }> = {
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

const PHASE_ICONS: Partial<Record<Phase['key'], typeof NetworkIcon>> = {
  devnet: LaunchIcon,
  testnet: TestnetIcon,
  mainnet: MainnetIcon
};

const PHASE_LOGOS: Partial<
  Record<Phase['key'], { alt: string; src: string }>
> = {
  devnet: { src: horizonLogo, alt: 'Horizon phase logo' },
  testnet: { src: adiriLogo, alt: 'Adiri phase logo' }
};

const PHASE_CODE_NAMES: Record<Phase['key'], string> = {
  devnet: 'Horizon',
  testnet: 'Adiri',
  mainnet: 'Mainnet'
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
          <CompassIcon className="h-6 w-6" />
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
          const Icon = PHASE_ICONS[phase.key] ?? NetworkIcon;
          const logo = PHASE_LOGOS[phase.key];
          return (
            <motion.article
              key={phase.key}
              className="group flex h-full flex-col gap-5 rounded-2xl border-2 border-border/60 bg-card p-6 shadow-soft backdrop-blur transition hover:-translate-y-1 hover:shadow-glow focus-within:-translate-y-1"
              whileHover={{ y: -8 }}
            >
              <header className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    {logo ? (
                      <img
                        alt={logo.alt}
                        className="h-9 w-9"
                        src={logo.src}
                      />
                    ) : (
                      <Icon className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-fg">{phase.title}</h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-fg-muted/70">
                      {PHASE_CODE_NAMES[phase.key]}
                    </p>
                  </div>
                </div>
                <motion.span
                  aria-label={badge.ariaLabel}
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${badge.className}`}
                  role="status"
                  animate={
                    !reduceMotion && badge.shouldPulse ? { opacity: [1, 0.5, 1] } : undefined
                  }
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
