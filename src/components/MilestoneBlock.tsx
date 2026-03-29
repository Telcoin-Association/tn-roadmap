import { motion, useReducedMotion } from 'framer-motion';

import type { PhaseKey } from '@/data/milestones';
import { MILESTONES } from '@/data/milestones';
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
    /** Allows linking to milestones that live under other phase keys */
    targetPhase?: PhaseKey;
  }[];
};

const ACTIVE_PHASE_2_SLUGS = new Set([
  'production-harden-p2p-networking',
  'stress-test-deployed-network',
  'custom-tn-rpc-endpoints',
]);

const COMPLETED_PHASE_2_SLUGS = new Set([
  'patch-security-findings',
  'enhance-test-coverage',
  'production-harden-database-read-write-strategy',
  'improve-documentation',
  'write-mica-whitepaper-with-legal-now',
  'improve-async-logging-for-all-nodes',
  'updates-to-support-open-source-contributions',
  'parallelize-testing-infrastructure-for-faster-more-reliable-testing',
  'production-harden-syncing-strategy',
  'confirm-specialist-researcher-availability',
  'isolate-execution-environment',
  'deploy-new-faucet-service',
  'support-p2p-streaming-for-bulk-data-transfer',
  'streamline-database-infrastructure-for-production',
  'harden-epoch-boundary-records-for-secure-syncing',
  'better-tools-for-validators-to-sync-stake-and-activate',
  'relaunch-network',
]);

const ACTIVE_PHASE_3_SLUGS = new Set([
  'integrate-adiri-testnet-with-bridge-solution',
  'decentralize-network-onboard-mno-validators',
  'ai-security-scans',
  'improve-batch-build-times-for-increased-transaction-throughput',
  'support-for-dapps-to-build-on-observer-nodes-directly-exex-feature',
  'launch-community-driven-testing-tools',
]);

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
    items: [
      {
        text: 'Patch security findings',
        slug: 'patch-security-findings',
      },
      {
        text: 'Enhance test coverage',
        slug: 'enhance-test-coverage',
      },
      {
        text: 'Production harden database read/write strategy',
        slug: 'production-harden-database-read-write-strategy',
      },
      {
        text: 'Production harden p2p networking',
        slug: 'production-harden-p2p-networking',
      },
      {
        text: 'Production harden syncing strategy',
        slug: 'production-harden-syncing-strategy',
      },
      {
        text: 'Improve documentation',
        slug: 'improve-documentation',
      },
      {
        text: 'MiCA whitepaper',
        slug: 'write-mica-whitepaper-with-legal-now',
      },
      {
        text: 'Improve async logging for all nodes in the network',
        slug: 'improve-async-logging-for-all-nodes',
      },
      {
        text: 'Stress test deployed network in preparation for public release',
        slug: 'stress-test-deployed-network',
      },
      {
        text: 'Confirming availability of specialist researchers with security partners',
        slug: 'confirm-specialist-researcher-availability',
      },
      {
        text: 'Support p2p streaming for bulk data transfer',
        slug: 'support-p2p-streaming-for-bulk-data-transfer',
      },
      {
        text: 'Streamline database infrastructure for production',
        slug: 'streamline-database-infrastructure-for-production',
      },
      {
        text: 'Custom TN RPC endpoints',
        slug: 'custom-tn-rpc-endpoints',
      },
      {
        text: 'Harden epoch boundary records for secure syncing',
        slug: 'harden-epoch-boundary-records-for-secure-syncing',
      },
      {
        text: 'Better tools for validators to sync, stake, and activate',
        slug: 'better-tools-for-validators-to-sync-stake-and-activate',
      },
      {
        text: 'Updates to support open-source contributions',
        slug: 'updates-to-support-open-source-contributions',
      },
      {
        text: 'Parallelize testing infrastructure for faster, more reliable testing',
        slug: 'parallelize-testing-infrastructure-for-faster-more-reliable-testing',
      },
      {
        text: 'Support multiple workers for parallel fee markets',
        slug: 'support-multiple-workers-for-parallel-fee-markets',
      },
      {
        text: 'Deploy new faucet service',
        slug: 'deploy-new-faucet-service',
      },
      {
        text: 'TN Whitepaper',
        slug: 'tn-whitepaper',
      },
      {
        text: 'Isolate execution environment',
        slug: 'isolate-execution-environment',
      },
      {
        text: 'Relaunch Network',
        slug: 'relaunch-network',
      },
    ],
  },
  {
    title: 'Phase 3',
    icon: 'loading',
    href: '#road-to-mainnet-adiri-phase-3-tab',
    items: [
      {
        text: 'Integrate with LayerZero',
        slug: 'integrate-adiri-testnet-with-bridge-solution',
      },
      {
        text: 'Decentralize network (onboard MNO Validators)',
        slug: 'decentralize-network-onboard-mno-validators',
      },
      {
        text: 'AI security scans',
        slug: 'ai-security-scans',
      },
      {
        text: 'Improve batch build times for increased transaction throughput',
        slug: 'improve-batch-build-times-for-increased-transaction-throughput',
      },
      {
        text: 'Support for dapps to build on observer nodes directly (ExEx feature)',
        slug: 'support-for-dapps-to-build-on-observer-nodes-directly-exex-feature',
      },
      {
        text: 'Launch community driven testing tools',
        slug: 'launch-community-driven-testing-tools',
      },
      {
        text: 'Improve syncing times for new nodes',
        slug: 'improve-syncing-times-for-new-nodes',
      },
    ],
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

const getAdiriItemStatus = (group: AdiriPhaseGroup, slug: string): MilestoneItemStatus => {
  if (group.title === 'Phase 2' && COMPLETED_PHASE_2_SLUGS.has(slug)) {
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
