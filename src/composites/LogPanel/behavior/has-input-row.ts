/* @layer renderer-components @kind function */
import type { LogPanelProps } from '../LogPanel.type';

const hasInputRow = (props: LogPanelProps): boolean => props.onInput !== undefined || props.inputDisabled === true;

export { hasInputRow };
