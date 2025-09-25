import rawStatus from '../../status.json';
import { statusSchema, type Status } from './statusSchema';

let cachedStatus: Status | null = null;

export function loadStatus(): Status {
  if (!cachedStatus) {
    cachedStatus = statusSchema.parse(rawStatus);
  }

  return cachedStatus;
}

export type { Status };
