/* @layer stories @kind component */
import { Box, Button, Text } from '../../../src/primitives';
import { ToastStack, toast } from '../../../src/composites';

const SettingsPanel = () => (
  <Box className="story-column">
    <Text className="story-label">Settings panel</Text>
    <Button
      variant="secondary"
      onClick={() => toast({ variant: 'danger', message: 'Settings could not be saved.', action: { label: 'Retry', onSelect: () => undefined } })}
    >
      Save settings
    </Button>
    <ToastStack />
  </Box>
);

const SavePanel = () => (
  <Box className="story-column">
    <Text className="story-label">Save panel</Text>
    <Button variant="secondary" onClick={() => toast({ variant: 'success', message: 'Save state written to slot 3.' })}>Write the save</Button>
    <ToastStack />
  </Box>
);

const ToastSources = () => (
  <Box className="story-row">
    <SettingsPanel />
    <SavePanel />
  </Box>
);

export { ToastSources };
