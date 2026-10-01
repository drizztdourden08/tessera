/* @layer renderer-components @kind component */
import { PatternInput } from '../../PatternInput';
import { toNumber } from '../../field-kits/to-number';
import { positionPattern } from '../behavior/position-pattern';
import { AXIS_KEYS } from '../behavior/position-pattern.constants';
import { ORIGIN } from './PositionFieldEditor.constants';
import type { PatternValue } from '../../PatternInput';
import type { PositionFieldEditorProps } from '../RecordEditor.type';
import '../../../theme/record-editor.css';

const coordinate = (raw: unknown, min: number | undefined): number => {
  const parsed = toNumber(raw);
  return Number.isFinite(parsed) ? parsed : (min ?? ORIGIN);
};

const PositionFieldEditor = (props: PositionFieldEditorProps) => {
  const { field, pair, binding } = props;
  const held = binding.value(field.path);
  const xBounds = binding.bounds(pair.x.path);
  const yBounds = binding.bounds(pair.y.path);

  const value = {
    [AXIS_KEYS.x]: coordinate(binding.value(pair.x.path), xBounds?.min),
    [AXIS_KEYS.y]: coordinate(binding.value(pair.y.path), yBounds?.min),
  };

  const write = (next: PatternValue): void => {
    const base = (held !== null && typeof held === 'object') ? held : {};
    const x = coordinate(next[AXIS_KEYS.x], xBounds?.min);
    const y = coordinate(next[AXIS_KEYS.y], yBounds?.min);
    binding.onChange(field.path, { ...base, [pair.xKey]: x, [pair.yKey]: y });
  };

  return (
    <PatternInput
      className="record-editor__position"
      pattern={positionPattern(pair, xBounds, yBounds)}
      value={value}
      disabled={binding.disabled}
      aria-label={field.label}
      onChange={write}
    />
  );
};

export { PositionFieldEditor };
