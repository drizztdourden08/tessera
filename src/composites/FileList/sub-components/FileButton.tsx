/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Tooltip } from '../../../primitives/Tooltip';
import type { FileButtonProps } from '../FileList.type';

const FileButton = (props: FileButtonProps) => {
  const { label, icon, onPress } = props;
  return (
    <Tooltip content={label}>
      <IconButton size="sm" variant="ghost" label={label} onClick={onPress}>
        <Icon name={icon} />
      </IconButton>
    </Tooltip>
  );
};

export { FileButton };
