import { motion, useReducedMotion } from 'framer-motion';

import type { PhaseKey } from '@/data/milestones';
import { ADIRI_PHASE_3_ITEMS, MILESTONES } from '@/data/milestones';
import { roadToMainnetId } from '@/utils/ids';
import CheckIconUrl from '/IMG/Checkmark.svg?url';
import ActivityIconUrl from '/IMG/activity.svg?url';
import { TimerIcon } from './icons';
import LoadingIconUrl from '/IMG/Loading.svg?url';

type Props = { phase: PhaseKey };
type MilestoneItemStatus = 'completed' | 'in_progress' | 'queued';

type AdiriPhaseGroup = {
  title: string;
  icon: 'check' | 'timer' | 'loading';
  href: string;
  items: {
    text: string;
    slug: string;
  }[];
};

const ACTIVE_PHASE_2_SLUGS = new Set([
  'production-harden-p2p-networking',
  'stress-test-deployed-network',
  'custom-tn-rpc-endpoints',
]);

const ACTIVE_PHASE_3_SLUGS = new Set(
  ADIRI_PHASE_3_ITEMS.filter(({ inProgress }) => inProgress).map(({ slug }) => slug),
);

const NEWLY_ACTIVE_PHASE_2_SLUGS = new Set([
  'support-multiple-workers-for-parallel-fee-markets',
  'tn-whitepaper',
]);

const ADIRI_PHASE_GROUPS: AdiriPhaseGroup[] = [
  {
    title: 'Phase 1',
    icon: 'check',
    href: '#road-to-mainnet-horizon-tab',
    items: [
      {
        text: 'Pre cantina competition',
        slug: 'pre-cantina-competition',
      },
      {
        text: 'Initial spin up of TAO controlled validator nodes',
        slug: 'initial-spin-up-of-tao-controlled-validator-nodes',
      },
      {
        text: 'Launch block explorer',
        slug: 'launch-block-explorer',
      },
      {
        text: 'Demo PoC',
        slug: 'demo-poc',
      },
      {
        text: 'Feature complete',
        slug: 'feature-complete',
      },
      {
        text: '4-week security assessment',
        slug: '4-week-security-assessment',
      },
    ],
  },
  {
    title: 'Phase 2',
    icon: 'loading',
    href: '#road-to-mainnet-adiri-tab',
    items: MILESTONES.adiri.map(({ text, slug }) => ({ text, slug })),
  },
  {
    title: 'Phase 3',
    icon: 'loading',
    href: '#road-to-mainnet-adiri-phase-3-tab',
    items: ADIRI_PHASE_3_ITEMS.map(({ text, slug }) => ({ text, slug })),
  },
];

const MAINNET_PHASE_ITEMS = [
  'Launch Mainnet',
  'Cryptography security assessment',
  'P2P Network security assessment',
  'Smart contract security assessments',
  'Execution layer security assessment',
  'State synchronization security assessment',
  'Patch security findings',
];

const STATUS_SORT_ORDER: Record<MilestoneItemStatus, number> = {
  completed: 0,
  in_progress: 1,
  queued: 2,
};

const ADIRI_MILESTONE_STATUS = new Map(MILESTONES.adiri.map(({ slug, done }) => [slug, Boolean(done)]));

const getAdiriItemStatus = (group: AdiriPhaseGroup, slug: string): MilestoneItemStatus => {
  if (group.title === 'Phase 2' && ADIRI_MILESTONE_STATUS.get(slug)) {
    return 'completed';
  }

  if (
    (group.title === 'Phase 2' &&
      (ACTIVE_PHASE_2_SLUGS.has(slug) || NEWLY_ACTIVE_PHASE_2_SLUGS.has(slug))) ||
    (group.title === 'Phase 3' && ACTIVE_PHASE_3_SLUGS.has(slug))
  ) {
    return 'in_progress';
  }

  if (group.icon === 'check') {
    return 'completed';
  }

  return 'queued';
};

export default function MilestoneBlock({ phase }: Props) {
  const reduceMotion = useReducedMotion();

  if (phase === 'adiri') {
    return (
      <div data-phase-card-milestones="">
        <div className="flex w-full items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90">
          <span>Milestones</span>
        </div>
        <div className="mt-3 space-y-4">
          {ADIRI_PHASE_GROUPS.map((group) => {
            const isOpenByDefault = group.title === 'Phase 2' || group.title === 'Phase 3';
            const sortedItems = [...group.items].sort((a, b) => {
              const aOrder = STATUS_SORT_ORDER[getAdiriItemStatus(group, a.slug)];
              const bOrder = STATUS_SORT_ORDER[getAdiriItemStatus(group, b.slug)];
              return aOrder - bOrder;
            });
            return (
              <details
                key={group.title}
                open={isOpenByDefault}
                className="group/section rounded-lg border border-white/10 bg-white/[0.03]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2 marker:content-['']">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    {group.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-sm text-white/60 transition-transform group-open/section:rotate-180"
                  >
                    ▾
                  </span>
                </summary>
                <div className="px-3 pb-3">
                  <a
                    href={group.href}
                    className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/55 transition hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    View details
                  </a>
                  <ul className="mt-2 space-y-2">
                    {sortedItems.map((item) => {
                      const itemStatus = getAdiriItemStatus(group, item.slug);
                      const isInProgress = itemStatus === 'in_progress';
                      const shouldAnimate = isInProgress && !reduceMotion;

                      const renderIcon = () => {
                        if (itemStatus === 'completed') {
                          return <img src={CheckIconUrl} alt="" className="mt-0.5 h-4 w-4 shrink-0" />;
                        }

                        if (isInProgress) {
                          return (
                            <motion.img
                              src={ActivityIconUrl}
                              alt=""
                              className="mt-0.5 h-4 w-4 shrink-0"
                              animate={shouldAnimate ? { opacity: [1, 0.5, 1] } : undefined}
                              transition={
                                shouldAnimate
                                  ? {
                                      duration: 1.2,
                                      repeat: Infinity,
                                      repeatType: 'reverse',
                                      ease: 'easeInOut',
                                    }
                                  : undefined
                              }
                            />
                          );
                        }

                        if (group.icon === 'check') {
                          return <img src={CheckIconUrl} alt="" className="mt-0.5 h-4 w-4 shrink-0" />;
                        }

                        if (group.icon === 'timer') {
                          return <TimerIcon className="mt-0.5 h-4 w-4 shrink-0 text-white/80" />;
                        }

                        if (group.icon === 'loading') {
                          return (
                            <img
                              src={LoadingIconUrl}
                              alt=""
                              className="mt-0.5 h-4 w-4 shrink-0 text-white/80 motion-safe:animate-spin-slow"
                            />
                          );
                        }

                        return <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />;
                      };

                      return (
                        <li key={item.slug} className="flex items-start gap-3">
                          {renderIcon()}
                          {isInProgress ? (
                            <span className="text-sm font-semibold leading-6 text-white">{item.text}</span>
                          ) : (
                            <span className="text-sm leading-6 text-white/90">{item.text}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    );
  }

  if (phase === 'mainnet') {
    return (
      <div data-phase-card-milestones="">
        <div className="flex w-full items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90">
          <span>Milestones</span>
        </div>
        <ul className="mt-3 space-y-2">
          {MAINNET_PHASE_ITEMS.map((text) => (
            <li key={text} className="flex items-start gap-3">
              <img
                src={LoadingIconUrl}
                alt=""
                className="mt-0.5 h-4 w-4 shrink-0 motion-safe:animate-spin-slow"
              />
              <span className="text-sm leading-6 text-white/90">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const items = MILESTONES[phase];
  const sortedItems = [...items].sort((a, b) => {
    const aOrder = a.done ? STATUS_SORT_ORDER.completed : STATUS_SORT_ORDER.queued;
    const bOrder = b.done ? STATUS_SORT_ORDER.completed : STATUS_SORT_ORDER.queued;
    return aOrder - bOrder;
  });

  return (
    <div data-phase-card-milestones="">
      {/* Mini header pill */}
      <div className="flex w-full items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90">
        <span>Milestones</span>
      </div>

      {/* Always-open list */}
      <ul className="mt-3 space-y-2">
        {sortedItems.map((m, i) => {
          const targetId = roadToMainnetId(phase, m.slug);
          const href = `#${targetId}`;
          return (
            <li key={i} className="flex items-start gap-3">
              {m.done ? (
                <img src={CheckIconUrl} alt="" className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
              )}
              {/* Link ties down to Road to mainnet detail item */}
              <a href={href} className="text-sm leading-6 text-white/90 hover:underline">
                {m.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
