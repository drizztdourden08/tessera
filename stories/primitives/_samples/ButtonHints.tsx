/* @layer stories @kind story */
import { Box, Button, Flex, HintLine, HintScope, Icon, Text } from '../../../src/primitives';

const ButtonHints = () => (
  <Box className="story-column">
    <Text className="story-label">Point at a button or move to it with Tab: the line under the row says what it does</Text>
    <HintScope>
      <Flex gap="sm" wrap>
        <Button variant="primary" icon={<Icon name="save" />} hint={{ label: 'Save', description: 'Writes the slot to the memory card.' }}>Save</Button>
        <Button hint={{ label: 'Load', description: 'Puts back the last saved slot and drops what changed since.' }}>Load</Button>
        <Button variant="danger" hint={{ label: 'Erase', description: 'Empties the slot. A confirm step follows.' }}>Erase</Button>
      </Flex>
      <HintLine idle="Point at a button to read what it does." />
    </HintScope>
  </Box>
);

export { ButtonHints };
