/* @layer renderer-components @kind util */
import type { TriggerMenuProps } from '../DropdownMenu.type';
import type { TriggerSettings } from './trigger-settings.type';

const triggerSettings = (props: TriggerMenuProps): TriggerSettings => ({
  variant: props.variant ?? 'primary',
  intensity: props.intensity ?? 'strong',
  size: props.size ?? 'sm',
  align: props.align ?? 'start',
  disabled: props.disabled ?? false,
  closeOnSelect: props.closeOnSelect ?? true,
  filter: props.filter ?? false,
});

export { triggerSettings };
