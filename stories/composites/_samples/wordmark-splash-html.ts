/* @layer stories @kind logic */
import { BRAND_FAMILY } from '../../../src/brand';
import type { BrandApp } from '../../../src/brand/brand.type';
import { DARK_GROUND_MARKS } from './dark-ground-marks.constants';
import { SPLASH_WORDMARKS } from './splash-wordmarks.constants';

const wordmarkSplashHtml = (app: BrandApp): string => `<main class="ts-stage">
  <img class="ts-mark" src="${DARK_GROUND_MARKS[app] ?? ''}" alt="" />
  <h1 class="ts-title"><img class="ts-wordmark" src="${SPLASH_WORDMARKS[app] ?? ''}" alt="${BRAND_FAMILY[app].name}" /></h1>
  <p class="ts-status" aria-live="polite">Starting</p>
</main>`;

export { wordmarkSplashHtml };
