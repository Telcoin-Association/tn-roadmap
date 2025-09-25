import statusFixture from '../../status.json';
import { statusSchema } from '../../src/data/statusSchema';

describe('statusSchema', () => {
  it('accepts the committed status.json fixture', () => {
    expect(() => statusSchema.parse(statusFixture)).not.toThrow();
  });

  it('rejects invalid progress percentages', () => {
    const invalid = structuredClone(statusFixture);
    invalid.meta.overallTrajectoryPct = 120;

    expect(() => statusSchema.parse(invalid)).toThrow();
  });
});
