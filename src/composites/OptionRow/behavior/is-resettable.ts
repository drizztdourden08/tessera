/* @layer renderer-components @kind logic */
import type { OptionRowProps } from '../OptionRow.type';

const isResettable = (props: OptionRowProps): boolean => props.changed === true && props.onReset !== undefined;

export { isResettable };
