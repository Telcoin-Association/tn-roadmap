import { useCallback } from 'react';
import type { PhaseKey } from '@/data/milestones';
import { MILESTONES } from '@/data/milestones';
import { requestRoadToMainnetTab } from '@/utils/roadToMainnet';

import CheckIconUrl from '/IMG/Checkmark.svg?url';

type Props = { phase: PhaseKey };

export default function MilestoneDropdown({ phase }: Props) {
  const items = MILESTONES[phase];

  const handleMilestoneClick = useCallback(() => {
    requestRoadToMainnetTab(phase, { scroll: true });
  }, [phase]);

  return (
    <div className="mt-6 space-y-4" data-phase-card-milestones="">
      <div
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70"
        data-phase-card-milestones-header=""
      >
        <span className="text-white/80">Milestones</span>
        <span className="text-[0.65rem] font-medium tracking-[0.24em] text-white/40">Road to Mainnet</span>
      </div>

      <ul className="space-y-3" data-phase-card-milestones-list="">
        {items.map((m, i) => (
          <li key={i}>
            <a
              href="#roadmap-heading"
              onClick={handleMilestoneClick}
              className="group flex w-full items-start gap-3 rounded-xl border border-white/5 bg-white/0 px-3 py-3 text-left text-white/90 transition hover:border-white/10 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
              data-phase-card-milestones-item=""
            >
              {m.done ? (
                <img src={CheckIconUrl} alt="" className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
              )}
              <span className="text-sm leading-6 text-white/90 group-hover:text-white">{m.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
