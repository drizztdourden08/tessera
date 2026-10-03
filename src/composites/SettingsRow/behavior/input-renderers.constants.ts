/* @layer renderer-components @kind data */
import { createElement as h } from 'react';
import { NumberInput } from '../../../primitives/NumberInput';
import { PasswordInput } from '../../../primitives/PasswordInput';
import { RadioGroup } from '../../../primitives/RadioGroup';
import { SegmentedControl } from '../../../primitives/SegmentedControl';
import { Select } from '../../../primitives/Select';
import { Slider } from '../../../primitives/Slider';
import { TagInput } from '../../../primitives/TagInput';
import { TextInput } from '../../../primitives/TextInput';
import { Toggle } from '../../../primitives/Toggle';
import { ToggleGroup } from '../../../primitives/ToggleGroup';
import { Span } from '../../../primitives/text-elements';
import { DynamicInput } from '../../DynamicInput';
import { optionHint } from './option-hint';
import { SettingsColor } from '../sub-components/SettingsColor';
import { SettingsKeybind } from '../sub-components/SettingsKeybind';
import type { InputRenderers } from './renderers.type';

const INPUT_RENDERERS: InputRenderers = {
  toggle: (input, { label, disabled }) => h(Toggle, { checked: input.value, onChange: input.onChange, disabled, 'aria-label': label }),
  select: (input, { label, disabled }) => h(Select, {
    value: input.value,
    onChange: input.onChange,
    options: input.options.map((option) => ({ value: option.value, label: option.label, description: option.hint })),
    searchable: input.searchable,
    disabled,
    'aria-label': label,
  }),
  segmented: (input, { label, disabled }) => h(SegmentedControl, {
    value: input.value,
    onChange: input.onChange,
    options: input.options.map((option) => ({ value: option.value, label: option.label, hint: optionHint(option) })),
    disabled,
    'aria-label': label,
  }),
  radio: (input, { disabled }) => h(RadioGroup, {
    value: input.value,
    onChange: input.onChange,
    options: input.options.map((option) => ({ value: option.value, label: option.label, description: option.hint })),
    disabled,
  }),
  multi: (input, { disabled }) => h(ToggleGroup, {
    value: [...input.value],
    onChange: input.onChange,
    options: input.options.map((option) => ({ value: option.value, label: option.label, hint: optionHint(option) })),
    disabled,
  }),
  slider: (input, { label, disabled }) => h(Slider, {
    value: input.value,
    onChange: input.onChange,
    min: input.min,
    max: input.max,
    step: input.step,
    stops: input.stops,
    formatValue: input.formatValue,
    showValue: true,
    disabled,
    'aria-label': label,
  }),
  number: (input, { label, disabled }) => h(
    Span,
    { className: 'settings-row__number' },
    h(NumberInput, { value: input.value, onChange: input.onChange, min: input.min, max: input.max, step: input.step, disabled, 'aria-label': label }),
    input.unit === undefined ? null : h(Span, { tone: 'muted' }, input.unit),
  ),
  text: (input, { label, disabled }) => h(TextInput, {
    value: input.value, onChange: (event) => input.onChange(event.target.value), placeholder: input.placeholder, disabled, 'aria-label': label,
  }),
  password: (input, { label, disabled }) => h(PasswordInput, {
    value: input.value, onChange: input.onChange, placeholder: input.placeholder, disabled, 'aria-label': label,
  }),
  dynamic: (input, { label, disabled }) => h(DynamicInput, {
    pattern: input.pattern, slots: input.slots, lists: input.lists, actions: input.actions, icons: input.icons, counter: input.counter,
    value: input.value, onChange: input.onChange, disabled, 'aria-label': label,
  }),
  color: (input, context) => h(SettingsColor, { value: input.value, onChange: input.onChange, ...context }),
  keybind: (input, context) => h(SettingsKeybind, { value: input.value, onChange: input.onChange, ...context }),
  tags: (input, { disabled }) => h(TagInput, {
    value: input.value, onChange: input.onChange, suggestions: input.suggestions, placeholder: input.placeholder, disabled, inline: true,
  }),
  custom: (input) => input.control,
};

export { INPUT_RENDERERS };
