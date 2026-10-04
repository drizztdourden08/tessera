/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Status } from '../../../primitives/Status';
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ActionTileHeadProps } from '../ActionTile.type';
import { ActionTileToolButton } from './ActionTileToolButton';

const ActionTileHead = (props: ActionTileHeadProps) => {
  const { label, labelId, icon, status, tools, onOpen, openLabel } = props;
  const { common } = useTesseraStrings();
  const open = openLabel ?? common.open;
  return (
    <Box className="action-tile__head">
      {icon && <Icon name={icon} className="action-tile__icon" aria-hidden />}
      <Span id={labelId} className="action-tile__label">{label}</Span>
      {status && <Status tone={status.tone} dot className="action-tile__status">{status.label}</Status>}
      {(tools.length > 0 || onOpen) && (
        <Box className="action-tile__tools">
          {tools.map((tool) => <ActionTileToolButton key={tool.label} tool={tool} />)}
          {onOpen && (
            <IconButton size="xs" variant="ghost" label={open} title={open} onClick={onOpen}>
              <Icon name="chevron-right" />
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  );
};

export { ActionTileHead };
