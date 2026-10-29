/* @layer stories @kind component */
import { CopyButton } from '../../../src/composites';
import { Box, Button, ButtonRow, TextInput } from '../../../src/primitives';

const COMMAND = 'tessera launch my-worktree none --target storylite';

const CommandLine = () => (
  <Box className="story-column">
    <ButtonRow
      align="end"
      gap="xs"
      lead={<TextInput readOnly mono aria-label="Launch command" defaultValue={COMMAND} />}
    >
      <CopyButton text={COMMAND} label="Copy command" size="md" />
      <Button variant="primary">Run</Button>
    </ButtonRow>
  </Box>
);

export { CommandLine };
