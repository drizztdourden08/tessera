/* @layer renderer-components @kind logic */
import { COMPACT_ROWS, DEFAULT_ROWS } from '../MarkdownEditor.constants';

const rowsOf = (rows: number | undefined, compact: boolean | undefined): number => rows ?? (compact === true ? COMPACT_ROWS : DEFAULT_ROWS);

export { rowsOf };
