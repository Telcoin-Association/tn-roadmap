import { motion, useReducedMotion } from 'framer-motion';

import type { PhaseKey } from '@/data/milestones';
import { MILESTONES } from '@/data/milestones';
import { roadToMainnetId } from '@/utils/ids';
import CheckIconUrl from '/IMG/Checkmark.svg?url';
import ActivityIconUrl from '/IMG/activity.svg?url';
import { TimerIcon } from './icons';
import LoadingIconUrl from '/IMG/Loading.svg?url';

type Props = { phase: PhaseKey };

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
  'patch-security-findings',
  'enhance-test-coverage',
  'production-harden-code-base',
  'improve-documentation',
  'stress-test-deployed-network',
]);

const COMPLETED_PHASE_2_SLUGS = new Set([
  'write-mica-whitepaper-with-legal-now',
  'improve-async-logging-for-all-nodes',
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
        text: 'Production harden code base',
        slug: 'production-harden-code-base',
      },
      {
        text: 'Improve documentation',
        slug: 'improve-documentation',
      },
      {
        text: 'MiCA whitepaper (with legal now)',
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
        text: 'Deploy new faucet service',
        slug: 'deploy-new-faucet-service',
      },
      {
        text: 'Relaunch network',
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
        text: 'Integrate Adiri testnet with bridge solution',
        slug: 'integrate-adiri-testnet-with-bridge-solution',
      },
      {
        text: 'Decentralize network (onboard MNO Validators)',
        slug: 'decentralize-network-onboard-mno-validators',
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
            return (
              <div key={group.title}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                  <a
                    href={group.href}
                    className="inline-flex items-center gap-1 text-current transition hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {group.title}
                  </a>
                </h4>
                <ul className="mt-2 space-y-2">
                  {group.items.map((item) => {
                    const isActivePhase2Item =
                      group.title === 'Phase 2' && ACTIVE_PHASE_2_SLUGS.has(item.slug);
                    const isCompletedPhase2Item =
                      group.title === 'Phase 2' && COMPLETED_PHASE_2_SLUGS.has(item.slug);
                    const shouldAnimate = isActivePhase2Item && !reduceMotion;

                    const renderIcon = () => {
                      if (isCompletedPhase2Item) {
                        return <img src={CheckIconUrl} alt="" className="mt-0.5 h-4 w-4 shrink-0" />;
                      }

                      if (isActivePhase2Item) {
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
                        {isActivePhase2Item ? (
                          <span className="text-sm font-semibold leading-6 text-white">{item.text}</span>
                        ) : isCompletedPhase2Item ? (
                          <span className="text-sm leading-6 text-white/90">{item.text}</span>
                        ) : (
                          <span className="text-sm leading-6 text-white/90">{item.text}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
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

  return (
    <div data-phase-card-milestones="">
      {/* Mini header pill */}
      <div className="flex w-full items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90">
        <span>Milestones</span>
      </div>

      {/* Always-open list */}
      <ul className="mt-3 space-y-2">
        {items.map((m, i) => {
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
