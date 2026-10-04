/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { Span } from '../../primitives/text-elements';
import { ActionTileButton } from './sub-components/ActionTileButton';
import { ActionTileHead } from './sub-components/ActionTileHead';
import { ActionTileReading } from './sub-components/ActionTileReading';
import type { ActionTileProps } from './ActionTile.type';
import './ActionTile.css';

const ActionTile = (props: ActionTileProps) => {
  const { label, value, unit, meta, icon, status, tone, action, tools = [], onOpen, openLabel, size = 'md', className } = props;
  const labelId = useId();
  return (
    <Box role="group" aria-labelledby={labelId} className={className ? `action-tile ${className}` : 'action-tile'} data-size={size}>
      <ActionTileHead label={label} labelId={labelId} icon={icon} status={status} tools={tools} onOpen={onOpen} openLabel={openLabel} />
      <ActionTileReading value={value} unit={unit} tone={tone} />
      {meta !== undefined && <Span className="action-tile__meta">{meta}</Span>}
      {action && <ActionTileButton action={action} />}
    </Box>
  );
};

export { ActionTile };
