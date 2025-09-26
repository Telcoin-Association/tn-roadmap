const DEFAULT_FLAGS = {
  micro: true,
  links: true
} as const;

type FlagName = keyof typeof DEFAULT_FLAGS;

declare global {
  interface Window {
    __uiFlags?: Partial<Record<FlagName, boolean>>;
  }
}

export function getUiFlag(flag: FlagName): boolean {
  if (typeof window === 'undefined') {
    return DEFAULT_FLAGS[flag];
  }

  window.__uiFlags = { ...DEFAULT_FLAGS, ...window.__uiFlags };

  return window.__uiFlags?.[flag] ?? DEFAULT_FLAGS[flag];
}

if (typeof window !== 'undefined') {
  window.__uiFlags = { ...DEFAULT_FLAGS, ...window.__uiFlags };
}
