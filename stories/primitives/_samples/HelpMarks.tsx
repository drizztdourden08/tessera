/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Checkbox, Field, Text, TextInput, Toggle } from '../../../src/primitives';

const HelpMarks = () => {
  const [seed, setSeed] = useState('48213');
  const [shops, setShops] = useState(true);
  const [spoilers, setSpoilers] = useState(false);
  return (
    <Box className="story-column">
      <Text className="story-label">
        Point at a question mark, move to it with Tab or click it: the note shows, and it closes on leave, blur, Esc or a click elsewhere
      </Text>
      <Field label="Seed" help="The same seed and options give the same world, so friends can race the same game." htmlFor="field-help-seed">
        <TextInput id="field-help-seed" value={seed} onChange={(event) => setSeed(event.target.value)} />
      </Field>
      <Checkbox checked={shops} onChange={setShops} label="Shuffle shop items" help="Shops can sell any item, including the ones that open new areas." />
      <Toggle checked={spoilers} onChange={setSpoilers} label="Publish the spoiler log" help="Everyone in the room can read where every item is once the game ends." />
    </Box>
  );
};

export { HelpMarks };
