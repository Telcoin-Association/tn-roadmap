import { describe, expect, it } from 'vitest';
import { formatList } from '../formatList';

describe('formatList', () => {
  it('returns empty string for empty input', () => {
    expect(formatList([])).toBe('');
  });

  it('returns single item unchanged', () => {
    expect(formatList(['Genesis'])).toBe('Genesis');
  });

  it('joins two items with and', () => {
    expect(formatList(['Genesis', 'Horizon'])).toBe('Genesis and Horizon');
  });

  it('joins more than two items with commas and and', () => {
    expect(formatList(['Genesis', 'Horizon', 'Zeinith'])).toBe('Genesis, Horizon, and Zeinith');
  });

  it('ignores blank strings', () => {
    expect(formatList(['Genesis', ' ', 'Zeinith'])).toBe('Genesis and Zeinith');
  });
});
