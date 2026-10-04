/* @layer stories @kind logic */
import { SPLASH_MARK, SPLASH_TITLE, SPLASH_VERSION } from './splash-states.constants';
import type { SplashSample } from './splash-states.type';

const statusLine = (sample: SplashSample): string => (sample.failed
  ? `<p class="ts-status ts-status--danger" role="alert">${sample.status}</p>`
  : `<p class="ts-status" aria-live="polite">${sample.status}</p>`);

const actionRow = (sample: SplashSample): string => {
  if (sample.actions.length === 0) return '';
  const buttons = sample.actions.map((action) => `<button class="ts-button${action.primary ? ' ts-button--primary' : ''}" type="button">${action.label}</button>`);
  return `\n  <div class="ts-actions">${buttons.join('')}</div>`;
};

const progressBar = (sample: SplashSample): string => {
  const { progress, failed } = sample;
  const indeterminate = progress === 'indeterminate';
  const classes = ['ts-progress', 'ts-progress--edge', indeterminate && 'ts-progress--indeterminate', failed && 'ts-progress--danger'].filter(Boolean).join(' ');
  const value = indeterminate ? '' : ` style="--value: ${progress}" aria-valuenow="${Math.round(progress * 100)}"`;
  return `<div class="${classes}" role="progressbar" aria-label="Loading" aria-valuemin="0" aria-valuemax="100"${value}></div>`;
};

const staticSplashHtml = (sample: SplashSample): string => `<main class="ts-stage">
  <img class="ts-mark" src="${SPLASH_MARK}" alt="" />
  <h1 class="ts-title">${SPLASH_TITLE}</h1>
  ${statusLine(sample)}${sample.detail ? `\n  <p class="ts-detail">${sample.detail}</p>` : ''}${actionRow(sample)}
</main>
<span class="ts-version">${SPLASH_VERSION}</span>
${progressBar(sample)}`;

export { staticSplashHtml };
