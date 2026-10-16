/* @layer renderer-components @kind component */
import { asDate } from '../../primitives/date-format/as-date';
import { FULL_DATE } from '../../primitives/date-format/date-format.constants';
import { formatDate } from '../../primitives/date-format/format-date';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Time } from '../../primitives/text-elements';
import { Tooltip } from '../../primitives/Tooltip';
import { useDateText } from './behavior/useDateText';
import { LIVE_PRESETS } from './DateText.constants';
import type { DateTextProps } from './DateText.type';
import './DateText.css';

const DateText = (props: DateTextProps) => {
  const { value, format = 'datetime', length, tooltip, focusable = false, className } = props;
  const { dates } = useTesseraStrings();
  const text = useDateText(value, format, { length, strings: dates });
  const at = asDate(value);
  if (!at) return null;
  const time = <Time dateTime={at.toISOString()} className={['date-text', className].filter(Boolean).join(' ')}>{text}</Time>;
  const tip = tooltip ?? (typeof format === 'string' && LIVE_PRESETS.has(format));
  if (!tip) return time;
  return <Tooltip content={formatDate(at, FULL_DATE, { strings: dates })} focusable={focusable}>{time}</Tooltip>;
};

export { DateText };
