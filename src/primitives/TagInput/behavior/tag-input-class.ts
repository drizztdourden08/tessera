/* @layer renderer-components @kind util */
import type { TagInputClassInput } from './tag-input-class.type';

const tagInputClass = (input: TagInputClassInput): string => {
  const { disabled, invalid, className } = input;
  return ['tag-input', disabled && 'tag-input--disabled', invalid && 'tag-input--invalid', className].filter(Boolean).join(' ');
};

export { tagInputClass };
