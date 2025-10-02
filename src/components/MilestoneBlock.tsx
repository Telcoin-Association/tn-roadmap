import type { PhaseKey } from '@/data/milestones';
import { MILESTONES } from '@/data/milestones';
import { roadToMainnetId } from '@/utils/ids';
import CheckIconUrl from '/IMG/Checkmark.svg?url';

type Props = { phase: PhaseKey };

type AdiriPhaseGroup = {
  title: string;
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
    items: [
      {
        text: 'Patch Public Vulnerabilities',
        slug: 'patch-public-vulnerabilities',
        targetPhase: 'horizon',
      },
      {
        text: 'Stabilize Horizon Environment',
        slug: 'stabilize-horizon-environment',
        targetPhase: 'horizon',
      },
      {
        text: 'Security Findings Final Patch',
        slug: 'security-findings-final-patch',
        targetPhase: 'horizon',
      },
    ],
  },
  {
    title: 'Phase 2',
    items: [
      {
        text: 'Genesis Opening Ceremony with MNO Partners',
        slug: 'genesis-opening-ceremony-with-mno-partners',
      },
      {
        text: 'MNO Onboarding',
        slug: 'mno-onboarding',
      },
      {
        text: 'Integrate Adiri Testnets with Bridge Solution',
        slug: 'integrate-adiri-testnets-with-bridge-solution',
      },
      {
        text: 'Adiri Alpha Audits',
        slug: 'adiri-alpha-audits',
      },
    ],
  },
];

export default function MilestoneBlock({ phase }: Props) {
  if (phase === 'adiri') {
    return (
      <div data-phase-card-milestones="">
        <div className="flex w-full items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90">
          <span>Milestones</span>
        </div>
        <div className="mt-3 space-y-4">
          {ADIRI_PHASE_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{group.title}</h4>
              <ul className="mt-2 space-y-2">
                {group.items.map((item) => {
                  const targetPhase = item.targetPhase ?? phase;
                  const targetId = roadToMainnetId(targetPhase, item.slug);
                  const href = `#${targetId}`;
                  return (
                    <li key={item.slug} className="flex items-start gap-3">
                      <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
                      <a href={href} className="text-sm leading-6 text-white/90 hover:underline">
                        {item.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
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
