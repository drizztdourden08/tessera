/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Button } from '../../primitives/Button';
import { Icon } from '../../primitives/Icon';
import { IconButton } from '../../primitives/IconButton';
import { Status } from '../../primitives/Status';
import { Span } from '../../primitives/text-elements';
import type { ActionTileProps } from './ActionTile.type';
import './ActionTile.css';

const ActionTile = (props: ActionTileProps) => {
  const { label, value, unit, meta, icon, status, tone, action, tools = [], onOpen, openLabel = 'Open', size = 'md', className } = props;
  return (
    <Box className={className ? `action-tile ${className}` : 'action-tile'} data-size={size} data-open={onOpen ? '' : undefined}>
      <Box className="action-tile__head">
        {icon && <Icon name={icon} className="action-tile__icon" />}
        <Span className="action-tile__label">{label}</Span>
        {status && <Status tone={status.tone} dot>{status.label}</Status>}
        <Box className="action-tile__tools">
          {tools.map((tool) => (
            <IconButton key={tool.label} size="xs" variant="ghost" label={tool.label} disabled={tool.disabled} onClick={tool.onSelect}>
              <Icon name={tool.icon} />
            </IconButton>
          ))}
          {onOpen && <IconButton size="xs" variant="ghost" label={openLabel} onClick={onOpen}><Icon name="chevron-right" /></IconButton>}
        </Box>
      </Box>
      <Box className="action-tile__reading">
        <Span className="action-tile__value" data-tone={tone}>{value}</Span>
        {unit !== undefined && <Span className="action-tile__unit">{unit}</Span>}
      </Box>
      {meta !== undefined && <Span className="action-tile__meta">{meta}</Span>}
      {action && (
        <Box className="action-tile__action">
          <Button size="sm" variant={action.variant ?? 'secondary'} disabled={action.disabled} onClick={action.onSelect}
            icon={action.icon ? <Icon name={action.icon} /> : undefined}>
            {action.label}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export { ActionTile };
