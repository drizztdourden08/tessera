/* @layer stories @kind component */
import { Box, Text } from '../../../src/primitives';
import { RELEASE_NOTES } from './release-notes';

const ReleaseNotes = () => (
  <>
    {RELEASE_NOTES.map((group) => (
      <Box key={group.title}>
        <Text as="h4">{group.title}</Text>
        <Box as="ul">
          {group.items.map((item) => <Box as="li" key={item}>{item}</Box>)}
        </Box>
      </Box>
    ))}
  </>
);

export { ReleaseNotes };
