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
  const { message, error, onRetry, retrying = false, retryAt, variant = 'center', className } = props;
  const raw = rawError(error);
  const inline = variant === 'inline';
  const classes = ['load-error', `load-error--${variant}`, className].filter(Boolean).join(' ');
  const retry = onRetry ? (
    <RetryButton onRetry={onRetry} retrying={retrying} retryAt={retryAt} variant={inline ? 'ghost' : 'secondary'} size="sm" className="load-error__retry" />
  ) : null;
  const details = raw === null ? null : <LoadErrorDetails raw={raw} small={inline} center={variant === 'center'} />;
  if (variant === 'box') return <LoadErrorBox message={message} retry={retry} details={details} className={classes} />;
  return (
    <Box className={classes}>
      <Box role="alert" className="load-error__lead">
        <Icon name="circle-alert" className="load-error__icon" aria-hidden />
        <Span className="load-error__message">{message}</Span>
      </Box>
      {retry}
      {details}
    </Box>
  );
};

export { LoadError };
