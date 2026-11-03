/* @layer renderer-components @kind component */
import { Icon } from '../../primitives/Icon';
import { IconButton } from '../../primitives/IconButton';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ResetButtonProps } from './ResetButton.type';

const ResetButton = (props: ResetButtonProps) => {
  const { label, onReset, changed = false } = props;
  const { common } = useTesseraStrings();
  if (!changed || !onReset) return null;
  const name = common.resetNamed(label);
  return (
    <IconButton size="xs" variant="ghost" label={name} title={name} onClick={onReset}>
      <Icon name="rotate-ccw" />
    </IconButton>
  );
};

export { ResetButton };
