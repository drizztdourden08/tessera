/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { LogJumpProps } from './LogJump.type';

const LogJump = (props: LogJumpProps) => {
  const { newestFirst, terminal, onJump } = props;
  const { panels } = useTesseraStrings();
  const endLabel = newestFirst ? panels.jumpToTop : panels.jumpToBottom;

  return (
    <Button
      variant="secondary"
      size="sm"
      className={newestFirst ? 'log-panel__jump log-panel__jump--top' : 'log-panel__jump'}
      icon={<Icon name={newestFirst ? 'arrow-up' : 'arrow-down'} />}
      onClick={onJump}
    >
      {terminal ? endLabel : panels.newest}
    </Button>
  );
};

export { LogJump };
