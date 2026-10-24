/* @layer renderer-components @kind types */
import type { ToolbarWords } from './toolbar-key.type';

type ToolbarMenuWords = Pick<ToolbarWords, 'menu' | 'reset'> & { onReset?: () => void };

export type { ToolbarMenuWords };
