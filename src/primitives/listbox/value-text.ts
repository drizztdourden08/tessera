/* @layer renderer-components @kind util */
import { formatDate } from '../date-format/format-date';

const valueText = (value: unknown, locale?: string): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') return String(value);
  if (value instanceof Date) return formatDate(value, 'date', { locale });
  if (Array.isArray(value)) return value.map((part: unknown) => valueText(part, locale)).join(', ');
  return '';
};

export { valueText };
