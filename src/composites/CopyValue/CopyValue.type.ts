/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type CopyValueTruncate = 'end' | 'middle';

type CopyValueSize = 'sm' | 'md';

interface CopyValueProps {
  value: ReactNode;
  text?: string;
  label?: string;
  mono?: boolean;
  truncate?: CopyValueTruncate;
  copyLabel?: string;
  copiedLabel?: string;
  size?: CopyValueSize;
  onCopied?: () => void;
  className?: string;
}

interface CopyValueTextProps {
  value: ReactNode;
  truncate?: CopyValueTruncate;
}

export type { CopyValueProps, CopyValueSize, CopyValueTextProps, CopyValueTruncate };
