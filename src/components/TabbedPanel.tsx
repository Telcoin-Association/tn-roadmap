import { useState } from 'react';
import RoadToMainnet from './RoadToMainnet';
import { SecurityAudits } from './SecurityAudits';
import { LearnMore } from './LearnMore';
import type { Phase, Status } from '../data/statusSchema';

type Tab = 'roadmap' | 'updates' | 'learn';

const TABS: { id: Tab; label: string }[] = [
  { id: 'roadmap', label: 'Road to Mainnet' },
  { id: 'updates', label: 'Developer Notes' },
  { id: 'learn', label: 'Learn More' },
];

interface TabbedPanelProps {
  phases: Phase[];
  links: Status['links'];
  notes: Status['security']['notes'];
}

export function TabbedPanel({ phases, links, notes }: TabbedPanelProps) {
  const [active, setActive] = useState<Tab>('roadmap');

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-sm">
      <div className="flex border-b border-white/[0.06]">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={[
              'px-5 py-3.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              active === tab.id
                ? 'border-b-2 border-primary text-fg'
                : 'text-fg-muted hover:text-fg border-b-2 border-transparent',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6 md:p-8">
        {active === 'roadmap' && <RoadToMainnet />}
        {active === 'updates' && <SecurityAudits notes={notes} />}
        {active === 'learn' && <LearnMore phases={phases} links={links} />}
      </div>
    </div>
  );
}
