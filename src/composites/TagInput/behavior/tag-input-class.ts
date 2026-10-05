/* @layer renderer-components @kind util */
import type { TagInputClassInput } from './tag-input-class.type';

const tagInputClass = (input: TagInputClassInput): string => {
  const { disabled, invalid, size, className } = input;
  return ['tag-input', `control-size--${size}`, disabled && 'tag-input--disabled', invalid && 'tag-input--invalid', className].filter(Boolean).join(' ');
};

export { tagInputClass };
