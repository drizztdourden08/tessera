/* @layer stories @kind component */
import { useState } from 'react';
import { DialogShell } from '../../../src/composites';
import { Box, Button, Combobox, Flex, Glyph, IconButton, Select, Spinner, Text } from '../../../src/primitives';

const NO_ITEMS: readonly string[] = [];

const PortaledDialog = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <Flex gap="sm" align="center">
      <Button variant="secondary" onClick={() => setOpen(true)}>Open a dialog</Button>
      <Text variant="caption">The dialog renders through a portal and still draws the app spinner.</Text>
      <DialogShell
        open={open}
        onClose={close}
        title="Joining the room"
        actions={<><Button variant="tertiary" onClick={close}>Close</Button><Button variant="primary" loading>Join session</Button></>}
      >
        <Flex gap="sm" align="center">
          <Spinner />
          <Text>Waiting for eu-west-2 to accept the room.</Text>
        </Flex>
      </DialogShell>
    </Flex>
  );
};

const ProviderShowcase = () => (
  <Box className="story-column">
    <Flex gap="sm" align="center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Text>Connecting to the multiworld server...</Text>
    </Flex>
    <Flex gap="sm" align="center">
      <Button variant="primary" loading>Save changes</Button>
      <Button variant="tertiary" icon={<Glyph name="copy" />} loading>Duplicate</Button>
      <IconButton label="Save the layout" variant="secondary" size="md" loading><Glyph name="save" /></IconButton>
    </Flex>
    <Flex gap="sm" align="center">
      <Combobox items={NO_ITEMS} loading placeholder="Search the catalogue" aria-label="Game" />
      <Select options={[]} loading placeholder="Pick a build" aria-label="Build" />
    </Flex>
    <PortaledDialog />
  </Box>
);

export { ProviderShowcase };
