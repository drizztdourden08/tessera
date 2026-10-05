/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import type { KeyValueEditorProps, KeyValueEntry } from '../KeyValueEditor.type';

const newEntry = (props: KeyValueEditorProps): KeyValueEntry => {
  const { newValue, valueKind = 'count', min, max, options } = props;
  if (newValue !== undefined) return newValue;
  if (valueKind === 'text') return '';
  if (valueKind === 'select') return options?.[0] ?? '';
  const start = valueKind === 'count' ? 1 : 0;
  return clampNumber(start, min, max);
};

export { newEntry };
