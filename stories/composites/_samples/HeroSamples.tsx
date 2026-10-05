/* @layer stories @kind component */
import { Box, Button, Icon, Image, ProgressBar, Text } from '../../../src/primitives';

const HeroTools = () => (
  <>
    <Button variant="secondary" size="sm" icon={<Icon name="folder-open" size={14} />} title="Open this profile's folder">Folder</Button>
    <Button variant="secondary" size="sm" icon={<Icon name="download" size={14} />} title="Import a save from another emulator">Import</Button>
  </>
);

const HeroPlay = () => <Button variant="primary" icon={<Icon name="play" size={14} />}>Play</Button>;

const HeroLastSave = () => (
  <Box className="hero-story__save">
    <Image frame className="hero-story__thumb" alt="Hyrule Castle" fallback={<Text className="story-label">No screenshot</Text>} />
    <Box className="hero-story__save-body">
      <Text className="story-label">Last save</Text>
      <Text>Hyrule Castle, before Agahnim</Text>
      <Text className="story-label">Tue, Sep 29, 21:14</Text>
      <Button variant="tertiary" size="sm">Load</Button>
    </Box>
  </Box>
);

const HeroProgress = () => (
  <Box className="hero-story__progress">
    <Text className="story-label">Progress</Text>
    <Text>Link</Text>
    <ProgressBar value={142} max={216} />
    <Text>Zelda</Text>
    <ProgressBar value={37} max={216} />
  </Box>
);

export { HeroLastSave, HeroPlay, HeroProgress, HeroTools };
