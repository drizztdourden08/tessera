/* @layer tooling-scripts @kind data */
const STEADY_PARTS = [
  { page: 'composites-windowtitlebar--overview', parts: ['.window-title-bar__status', '.window-title-bar [data-bar-item]'] },
  { page: 'primitives-status--overview', parts: ['.status'] },
  { page: 'icons-icon--overview', parts: ['.icon-effect'] },
  { page: 'primitives-emphasis--overview', parts: ['.emphasis--stable'] },
  { page: 'composites-retrybutton--overview', parts: ['.retry-button', '.retry-button .btn'] },
  { page: 'composites-carousel--overview', parts: ['.carousel', '.carousel__viewport', '.carousel__dots'] },
  { page: 'composites-rating--overview', parts: ['.rating'] },
  { page: 'primitives-button--overview', parts: ['.btn--loading'] },
  { page: 'primitives-spinner--overview', parts: [':has(> .spinner)'] },
  { page: 'composites-splash--overview', parts: ['.ts-progress', '.ts-splash'] },
  { page: 'composites-dropdownmenu--overview', parts: ['.dropdown__menu', '.dropdown__item', '.dropdown__mark', '.choice-mark'] },
];

const STEADY_CYCLE_MS = 5000;

const STEADY_SLACK_PX = 0.05;

export { STEADY_CYCLE_MS, STEADY_PARTS, STEADY_SLACK_PX };
