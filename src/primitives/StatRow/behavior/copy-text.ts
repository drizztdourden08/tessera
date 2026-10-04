/* @layer renderer-components @kind logic */
import type { ReactNode } from 'react';

const copyText = (value: ReactNode, copyable: boolean | string | undefined): string | undefined => {
  if (typeof copyable === 'string') return copyable;
  if (copyable !== true) return undefined;
  return typeof value === 'string' || typeof value === 'number' ? String(value) : undefined;
};

export { copyText };
