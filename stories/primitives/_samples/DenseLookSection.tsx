/* @layer stories @kind component */
import { useState } from 'react';
import { Checkbox, Field, TextInput, Toggle } from '../../../src/primitives';

const DenseLookSection = () => {
  const [colour, setColour] = useState('#3fa34d');
  const [visible, setVisible] = useState(true);
  const [clip, setClip] = useState(false);
  return (
    <>
      <Field label="Fill colour">
        <TextInput value={colour} onChange={(event) => setColour(event.target.value)} />
      </Field>
      <Toggle label="Visible" checked={visible} onChange={setVisible} />
      <Checkbox label="Clip children" checked={clip} onChange={setClip} />
    </>
  );
};

export { DenseLookSection };
