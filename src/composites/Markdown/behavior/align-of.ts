/* @layer renderer-components @kind util */
import type { TableAlign } from '../../../primitives/Table';
import { TABLE_ALIGNS } from '../Markdown.constants';

const alignOf = (align: unknown): TableAlign | undefined => (typeof align === 'string' && TABLE_ALIGNS.includes(align) ? (align as TableAlign) : undefined);

export { alignOf };
