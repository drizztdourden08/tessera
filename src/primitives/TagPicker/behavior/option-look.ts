/* @layer renderer-components @kind util */
import type { TagLook } from '../../Tag';

const optionLook = (option: TagLook): TagLook => {
  if (option.variant === 'urgency') return { variant: 'urgency', color: option.color };
  if (option.variant === 'category') return { variant: 'category', color: option.color };
  return { variant: 'normal', color: option.color ?? 'primary' };
};

export { optionLook };
