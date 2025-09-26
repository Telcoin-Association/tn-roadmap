import { getUiFlag } from '../utils/uiFlags';

window.__uiFlags = {
  starfield: getUiFlag('starfield'),
  micro: getUiFlag('micro'),
  links: getUiFlag('links'),
};

export {};
