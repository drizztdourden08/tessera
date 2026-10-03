/* @layer renderer-components @kind data */
import { createElement as h } from 'react';
import { ColorSwatch } from '../../../primitives/ColorSwatch';
import { Shortcut } from '../../../primitives/Shortcut';
import { Tag } from '../../../primitives/Tag';
import { Span } from '../../../primitives/text-elements';
import { choiceLabel } from './choice-label';
import { dynamicText } from './dynamic-text';
import { sliderText } from './slider-text';
import { PASSWORD_MASK } from '../SettingsRow.constants';
import type { InputRenderers } from './renderers.type';

const muted = (text: string) => h(Span, { tone: 'muted' }, text);
const code = (text: string | number) => h(Span, { className: 'settings-row__code' }, text);

const VALUE_RENDERERS: InputRenderers = {
  toggle: (input, { strings }) => h(
    Span,
    { className: `settings-row__state${input.value ? ' settings-row__state--on' : ''}` },
    input.value ? strings.on : strings.off,
  ),
  select: (input) => choiceLabel(input.options, input.value),
  segmented: (input) => choiceLabel(input.options, input.value),
  radio: (input) => choiceLabel(input.options, input.value),
  multi: (input, { strings }) => (input.value.length === 0
    ? muted(strings.none)
    : input.value.map((value) => choiceLabel(input.options, value)).join(', ')),
  slider: (input) => code(sliderText(input)),
  number: (input) => code(input.unit === undefined ? input.value : `${input.value} ${input.unit}`),
  text: (input, { strings }) => (input.value === '' ? muted(strings.notSet) : input.value),
  password: (input, { strings }) => (input.value === '' ? muted(strings.notSet) : code(PASSWORD_MASK)),
  dynamic: (input, { strings }) => dynamicText(input) || muted(strings.notSet),
  color: (input) => h(
    Span,
    { className: 'settings-row__color' },
    code(input.value),
    h(ColorSwatch, { color: input.value, size: 'sm', tabIndex: -1, 'aria-hidden': true, className: 'settings-row__swatch' }),
  ),
  keybind: (input, { strings }) => (input.value.length === 0 ? muted(strings.notSet) : h(Shortcut, { keys: input.value, size: 'xs' })),
  tags: (input, { strings }) => (input.value.length === 0
    ? muted(strings.none)
    : h(Span, { className: 'settings-row__tags' }, ...input.value.map((tag) => h(Tag, { key: tag, children: tag })))),
  custom: (input) => input.text ?? input.control,
};

export { VALUE_RENDERERS };
