/* @layer renderer-components @kind component */
import { Component } from 'react';
import { Box } from '../../primitives/Box';
import { Span } from '../../primitives/text-elements';
import type { ErrorInfo, ReactNode } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.type';
import './ErrorBoundary.css';

const messageOf = (error: unknown): string => (error instanceof Error ? error.message : String(error));

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { caught: false, error: undefined };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { caught: true, error };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    this.props.onError?.(error, info);
  }

  componentDidUpdate(previous: ErrorBoundaryProps): void {
    if (this.state.caught && previous.resetKey !== this.props.resetKey) {
      this.setState({ caught: false, error: undefined });
    }
  }

  render(): ReactNode {
    const { caught, error } = this.state;
    const { children, label = 'This section could not be shown', action, className = '' } = this.props;
    if (!caught) return children;
    return (
      <Box role="alert" className={`error-boundary${className ? ` ${className}` : ''}`}>
        <Span tone="danger" className="error-boundary__label">{label}</Span>
        <Span tone="muted" className="error-boundary__detail">{messageOf(error)}</Span>
        {action != null && <Box className="error-boundary__action">{action}</Box>}
      </Box>
    );
  }
}

export { ErrorBoundary };
