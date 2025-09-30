export function roadToMainnetId(phase: 'horizon' | 'adiri' | 'mainnet', slug: string) {
  return `road-to-mainnet-${phase}-${slug}`;
}
export const ROAD_TO_MAINNET_SECTION_ID = 'road-to-mainnet';
