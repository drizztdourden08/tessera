/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Button, Text } from '../../../src/primitives';
import { ContextMenu } from '../../../src/composites';
import type { ContextMenuPoint, MenuGroup } from '../../../src/composites';
import { EDIT_MENU } from './data-menu-features';
import './ContextMenuDemo.css';

type ContextMenuDemoArgs = { closeOnSelect: boolean; filter: boolean; disabled: boolean; longPress: boolean };

const withPick = (groups: MenuGroup[], pick: (id: string) => void): MenuGroup[] => groups.map((group) => ({
  ...group,
  items: group.items.map((node) => ('separator' in node ? node : { ...node, onSelect: () => pick(node.id) })),
}));

const ContextMenuDemo = (props: Partial<ContextMenuDemoArgs> & { corner?: boolean }) => {
  const { corner = false, ...rest } = props;
  const [picked, setPicked] = useState('nothing');
  return (
    <Box className={corner ? 'context-demo context-demo--corner' : 'context-demo'}>
      <ContextMenu {...rest} groups={withPick(EDIT_MENU, setPicked)} label="Edit">
        <Box className="context-demo__target" tabIndex={0}>
          <Text as="span">Right-click, long press, or focus here and press Shift+F10</Text>
        </Box>
      </ContextMenu>
      <Text className="story-label">Picked: {picked}</Text>
    </Box>
  );
};

const ControlledContextMenu = () => {
  const [point, setPoint] = useState<ContextMenuPoint | null>(null);
  return (
    <Box className="context-demo">
      <Button
        variant="secondary"
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setPoint({ x: rect.left, y: rect.bottom });
        }}
      >
        Open the menu below this button
      </Button>
      <ContextMenu groups={EDIT_MENU} label="Edit" open={point !== null} point={point ?? undefined} onClose={() => setPoint(null)} />
    </Box>
  );
};

export { ContextMenuDemo, ControlledContextMenu };
export type { ContextMenuDemoArgs };
