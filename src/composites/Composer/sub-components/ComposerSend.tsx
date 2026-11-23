/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ComposerSendProps } from '../Composer.type';

const ComposerSend = ({ value, disabled, busy, onSubmit }: ComposerSendProps) => {
  const { common } = useTesseraStrings();
  return (
    <IconButton variant="primary" size="md" label={busy ? common.sending : common.send} loading={busy} disabled={disabled || (!busy && value.trim() === '')} onClick={() => !busy && onSubmit(value)}>
      <Icon name="arrow-up" />
    </IconButton>
  );
};

export { ComposerSend };
