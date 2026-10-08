/* @layer stories @kind component */
import { useRef, useState } from 'react';
import { Dialog, DropdownMenu, ScreenWindow } from '../../../src/composites';
import { Box, Button, Text } from '../../../src/primitives';
import { ScreenDemo } from './ScreenDemo';

const SORT_ITEMS = [{ id: 'sort', items: [{ id: 'name', label: 'By name' }, { id: 'players', label: 'By players' }, { id: 'started', label: 'By start time' }] }];

const EscapeLevels = () => {
  const [screen, setScreen] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [closed, setClosed] = useState<readonly string[]>([]);
  const log = (part: string) => setClosed((was) => [...was, part]);
  const menuOpen = useRef(false);
  const menuChange = (open: boolean) => {
    if (menuOpen.current && !open) log('the menu');
    menuOpen.current = open;
  };
  return (
    <ScreenDemo hidden={!screen} onReopen={() => { setScreen(true); setClosed([]); }} note="Open the dialog and its menu, then press Escape three times">
      <ScreenWindow title="Sessions" hidden={!screen} onClose={() => { setScreen(false); log('the screen'); }}>
        <Box className="story-column screen-window-story__list--padded">
          <Text>A menu in a dialog in a screen. Each press closes one of them, innermost first.</Text>
          <Box className="story-row">
            <Button onClick={() => setDialog(true)}>Open a dialog</Button>
          </Box>
          <Text className="story-label" data-escape-log="">Closed so far: {closed.length === 0 ? 'nothing' : closed.join(', then ')}</Text>
        </Box>
      </ScreenWindow>
      <Dialog
        open={dialog}
        title="Sort the sessions"
        message="Pick an order from the menu."
        confirmLabel="Done"
        onConfirm={() => setDialog(false)}
        onCancel={() => { setDialog(false); log('the dialog'); }}
      >
        <DropdownMenu
          trigger={{ label: 'Order', icon: 'chevron-down', iconSide: 'end' }}
          groups={SORT_ITEMS}
          onOpenChange={menuChange}
        />
      </Dialog>
    </ScreenDemo>
  );
};

export { EscapeLevels };
