/* @layer renderer-components @kind util */
import { devWarn } from '../../dom/dev-warn';
import { BADGE_TEXT } from '../Badge.constants';

const warnBadgeText = (value: number | string | undefined): void => {
  if (typeof value === 'number' && !(Number.isInteger(value) && value >= 0)) {
    devWarn(`Badge counts whole numbers from 0. It shows ${value} as its whole part, or nothing when it is below 0 or not a finite number.`);
  }
  if (typeof value !== 'string' || BADGE_TEXT.test(value)) return;
  devWarn(`Badge shows letters and digits only, with a trailing + for an overflow like 99+. "${value}" has a space or a symbol, which it drops, and it hides when nothing is left.`);
};

export { warnBadgeText };
