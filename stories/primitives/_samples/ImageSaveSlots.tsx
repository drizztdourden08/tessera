/* @layer stories @kind component */
import { Box, Flex, Image, Stack, Text } from '../../../src/primitives';
import { SAVE_SLOTS } from './image-frame-samples.constants';

const ImageSaveSlots = () => (
  <Stack gap="sm" className="story-column">
    {SAVE_SLOTS.map((slot) => (
      <Flex key={slot.name} gap="md" align="center" className="image-demo__slot">
        <Image
          frame
          className="image-demo--md"
          src={slot.src}
          pending={slot.pending}
          alt={slot.detail}
          fallback={<Text className="image-demo__placeholder">No screenshot</Text>}
        />
        <Box>
          <Text as="div" variant="title">{slot.name}</Text>
          <Text variant="caption">{slot.detail}</Text>
        </Box>
      </Flex>
    ))}
  </Stack>
);

export { ImageSaveSlots };
