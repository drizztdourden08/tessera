/* @layer stories @kind component */
import { useState } from 'react';
import { Emphasis } from '../../../src/composites';
import { Box, Button, Text } from '../../../src/primitives';

const ActiveDemo = () => {
  const [active, setActive] = useState(false);
  return (
    <Box className="story-column">
      <Text className="variable-type__size-32"><Emphasis trigger="active" active={active}>Hookshot</Emphasis></Text>
      <Button size="sm" variant="secondary" onClick={() => setActive((value) => !value)}>{active ? 'Rest' : 'Emphasize'}</Button>
    </Box>
  );
};

const PulseDemo = () => {
  const [pulses, setPulses] = useState(0);
  return (
    <Box className="story-column">
      <Text className="variable-type__size-32">
        <Emphasis trigger="pulse" pulseKey={pulses} duration={700}>Item received</Emphasis>
      </Text>
      <Button size="sm" variant="secondary" onClick={() => setPulses((value) => value + 1)}>Receive another</Button>
    </Box>
  );
};

const ButtonDemo = () => (
  <Button variant="primary" data-emphasis-scope>
    <Emphasis from={500} to={800} duration={250}>Start session</Emphasis>
  </Button>
);

export { ActiveDemo, ButtonDemo, PulseDemo };
