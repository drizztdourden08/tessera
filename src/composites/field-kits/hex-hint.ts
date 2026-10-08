/* @layer renderer-components @kind util */
import type { FieldDescriptor } from '../../data/schema/field-descriptor';
import { hexText } from './hex-text';
import { toNumber } from './to-number';

const hexHint = (field: FieldDescriptor, value: unknown): string | undefined => {
  if (field.kind !== 'number' || !field.format) return undefined;
  const raw = toNumber(value);
  return Number.isFinite(raw) ? hexText(raw, field.format) : undefined;
};

export { hexHint };
