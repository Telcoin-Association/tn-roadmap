import { describe, expect, it } from 'vitest';
import { getLatestDeveloperNotesDate } from '../developerNotes';
import { getNewInUpdateItems, isUpdatedWithinLast24Hours } from '../milestones';
import { getWhatsNew } from '../whatsNew';

describe('isUpdatedWithinLast24Hours', () => {
  it('includes a same-day date-only tag against an ISO as-of timestamp', () => {
    expect(isUpdatedWithinLast24Hours('2026-08-20', '2026-08-20T00:00:00Z')).toBe(true);
    expect(isUpdatedWithinLast24Hours('2026-08-20', '2026-08-20T21:36:00Z')).toBe(true);
  });

  it('includes a tag from the previous 24 hours', () => {
    expect(isUpdatedWithinLast24Hours('2026-08-19T12:00:00Z', '2026-08-20T12:00:00Z')).toBe(true);
  });

  it('excludes tags older than 24 hours', () => {
    expect(isUpdatedWithinLast24Hours('2026-08-18', '2026-08-20T00:00:00Z')).toBe(false);
    expect(isUpdatedWithinLast24Hours('2026-07-31', '2026-08-20T00:00:00Z')).toBe(false);
  });

  it('excludes future tags and invalid values', () => {
    expect(isUpdatedWithinLast24Hours('2026-08-21', '2026-08-20T00:00:00Z')).toBe(false);
    expect(isUpdatedWithinLast24Hours('', '2026-08-20T00:00:00Z')).toBe(false);
    expect(isUpdatedWithinLast24Hours('not-a-date', '2026-08-20T00:00:00Z')).toBe(false);
  });
});

describe('getNewInUpdateItems', () => {
  it('returns milestones tagged within 24 hours of the latest notes timestamp', () => {
    const items = getNewInUpdateItems('2026-08-20T00:00:00Z');
    const slugs = items.map((item) => item.slug);
    expect(slugs).toContain('fork-adiri-testnet-audited-consensus-registry');
    expect(slugs).toContain('deterministic-entropy-validator-selection');
    expect(slugs).toContain('onboard-dvns-for-mainnet-bridge');
    expect(slugs).toContain('snapshot-support-instant-syncing');
    expect(slugs).toContain('finalize-native-token-strategy-tel3-telip');
  });

  it('does not return tags from a prior update more than 24 hours ago', () => {
    const items = getNewInUpdateItems('2026-08-22T00:00:00Z');
    expect(items).toEqual([]);
  });
});

describe('getWhatsNew', () => {
  it('lists only milestones from the last 24 hours, without embedding note bodies', () => {
    const whatsNew = getWhatsNew();
    const slugs = whatsNew.milestones.map((item) => item.slug);

    expect(whatsNew.date).toBe(getLatestDeveloperNotesDate());
    expect(whatsNew).not.toHaveProperty('notes');
    expect(slugs).toContain('fork-adiri-testnet-audited-consensus-registry');
    expect(slugs).toContain('deterministic-entropy-validator-selection');
    expect(slugs).toContain('onboard-dvns-for-mainnet-bridge');
    expect(slugs).toContain('snapshot-support-instant-syncing');
    expect(slugs).toContain('finalize-native-token-strategy-tel3-telip');
  });
});
