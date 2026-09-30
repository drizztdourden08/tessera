/* @layer renderer-components @kind util */
import { devWarn } from '../../dom/dev-warn';
import { BADGE_TEXT } from '../Badge.constants';

const warnBadgeText = (value: number | string | undefined): void => {
  if (typeof value !== 'string' || BADGE_TEXT.test(value)) return;
  devWarn(`Badge shows letters and digits only, with a trailing + for an overflow like 99+. "${value}" has a space or a symbol.`);
};

export { warnBadgeText };
