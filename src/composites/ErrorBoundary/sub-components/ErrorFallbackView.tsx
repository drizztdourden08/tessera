/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import { useTesseraOverride } from '../../../primitives/TesseraProvider/behavior/useTesseraOverride';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ErrorFallbackViewProps } from './ErrorFallbackView.type';

const messageOf = (error: unknown): string => (error instanceof Error ? error.message : String(error));

const ErrorFallbackView = (props: ErrorFallbackViewProps) => {
  const { error, label, action, reset, className = '' } = props;
  const AppFallback = useTesseraOverride('errorFallback');
  const { panels } = useTesseraStrings();
  const shown = label ?? panels.sectionFailed;
  if (AppFallback) return <AppFallback error={error} label={shown} action={action} reset={reset} className={className} />;
  return (
    <Box role="alert" className={`error-boundary${className ? ` ${className}` : ''}`}>
      <Span tone="danger" className="error-boundary__label">{shown}</Span>
      <Span tone="muted" className="error-boundary__detail">{messageOf(error)}</Span>
      {action != null && <Box className="error-boundary__action">{action}</Box>}
    </Box>
  );
};

export { ErrorFallbackView };
