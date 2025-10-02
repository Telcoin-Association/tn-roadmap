import type { PhaseKey } from '@/data/milestones';
import { MILESTONES } from '@/data/milestones';
import { roadToMainnetId } from '@/utils/ids';
import CheckIconUrl from '/IMG/Checkmark.svg?url';
import { TimerIcon } from './icons';

type Props = { phase: PhaseKey };

type AdiriPhaseGroup = {
  title: string;
  icon: 'check' | 'timer';
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
    icon: 'timer',
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
    icon: 'timer',
    items: [
      {
        text: 'Integrate Adiri testnet with bridge solution',
        slug: 'integrate-adiri-testnet-with-bridge-solution',
      },
      {
        text: 'Decentralize network (onboard partners)',
        slug: 'decentralize-network-onboard-partners',
      },
    ],
  },
];

const MAINNET_PHASE_ITEMS = [
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
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{group.title}</h4>
                <ul className="mt-2 space-y-2">
                  {group.items.map((item) => {
                    const targetPhase = item.targetPhase ?? phase;
                    const targetId = roadToMainnetId(targetPhase, item.slug);
                    const href = `#${targetId}`;
                    return (
                      <li key={item.slug} className="flex items-start gap-3">
                        {group.icon === 'check' ? (
                          <img src={CheckIconUrl} alt="" className="mt-0.5 h-4 w-4 shrink-0" />
                        ) : group.icon === 'timer' ? (
                          <TimerIcon className="mt-0.5 h-4 w-4 shrink-0 text-white/80" />
                        ) : (
                          <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
                        )}
                        <a href={href} className="text-sm leading-6 text-white/90 hover:underline">
                          {item.text}
                        </a>
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
              <TimerIcon className="mt-0.5 h-4 w-4 shrink-0 text-white/80" />
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
