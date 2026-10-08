/* @layer renderer-components @kind component */
import { Component } from 'react';
import { ErrorFallbackView } from './sub-components/ErrorFallbackView';
import type { ErrorInfo, ReactNode } from 'react';
import './ErrorBoundary.css';
import type { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.type';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { caught: false, error: undefined };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { caught: true, error };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    this.props.onError?.(error, info);
  }

  componentDidUpdate(previous: ErrorBoundaryProps): void {
    if (this.state.caught && previous.resetKey !== this.props.resetKey) this.reset();
  }

  reset = (): void => {
    this.setState({ caught: false, error: undefined });
  };

  retry = (): void => {
    this.props.onRetry?.();
    this.reset();
  };

  render(): ReactNode {
    const { caught, error } = this.state;
    const { children, label, action, onRetry, className } = this.props;
    if (!caught) return children;
    const reset = onRetry ? this.retry : this.reset;
    return <ErrorFallbackView error={error} label={label} action={action} reset={reset} retry={onRetry !== undefined} className={className} />;
  }
}

export { ErrorBoundary };
