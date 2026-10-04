/* @layer renderer-components @kind types */
type CopyValueTruncate = 'end' | 'middle';

type CopyValueSize = 'sm' | 'md';

interface CopyValueProps {
  value: string;
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
  value: string;
  truncate?: CopyValueTruncate;
}

export type { CopyValueProps, CopyValueSize, CopyValueTextProps, CopyValueTruncate };
