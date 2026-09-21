import { getWhatsNew } from '@/data/whatsNew';

export function LatestUpdates() {
  const { milestones: newItems } = getWhatsNew();
  const inProgressItems = newItems.filter((item) => item.inProgress && !item.done);
  const completeItems = newItems.filter((item) => item.done);

  if (newItems.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-sm text-fg-muted">
        No recent updates.
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {inProgressItems.length > 0 && (
          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-primary">
              In Progress
            </h3>
            <ul className="space-y-2">
              {inProgressItems.map((item) => (
                <li key={item.slug}>
                  <a
                    href={`#road-to-mainnet-adiri-phase-3-${item.slug}`}
                    className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/10 px-2 py-1.5 text-sm text-fg transition hover:bg-primary/15"
                  >
                    <span className="leading-snug">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {completeItems.length > 0 && (
          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-success">
              Complete
            </h3>
            <ul className="space-y-2">
              {completeItems.map((item) => (
                <li key={item.slug}>
                  <a
                    href={`#road-to-mainnet-adiri-phase-3-${item.slug}`}
                    className="flex items-center gap-3 rounded-lg border border-success/20 bg-success/10 px-2 py-1.5 text-sm text-fg transition hover:bg-success/15"
                  >
                    <span className="leading-snug">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <a
        href="#security-section"
        className="mt-4 inline-block px-2 text-xs font-medium text-primary hover:underline"
      >
        Developer Notes ↓
      </a>
    </div>
  );
}
