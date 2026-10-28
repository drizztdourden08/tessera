/* @layer renderer-components @kind util */
import type { TriggerClassInput } from './trigger-class.type';

const triggerClass = (input: TriggerClassInput): string => {
  const { open, disabled, size, full, mixed, className } = input;
  return [
    'select-trigger',
    'listbox-anchor',
    open && 'select-trigger--open',
    disabled && 'select-trigger--disabled',
    `control-size--${size}`,
    full && 'select-trigger--full',
    mixed && 'select-trigger--mixed',
    className,
  ].filter(Boolean).join(' ');
};

export { triggerClass };
