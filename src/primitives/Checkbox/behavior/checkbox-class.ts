/* @layer renderer-components @kind util */
import type { CheckboxClassParts } from './checkbox-class.type';

const checkboxClass = (parts: CheckboxClassParts): string =>
  [
    'checkbox',
    `control-size--${parts.controlSize}`,
    parts.labelSize && `label-size--${parts.labelSize}`,
    parts.boxed && 'checkbox--boxed',
    parts.disabled && 'checkbox--disabled',
    parts.className,
  ].filter(Boolean).join(' ');

export { checkboxClass };
