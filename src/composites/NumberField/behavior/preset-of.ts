/* @layer renderer-components @kind util */
import type { NumberPreset, NumberPresetInput } from '../NumberField.type';

const presetOf = (preset: NumberPresetInput): NumberPreset => (typeof preset === 'number' ? { value: preset } : preset);

export { presetOf };
