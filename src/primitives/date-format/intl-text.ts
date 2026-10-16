/* @layer renderer-components @kind util */
import { INTL_PRESETS } from './date-format.constants';
import { intlFormats } from './intl-formats';
import type { DateContext, IntlPreset } from './date-format.type';

const intlText = (preset: IntlPreset) => ({ at, length, strings }: DateContext): string =>
  intlFormats.date(strings.locale, INTL_PRESETS[preset][length]).format(at);

export { intlText };
