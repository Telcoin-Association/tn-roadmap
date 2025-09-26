import './ui-flags';

type Initializer = () => void | Promise<void>;

type FeatureLoader = () => Promise<{ default?: Initializer; initStarfield?: Initializer }>;

const loadStarfield: FeatureLoader = () => import('../background/starfield');

function runInitializer(initializer: Initializer | undefined) {
  if (!initializer) {
    return;
  }

  try {
    initializer();
  } catch (error) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn('[ui:init] feature failed to initialize', error);
    }
  }
}

function whenDocumentReady(callback: () => void) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    callback();
    return;
  }

  document.addEventListener('DOMContentLoaded', callback, { once: true });
}

whenDocumentReady(() => {
  if (window.__uiFlags?.starfield) {
    window.requestAnimationFrame(() => {
      loadStarfield().then((module) => {
        runInitializer(module.initStarfield ?? module.default);
      }).catch((error) => {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.error('[ui:init] failed to load starfield module', error);
        }
      });
    });
  }
});
