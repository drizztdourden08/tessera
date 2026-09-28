/* @layer renderer-components @kind util */
import type { TriggerClassInput } from './trigger-class.type';

const triggerClass = (input: TriggerClassInput): string => {
  const { open, disabled, size, className } = input;
  return [
    'select-trigger',
    open && 'select-trigger--open',
    disabled && 'select-trigger--disabled',
    size === 'sm' && 'select-trigger--sm',
    className,
  ].filter(Boolean).join(' ');
};

export { triggerClass };
