/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ComposerSendProps } from '../Composer.type';

const ComposerSend = ({ value, disabled, onSubmit }: ComposerSendProps) => {
  const { common } = useTesseraStrings();
  return (
    <IconButton variant="primary" size="md" label={common.send} disabled={disabled || value.trim() === ''} onClick={() => onSubmit(value)}>
      <Icon name="arrow-up" />
    </IconButton>
  );
};

export { ComposerSend };
