/* @layer renderer-components @kind component */
import { Box } from '../../../../../primitives/Box';
import { Button } from '../../../../../primitives/Button';
import { Icon } from '../../../../../primitives/Icon';
import { IconButton } from '../../../../../primitives/IconButton';
import type { DockEdge } from '../../../../DockLayout';
import { PLACEMENT_BUTTONS, PLACEMENT_ICONS } from '../WidgetOptions.constants';
import type { PlacementRowProps } from '../WidgetOptions.type';

const PlacementRow = (props: PlacementRowProps) => {
  const { placement, dockEdge, onDock, onFloat, onPopOut, canPopOut = true } = props;
  const isLit = (edge: DockEdge | null): boolean =>
    (edge === null ? placement === 'floating' : placement === 'docked' && dockEdge === edge);

  return (
    <Box className="widget-options__placement">
      <Box className="widget-options__placement-buttons">
        {PLACEMENT_BUTTONS.map(({ edge, label }) => (
          <IconButton key={label} label={label} title={label} active={isLit(edge)} onClick={() => (edge === null ? onFloat() : onDock(edge))}>
            <Icon name={PLACEMENT_ICONS[edge ?? 'float']} size={14} />
          </IconButton>
        ))}
      </Box>
      {placement === 'popped' && onPopOut && (
        <Button size="sm" variant="tertiary" onClick={onPopOut} title="Back into the app, where it was docked before">Pop in</Button>
      )}
      {placement !== 'popped' && canPopOut && onPopOut && <Button size="sm" variant="tertiary" onClick={onPopOut}>Pop out</Button>}
    </Box>
  );
};

export { PlacementRow };
