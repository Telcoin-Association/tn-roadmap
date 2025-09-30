import type { PhaseKey } from '@/data/milestones';

export const ROAD_TO_MAINNET_EVENT = 'road-to-mainnet:set-tab';

export type RoadToMainnetEventDetail = {
  phase: PhaseKey;
  scroll?: boolean;
};

export function requestRoadToMainnetTab(phase: PhaseKey, options?: { scroll?: boolean }) {
  if (typeof document === 'undefined') {
    return;
  }

  document.dispatchEvent(
    new CustomEvent<RoadToMainnetEventDetail>(ROAD_TO_MAINNET_EVENT, {
      detail: { phase, scroll: options?.scroll },
    }),
  );
}
