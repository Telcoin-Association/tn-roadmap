import { describe, expect, it } from 'vitest';
import { formatList } from '../formatList';

describe('formatList', () => {
  it('returns empty string for empty input', () => {
    expect(formatList([])).toBe('');
  });

  it('returns single item unchanged', () => {
    expect(formatList(['Horizon'])).toBe('Horizon');
  });

  it('joins two items with and', () => {
    expect(formatList(['Horizon', 'Adiri'])).toBe('Horizon and Adiri');
  });

  it('joins more than two items with commas and and', () => {
    expect(formatList(['Horizon', 'Adiri', 'Mainnet'])).toBe('Horizon, Adiri, and Mainnet');
  });

  it('ignores blank strings', () => {
    expect(formatList(['Horizon', ' ', 'Mainnet'])).toBe('Horizon and Mainnet');
  });
});
