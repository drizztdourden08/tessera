/* @layer stories @kind component */
import { Box, Button, Icon, Status } from '../../../src/primitives';
import type { PlayerCellProps } from './row-grid-players.type';

const OverridesCell = ({ player, onChange }: PlayerCellProps) => {
  const fromFile = player.preset === 'file';
  const word = player.overrides === 1 ? '1 change' : `${String(player.overrides)} changes`;
  return (
    <Box className="players-story__overrides">
      {fromFile && <Status>From file</Status>}
      {!fromFile && player.overrides === 0 && <Status>No changes</Status>}
      {!fromFile && player.overrides > 0 && <Status tone="warning" dot>{word}</Status>}
      <Button size="sm" variant="ghost" icon={<Icon name="pencil" size={14} />} disabled={fromFile} onClick={() => onChange({ overrides: player.overrides + 1 })}>
        Edit
      </Button>
    </Box>
  );
};

export { OverridesCell };
