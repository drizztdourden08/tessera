/* @layer stories @kind component */
import { useState } from 'react';
import { PathInput } from '../../../src/composites';
import { Box, Field } from '../../../src/primitives';

const PLAYER_PATH = String.raw`C:\Games\Archipelago\Players\Bram.txt`;

const PathInputBlurDemo = () => {
  const [value, setValue] = useState<string | null>(PLAYER_PATH);
  const [checked, setChecked] = useState<string | null>(null);
  const problem = checked !== null && !/\.ya?ml$/i.test(checked) ? 'Pick a .yaml or .yml file.' : undefined;
  return (
    <Box className="path-input-story">
      <Field label="Player file" hint="Checked when you leave the box." error={problem}>
        <PathInput value={value} onChange={setValue} onBlur={() => setChecked(value ?? '')} placeholder="No player file yet" />
      </Field>
    </Box>
  );
};

export { PathInputBlurDemo };
