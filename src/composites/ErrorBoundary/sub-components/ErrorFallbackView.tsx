/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraOverride } from '../../../primitives/TesseraProvider/behavior/useTesseraOverride';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { LoadError } from '../../LoadError';
import type { ErrorFallbackViewProps } from './ErrorFallbackView.type';

const ErrorFallbackView = (props: ErrorFallbackViewProps) => {
  const { error, label, action, reset, retry, className } = props;
  const AppFallback = useTesseraOverride('errorFallback');
  const { panels } = useTesseraStrings();
  const shown = label ?? panels.sectionFailed;
  if (AppFallback) return <AppFallback error={error} label={shown} action={action} reset={reset} className={className ?? ''} />;
  const notice = <LoadError variant="box" message={shown} error={error} onRetry={retry ? reset : undefined} className={action == null ? className : undefined} />;
  if (action == null) return notice;
  return (
    <Box className={className ? `error-boundary ${className}` : 'error-boundary'}>
      {notice}
      <Box className="error-boundary__action">{action}</Box>
    </Box>
  );
};

export { ErrorFallbackView };
