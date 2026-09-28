/* @layer renderer-components @kind logic */
import { toText } from './to-text';

const scalarText = (value: unknown): string => {
  if (typeof value !== 'object' || value === null) return toText(value);
  return Array.isArray(value) ? `[${value.length}]` : '{...}';
};

export { scalarText };
