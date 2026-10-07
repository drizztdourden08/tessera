/* @layer stories @kind types */
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
  text: string;
  small: boolean;
}

export type { LoadErrorDetailsProps, LoadErrorProps, LoadErrorVariant };
