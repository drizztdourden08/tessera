/* @layer renderer-components @kind types */
import type { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  label?: string;
  action?: ReactNode;
  resetKey?: unknown;
  onRetry?: () => void;
  onError?: (error: unknown, info: ErrorInfo) => void;
  className?: string;
}

interface ErrorBoundaryState {
  caught: boolean;
  error: unknown;
}

export type { ErrorBoundaryProps, ErrorBoundaryState };
