/* @layer renderer-components @kind logic */
import type { ReactNode } from 'react';

const copyText = (value: ReactNode, text: string | undefined): string | undefined => {
  if (text !== undefined) return text;
  return typeof value === 'string' || typeof value === 'number' ? String(value) : undefined;
};

export { copyText };
