/* @layer renderer-components @kind logic */
import { COUNTER_FROM } from '../MarkdownEditor.constants';

const counterShown = (count: number, max: number | undefined): boolean => max !== undefined && max > 0 && count >= max * COUNTER_FROM;

export { counterShown };
