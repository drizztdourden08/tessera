/* @layer renderer-components @kind logic */
import { ESCAPE } from './ansi.constants';

const stripAnsi = (text: string): string => text.replace(ESCAPE, '');

export { stripAnsi };
