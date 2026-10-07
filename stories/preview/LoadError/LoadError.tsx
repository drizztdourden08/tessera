/* @layer stories @kind component */
import { RetryButton } from '../../../src/composites';
import { Box, Icon, Span } from '../../../src/primitives';
import { errorText } from './behavior/error-text';
import type { LoadErrorProps } from './LoadError.type';
import { LoadErrorDetails } from './sub-components/LoadErrorDetails';
import './LoadError.css';

const LoadError = (props: LoadErrorProps) => {
  const { message, error, onRetry, retrying = false, retryAt, variant = 'center', className } = props;
  const text = errorText(error);
  const inline = variant === 'inline';
  return (
    <Box className={['load-error', `load-error--${variant}`, className].filter(Boolean).join(' ')} aria-busy={retrying || undefined}>
      <Box role="alert" className="load-error__lead">
        <Icon name="circle-alert" className="load-error__icon" aria-hidden />
        <Span className="load-error__message">{message}</Span>
      </Box>
      {onRetry && (
        <RetryButton
          onRetry={onRetry}
          retrying={retrying}
          retryAt={retryAt}
          variant={inline ? 'ghost' : 'secondary'}
          size="sm"
          className="load-error__retry"
        />
      )}
      {text !== '' && <LoadErrorDetails text={text} small={inline} />}
    </Box>
  );
};

export { LoadError };
