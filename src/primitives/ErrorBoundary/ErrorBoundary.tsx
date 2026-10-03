/* @layer renderer-components @kind component */
import { Component } from 'react';
import { ErrorFallbackView } from './sub-components/ErrorFallbackView';
import type { ErrorInfo, ReactNode } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.type';
import './ErrorBoundary.css';

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

  render(): ReactNode {
    const { caught, error } = this.state;
    const { children, label, action, className } = this.props;
    if (!caught) return children;
    return <ErrorFallbackView error={error} label={label} action={action} reset={this.reset} className={className} />;
  }
}

export { ErrorBoundary };
