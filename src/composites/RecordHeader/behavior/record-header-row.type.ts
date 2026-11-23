/* @layer renderer-components @kind types */
import type { MouseEvent } from 'react';

type RecordHeaderRow = { onClick?: (event: MouseEvent<HTMLElement>) => void; 'data-row-toggle'?: string };

export type { RecordHeaderRow };
