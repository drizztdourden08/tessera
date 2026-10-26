/* @layer renderer-components @kind logic */
import type { LogPanelProps } from '../LogPanel.type';
import { ansiLogAsText } from './ansi-log-as-text';
import { logAsText } from './log-as-text';

const defaultCopy = (props: Pick<LogPanelProps, 'copyText' | 'ansi'>) => props.copyText ?? (props.ansi === true ? ansiLogAsText : logAsText);

export { defaultCopy };
