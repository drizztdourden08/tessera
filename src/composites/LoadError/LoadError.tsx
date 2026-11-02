/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Icon } from '../../primitives/Icon';
import { Span } from '../../primitives/text-elements';
import { RetryButton } from '../RetryButton';
import { rawError } from './behavior/raw-error';
import type { LoadErrorProps } from './LoadError.type';
import { LoadErrorBox } from './sub-components/LoadErrorBox';
import { LoadErrorDetails } from './sub-components/LoadErrorDetails';
import './LoadError.css';

const LoadError = (props: LoadErrorProps) => {
  const { message, error, onRetry, retrying = false, retryAt, actions, variant = 'center', className } = props;
  const raw = rawError(error);
  const inline = variant === 'inline';
  const classes = ['load-error', `load-error--${variant}`, className].filter(Boolean).join(' ');
  const retry = onRetry ? (
    <RetryButton onRetry={onRetry} retrying={retrying} retryAt={retryAt} variant={inline ? 'ghost' : 'secondary'} size="sm" className="load-error__retry" />
  ) : null;
  const buttons = actions == null ? retry : <Box className="load-error__actions">{retry}{actions}</Box>;
  const details = raw === null ? null : <LoadErrorDetails raw={raw} small={inline} center={variant === 'center'} />;
  if (variant === 'box') return <LoadErrorBox message={message} retry={buttons} details={details} className={classes} />;
  return (
    <Box className={classes}>
      <Box role="alert" className="load-error__lead">
        <Icon name="circle-alert" className="load-error__icon" aria-hidden />
        <Span className="load-error__message">{message}</Span>
      </Box>
      {buttons}
      {details}
    </Box>
  );
};

export { LoadError };
