/* @layer renderer-components @kind logic */
import type { OptionRowProps } from '../OptionRow.type';

const flag = (on: boolean | undefined): true | undefined => (on === true ? true : undefined);

const isResettable = (props: OptionRowProps): boolean => props.changed === true && props.onReset !== undefined;

const rowAttrs = (props: OptionRowProps) => ({
  className: ['option-row', props.className].filter(Boolean).join(' '),
  'data-locked': flag(props.locked),
  'data-forced': flag(props.forced),
  'data-changed': flag(props.changed),
  'data-resettable': flag(isResettable(props)),
  'data-aside': flag(props.aside !== undefined),
});

export { isResettable, rowAttrs };
