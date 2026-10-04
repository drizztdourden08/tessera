/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { retryLine } from './behavior/retry-line';
import { retryWord } from './behavior/retry-word';
import { useSecondsLeft } from './behavior/useSecondsLeft';
import type { RetryButtonProps } from './RetryButton.type';
import './RetryButton.css';

const RetryButton = (props: RetryButtonProps) => {
  const {
    onRetry, retryAt, attempt, attempts, retrying = false, label, variant = 'secondary', size = 'sm', className, ...rest
  } = props;
  const { common } = useTesseraStrings();
  const lineId = useId();
  const secondsLeft = useSecondsLeft(retrying ? null : retryAt);
  const line = retryLine({ secondsLeft, attempt, attempts }, common);
  const waiting = secondsLeft > 0;
  return (
    <span className={className ? `retry-button ${className}` : 'retry-button'} data-waiting={waiting || undefined}>
      {line && <span id={lineId} className="retry-button__line">{line}</span>}
      <Button
        {...rest}
        variant={variant}
        size={size}
        icon={<Icon name="refresh-cw" />}
        loading={retrying}
        aria-describedby={line ? lineId : undefined}
        onClick={onRetry}
      >
        {retryWord(label, waiting, common)}
      </Button>
    </span>
  );
};

export { RetryButton };
