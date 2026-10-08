/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type LoadErrorVariant = 'center' | 'box' | 'inline';

interface LoadErrorProps {
  message: ReactNode;
  error?: unknown;
  onRetry?: () => void;
  retrying?: boolean;
  retryAt?: number | null;
  variant?: LoadErrorVariant;
  className?: string;
}

interface LoadErrorDetailsProps {
  raw: ReactNode;
  small?: boolean;
  center?: boolean;
}

interface LoadErrorBoxProps {
  message: ReactNode;
  retry: ReactNode;
  details: ReactNode;
  className: string;
}

export type { LoadErrorBoxProps, LoadErrorDetailsProps, LoadErrorProps, LoadErrorVariant };
