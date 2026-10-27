/* @layer renderer-components @kind types */
import type { DateFormat, DateLength, DateValue } from '../../primitives/date-format/date-format.type';

interface DateTextProps {
  value: DateValue;
  format?: DateFormat;
  length?: DateLength;
  tooltip?: boolean;
  label?: string;
  focusable?: boolean;
  className?: string;
}

export type { DateTextProps };
