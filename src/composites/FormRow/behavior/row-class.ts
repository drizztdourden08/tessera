/* @layer renderer-components @kind logic */
import type { FormRowProps } from '../FormRow.type';

const rowClass = (resettable: boolean, className?: string): string =>
  ['form-row', resettable ? 'form-row--resettable' : '', className].filter(Boolean).join(' ');

const rowAttrs = (props: FormRowProps) => ({
  className: rowClass(props.changed === true && props.onReset !== undefined, props.className),
  'data-changed': props.changed === true ? true : undefined,
  'data-problem': props.problem ? true : undefined,
});

export { rowAttrs };
