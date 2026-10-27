/* @layer renderer-components @kind util */
import type { FieldDescriptor } from '../../data/schema/field-descriptor';
import { hexText } from './hex-text';

const withUnit = (text: string, unit: string | undefined): string => (unit ? `${text} ${unit}` : text);

const numberCellText = (raw: number, field: Pick<FieldDescriptor, 'format' | 'unit'>): { text: string; title: string } => {
  const { format, unit } = field;
  if (!format) {
    const text = withUnit(String(raw), unit);
    return { text, title: text };
  }
  const hex = hexText(raw, format);
  return { text: withUnit(hex, unit), title: withUnit(`${hex} (${raw})`, unit) };
};

export { numberCellText };
