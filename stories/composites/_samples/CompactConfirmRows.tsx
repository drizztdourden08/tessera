/* @layer stories @kind component */
import { useState } from 'react';
import { CommandPaletteRow, ConfirmIconButton, ControlMenu, ControlMenuRow } from '../../../src/composites';
import type { CommandPaletteItem } from '../../../src/composites';
import { Box, Icon, Text, Toggle } from '../../../src/primitives';

const ResetLayout = ({ onReset }: { onReset: () => void }) => (
  <ConfirmIconButton
    size="xs"
    placement="end"
    icon={<Icon name="rotate-ccw" size={12} />}
    label="Reset layout"
    confirmLabel="Yes, reset the layout"
    cancelLabel="Keep the layout"
    onConfirm={onReset}
  />
);

const CompactConfirmRows = () => {
  const [resets, setResets] = useState(0);
  const [grid, setGrid] = useState(true);
  const reset = () => setResets(resets + 1);
  const rows: readonly CommandPaletteItem[] = [
    { id: 'sidebar', label: 'Toggle the sidebar', icon: <Icon name="panel-left" size={16} />, breadcrumb: ['View'] },
    { id: 'reset', label: 'Reset layout', icon: <Icon name="layout-grid" size={16} />, breadcrumb: ['View'], action: <ResetLayout onReset={reset} /> },
    { id: 'settings', label: 'Open settings', icon: <Icon name="settings" size={16} />, description: 'Every option of the app' },
  ];
  return (
    <Box className="story-row compact-confirm-rows">
      <Box className="story-column compact-confirm-rows__search" role="listbox" aria-label="Search results">
        {rows.map((item, index) => <CommandPaletteRow key={item.id} item={item} index={index} active={index === 1} onSelect={() => undefined} />)}
      </Box>
      <ControlMenu trigger={{ label: 'Layout', icon: 'layout-grid' }}>
        <ControlMenuRow label="Show the grid">
          <Toggle size="sm" checked={grid} onChange={setGrid} aria-label="Show the grid" />
        </ControlMenuRow>
        <ControlMenuRow label="Reset layout">
          <ResetLayout onReset={reset} />
        </ControlMenuRow>
      </ControlMenu>
      <Text variant="caption">{`Layout reset ${resets} times.`}</Text>
    </Box>
  );
};

export { CompactConfirmRows };
