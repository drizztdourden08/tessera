/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import type { PopButtonProps } from './PopButton.type';

const PopButton = (props: PopButtonProps) => {
  const { out, canPopOut, onPopOut } = props;
  if (!onPopOut || (!out && !canPopOut)) return null;
  const label = out ? 'Pop in' : 'Pop out';
  return (
    <IconButton className="widget__btn" label={label} title={label} onClick={onPopOut}>
      <Icon name={out ? 'minimize-2' : 'maximize-2'} size={12} />
    </IconButton>
  );
};

export { PopButton };
