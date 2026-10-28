/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import { presetOf } from '../behavior/preset-of';
import type { NumberFieldTailProps } from '../NumberField.type';
import { NumberFieldPresets } from './NumberFieldPresets';

const NumberFieldTail = ({ suffix, presets = [], value, locked, onPick }: NumberFieldTailProps) => (
  <>
    {suffix !== undefined && <Span tone="dim" className="number-field__suffix">{suffix}</Span>}
    {presets.length > 0 && <NumberFieldPresets presets={presets.map(presetOf)} value={value} suffix={suffix} disabled={locked} onPick={onPick} />}
  </>
);

export { NumberFieldTail };
