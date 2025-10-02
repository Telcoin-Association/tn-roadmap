import type { PhaseKey } from '@/data/milestones';
import { MILESTONES } from '@/data/milestones';
import { roadToMainnetId } from '@/utils/ids';
import CheckIconUrl from '/IMG/Checkmark.svg?url';
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
  '- Launch Mainnet',
  'Cryptography security assessment',
  'P2P Network security assessment',
  'Smart contract security assessments',
  'Execution layer security assessment',
  'State synchronization security assessment',
  'Patch security findings',
];

export default function MilestoneBlock({ phase }: Props) {
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
                    return (
                      <li key={item.slug} className="flex items-start gap-3">
                        {group.icon === 'check' ? (
                          <img src={CheckIconUrl} alt="" className="mt-0.5 h-4 w-4 shrink-0" />
                        ) : group.icon === 'timer' ? (
                          <TimerIcon className="mt-0.5 h-4 w-4 shrink-0 text-white/80" />
                        ) : group.icon === 'loading' ? (
                          <img
                            src={LoadingIconUrl}
                            alt=""
                            className="mt-0.5 h-4 w-4 shrink-0 text-white/80 motion-safe:animate-spin-slow"
                          />
                        ) : (
                          <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
                        )}
                        <span
                          className={`text-sm leading-6 text-white/90 ${
                            group.title === 'Phase 2' && item.slug === 'patch-security-findings'
                              ? 'font-semibold text-white motion-safe:animate-pulse'
                              : ''
                          }`}
                        >
                          {item.text}
                        </span>
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
