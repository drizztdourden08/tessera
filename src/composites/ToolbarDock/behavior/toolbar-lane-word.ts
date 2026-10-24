/* @layer renderer-components @kind logic */
import type { ToolbarWords } from './toolbar-key.type';

const toolbarLaneWord = (words: ToolbarWords, index: number): string => (index === 0 ? words.lanes.outer : words.lanes.inner);

export { toolbarLaneWord };
