/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface RecordHeaderSlotProps {
  when?: boolean;
  main?: boolean;
  content?: boolean;
  children?: ReactNode;
}

export type { RecordHeaderSlotProps };
