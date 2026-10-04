/* @layer stories @kind component */
import { Box, Field, Select, TextInput, Toggle } from '../../../../src/primitives';
import type { EditorPageBodyProps } from './EditorOption.type';

const GOALS = [{ value: 'ganon', label: 'Defeat Ganon' }, { value: 'triforce', label: 'Triforce hunt' }];

const EditorPageBody = ({ withName }: EditorPageBodyProps) => (
  <Box className="preview-page__body">
    {withName && (
      <Field label="Name" error={withName.error}>
        <TextInput value={withName.name} onChange={(event) => withName.onChange(event.currentTarget.value)} />
      </Field>
    )}
    <Field label="Goal">
      <Select options={GOALS} value="ganon" onChange={() => undefined} />
    </Field>
    <Field label="Keysanity" inline>
      <Toggle checked onChange={() => undefined} />
    </Field>
  </Box>
);

export { EditorPageBody };
