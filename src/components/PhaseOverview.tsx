import { motion } from 'framer-motion';
import type { Phase } from '../data/statusSchema';
import { CompassIcon, LaunchIcon, MainnetIcon, NetworkIcon, TestnetIcon } from './icons';
import { formatList } from '../utils/formatList';

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
          return (
            <motion.article
              key={phase.key}
              className="group flex h-full flex-col gap-5 rounded-2xl border-2 border-border/60 bg-card p-6 shadow-soft backdrop-blur transition hover:-translate-y-1 hover:shadow-glow focus-within:-translate-y-1"
              whileHover={{ y: -8 }}
            >
              <header className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-fg">{phase.title}</h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-fg-muted/70">{phase.key}</p>
                  </div>
                </div>
                <span
                  aria-label={badge.ariaLabel}
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${badge.className}`}
                  role="status"
                >
                  {badge.text}
                </span>
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
