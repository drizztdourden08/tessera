/* @layer stories @kind component */
import { useState } from 'react';
import { ConfirmIconButton } from '../../../src/composites';
import { Box, Button, Card, Icon, IconButton, Text } from '../../../src/primitives';
import { ITEM_LOG } from './sessions';

const LogToolbarDemo = () => {
  const [entries, setEntries] = useState<readonly string[]>(ITEM_LOG);
  const [paused, setPaused] = useState(false);
  return (
    <Box className="confirm-story__panel">
      <Box className="confirm-story__toolbar">
        <ConfirmIconButton
          placement="start"
          icon={<Icon name="trash-2" size={14} />}
          label="Clear the item log"
          confirmLabel="Yes, clear it"
          cancelLabel="Keep the log"
          disabled={entries.length === 0}
          onConfirm={() => setEntries([])}
        />
        <IconButton label={paused ? 'Resume the log' : 'Pause the log'} title={paused ? 'Resume' : 'Pause'} active={paused} onClick={() => setPaused(!paused)}>
          <Icon name={paused ? 'play' : 'pause'} size={14} />
        </IconButton>
        <IconButton label="Download the log" title="Download">
          <Icon name="download" size={14} />
        </IconButton>
        <Text className="confirm-story__count">{`${entries.length} entries`}</Text>
      </Box>
      {entries.map((entry) => <Text key={entry} className="confirm-story__entry">{entry}</Text>)}
      {entries.length === 0 && (
        <Button variant="tertiary" onClick={() => setEntries(ITEM_LOG)}>Bring the entries back</Button>
      )}
    </Box>
  );
};

const PresetCardDemo = () => {
  const [deleted, setDeleted] = useState(false);
  if (deleted) {
    return (
      <Card className="confirm-story__card">
        <Text>Preset deleted.</Text>
        <Button variant="tertiary" onClick={() => setDeleted(false)}>Bring it back</Button>
      </Card>
    );
  }
  return (
    <Card className="confirm-story__card">
      <Text variant="title">Casual</Text>
      <Text>Short goals, hints on, items shared between all players.</Text>
      <Box className="confirm-story__footer">
        <ConfirmIconButton
          placement="center"
          icon={<Icon name="trash-2" size={14} />}
          label="Delete the Casual preset"
          confirmLabel="Yes, delete it"
          cancelLabel="Keep it"
          onConfirm={() => setDeleted(true)}
        />
      </Box>
    </Card>
  );
};

export { LogToolbarDemo, PresetCardDemo };
