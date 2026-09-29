import { lazy, Suspense, useEffect, useState } from 'react';
import RoadToMainnet from './RoadToMainnet';
import type { Phase, Status } from '../data/statusSchema';

const SecurityAudits = lazy(() => import('./SecurityAudits').then(({ SecurityAudits }) => ({ default: SecurityAudits })));
const LearnMore = lazy(() => import('./LearnMore').then(({ LearnMore }) => ({ default: LearnMore })));

type Tab = 'roadmap' | 'updates' | 'learn';

const TABS: { id: Tab; label: string }[] = [
  { id: 'updates', label: 'Developer Notes' },
  { id: 'roadmap', label: 'Road to Mainnet' },
  { id: 'learn', label: 'Learn More' },
];

interface TabbedPanelProps {
  phases: Phase[];
  links: Status['links'];
  notes: Status['security']['notes'];
}

export function TabbedPanel({ phases, links, notes }: TabbedPanelProps) {
  const [active, setActive] = useState<Tab>('updates');

  useEffect(() => {
    const prefetch = () => {
      void Promise.all([
        import('./SecurityAudits'),
        import('./LearnMore'),
      ]);
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (idleWindow.requestIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(prefetch);
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(prefetch, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-sm">
      <div className="flex overflow-x-auto border-b border-white/[0.06] [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
        {TABS.map((tab) => (
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
        <Suspense fallback={null}>
          {active === 'updates' && <SecurityAudits notes={notes} />}
          {active === 'roadmap' && <RoadToMainnet />}
          {active === 'learn' && <LearnMore phases={phases} links={links} />}
        </Suspense>
      </div>
    </div>
  );
}
