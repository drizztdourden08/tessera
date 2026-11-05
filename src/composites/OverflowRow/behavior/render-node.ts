/* @layer renderer-components @kind util */
import type { ReactNode } from 'react';
import type { OverflowRowNode } from '../OverflowRow.type';

const renderNode = (node: OverflowRowNode, tight: boolean): ReactNode => (typeof node === 'function' ? node({ tight }) : node);

export { renderNode };
