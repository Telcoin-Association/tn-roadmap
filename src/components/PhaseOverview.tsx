import { motion } from 'framer-motion';
import type { Phase } from '../data/statusSchema';
import { CompassIcon, LaunchIcon, MainnetIcon, NetworkIcon, TestnetIcon } from './icons';
import { formatList } from '../utils/formatList';

const STATUS_LABELS: Record<Phase['status'], { text: string; className: string; ariaLabel: string }> = {
  in_progress: {
    text: 'In progress',
    className: 'bg-primary/10 text-primary border border-primary/40',
    ariaLabel: 'Phase is in progress'
  },
  upcoming: {
    text: 'Upcoming',
    className: 'bg-bg-elev text-fg-muted border border-border/70',
    ariaLabel: 'Phase is upcoming'
  },
  complete: {
    text: 'Complete',
    className: 'bg-success/10 text-success border border-success/30',
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
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
          <CompassIcon className="h-6 w-6" />
        </div>
        <div>
          <h2 id="phase-overview-heading" className="text-xl font-semibold text-fg">
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
              className="group flex h-full flex-col gap-5 rounded-2xl border border-border bg-card/95 p-6 shadow-glow transition focus-within:-translate-y-3"
              whileHover={{ y: -12 }}
            >
              <header className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-fg">{phase.title}</h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-fg-muted/70">{phase.key}</p>
                  </div>
                </div>
                <span
                  aria-label={badge.ariaLabel}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium shadow-sm backdrop-blur ${badge.className}`}
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
