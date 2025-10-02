import type { PhaseKey } from '@/data/milestones';
import { MILESTONES } from '@/data/milestones';
import { roadToMainnetId } from '@/utils/ids';
import CheckIconUrl from '/IMG/Checkmark.svg?url';

type Props = { phase: PhaseKey };

export default function MilestoneBlock({ phase }: Props) {
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
          const showAdiriPhaseOneDetails =
            phase === 'adiri' && m.slug === 'phase-1' && m.details && m.details.length > 0;

          return (
            <li key={i} className="flex items-start gap-3">
              {m.done ? (
                <img src={CheckIconUrl} alt="" className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
              )}
              <div>
                {/* Link ties down to Road to mainnet detail item */}
                <a href={href} className="text-sm leading-6 text-white/90 hover:underline">
                  {m.text}
                </a>
                {showAdiriPhaseOneDetails && (
                  <ul className="mt-1 list-disc pl-5 text-xs leading-5 text-white/80">
                    {m.details?.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
