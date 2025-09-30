import { useState, type FocusEventHandler } from 'react';
import type { PhaseKey } from '@/data/milestones';
import { MILESTONES } from '@/data/milestones';
import { requestRoadToMainnetTab } from '@/utils/roadToMainnet';

import CheckIconUrl from '/IMG/Checkmark.svg?url';

type Props = { phase: PhaseKey };

export default function MilestoneDropdown({ phase }: Props) {
  const [open, setOpen] = useState(false);
  const items = MILESTONES[phase];

  const handleFocusOut: FocusEventHandler<HTMLDivElement> = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
    }
  };

  const handleMilestoneClick = () => {
    requestRoadToMainnetTab(phase, { scroll: true });
  };

  return (
    <div
      className="mt-5"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={handleFocusOut}
    >
      <div
        className="inline-flex cursor-default items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/90"
        aria-expanded={open}
        data-phase-card-milestones-toggle=""
        tabIndex={0}
      >
        <span>Milestones</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.174l3.71-2.943a.75.75 0 11.94 1.166l-4.24 3.363a.75.75 0 01-.94 0L5.21 8.396a.75.75 0 01.02-1.186z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        data-phase-card-milestones-panel=""
      >
        <ul className="mt-3 space-y-2">
          {items.map((m, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={handleMilestoneClick}
                className="flex w-full items-start gap-3 rounded-lg px-1 py-1 text-left text-white/90 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
                data-phase-card-milestones-item=""
              >
                {m.done ? (
                  <img src={CheckIconUrl} alt="" className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
                )}
                <span className="text-sm leading-6">{m.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
