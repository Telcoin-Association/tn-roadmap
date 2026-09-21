import { useState } from 'react';
import RoadToMainnet from './RoadToMainnet';
import { SecurityAudits } from './SecurityAudits';
import { LearnMore } from './LearnMore';
import { LatestUpdates } from './LatestUpdates';
import { getWhatsNew } from '@/data/whatsNew';
import type { Phase, Status } from '../data/statusSchema';

type Tab = 'roadmap' | 'whats-new' | 'updates' | 'learn';

const TABS: { id: Tab; label: string }[] = [
  { id: 'roadmap', label: 'Road to Mainnet' },
  { id: 'whats-new', label: "What's New" },
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
  const { milestones: newItems } = getWhatsNew();
  const whatsNewTab = TABS.find((t) => t.id === 'whats-new')!;
  const visibleTabs = newItems.length > 0 ? TABS : TABS.filter((t) => t.id !== 'whats-new');

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-sm">
      <div className="flex overflow-x-auto border-b border-white/[0.06] [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={[
              'shrink-0 px-5 py-3.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
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
        {active === 'whats-new' && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                <span className="inline-flex items-center rounded-full border border-success/40 bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">Live</span>
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-fg">What's New</h2>
                <p className="text-sm text-fg-muted">Tagged milestone updates from the last 24 hours.</p>
              </div>
            </div>
            <LatestUpdates />
          </div>
        )}
        {active === 'updates' && <SecurityAudits notes={notes} />}
        {active === 'learn' && <LearnMore phases={phases} links={links} />}
      </div>
    </div>
  );
}
