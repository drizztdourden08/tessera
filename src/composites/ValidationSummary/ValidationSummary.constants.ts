/* @layer renderer-components @kind data */
import type { IconName } from '../../primitives/Icon';
import type { ValidationTone } from './ValidationSummary.type';

const DEFAULT_MAX = 4;

const TONE_ICON: Readonly<Record<ValidationTone, IconName>> = {
  danger: 'circle-alert',
  warning: 'triangle-alert',
};

const PROBLEM_SELECTOR = '.validation-summary__problem';

export { DEFAULT_MAX, PROBLEM_SELECTOR, TONE_ICON };
