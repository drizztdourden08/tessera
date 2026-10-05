/* @layer stories @kind component */
import { Box, Button, Code, Select } from '../../../src/primitives';
import { PRESETS } from './row-grid-players.constants';
import type { PlayerCellProps } from './row-grid-players.type';

const PresetCell = ({ player, onChange }: PlayerCellProps) => (
  <>
    <Select options={PRESETS} value={player.preset} onChange={(preset) => onChange({ preset, file: preset === 'file' ? player.file : undefined })} />
    {player.preset === 'file' && (
      <Box className="players-story__file">
        <Code className="players-story__file-name">{player.file ?? 'No file yet'}</Code>
        <Button size="sm" variant="ghost" onClick={() => onChange({ file: `${player.name || 'player'}.yaml` })}>Replace</Button>
      </Box>
    )}
  </>
);

export { PresetCell };
