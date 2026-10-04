/* @layer renderer-components @kind component */
import { CopyButton } from '../../../primitives/CopyButton';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import type { ActionTileToolButtonProps } from '../ActionTile.type';

const ActionTileToolButton = (props: ActionTileToolButtonProps) => {
  const { tool } = props;
  if (tool.copy !== undefined) return <CopyButton text={tool.copy} label={tool.label} size="xs" variant="ghost" disabled={tool.disabled} />;
  return (
    <IconButton size="xs" variant="ghost" label={tool.label} title={tool.label} disabled={tool.disabled} onClick={tool.onSelect}>
      <Icon name={tool.icon} />
    </IconButton>
  );
};

export { ActionTileToolButton };
