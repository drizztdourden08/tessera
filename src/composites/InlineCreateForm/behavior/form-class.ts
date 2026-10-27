/* @layer renderer-components @kind logic */
import type { FormClassParts } from './form-class.type';

const formClass = ({ size, compact, dashed, className }: FormClassParts): string =>
  ['inline-create-form', `control-size--${size}`, compact && 'inline-create-form--compact', dashed && 'inline-create-form--dashed', className]
    .filter(Boolean).join(' ');

export { formClass };
