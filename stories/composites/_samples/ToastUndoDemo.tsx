/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Button, Text } from '../../../src/primitives';
import { ToastStack, toast } from '../../../src/composites';
import type { ToastCloseReason } from '../../../src/composites';
import { UNDO_FOR } from './save-samples.constants';

const OUTCOME: Readonly<Record<ToastCloseReason, string>> = {
  action: 'Undone: the save is back.',
  expired: 'The toast left on its own: the save is deleted for good.',
  dismissed: 'The toast was closed: the save is deleted for good.',
  replaced: 'A second delete joined the toast: the first save is deleted for good.',
};

const ToastUndoDemo = () => {
  const [note, setNote] = useState('Delete the save, then press Undo, close the toast or wait 8 s.');
  const remove = () => {
    setNote('Deleted. Undo stays as long as the toast.');
    toast({ message: 'Save deleted.', duration: UNDO_FOR, action: { label: 'Undo', onSelect: () => undefined }, onClose: (reason) => setNote(OUTCOME[reason]) });
  };
  return (
    <Box className="story-row">
      <Button variant="secondary" onClick={remove}>Delete the save</Button>
      <Text className="story-label" role="status">{note}</Text>
      <ToastStack />
    </Box>
  );
};

export { ToastUndoDemo };
