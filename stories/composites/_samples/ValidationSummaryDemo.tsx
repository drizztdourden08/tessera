/* @layer stories @kind component */
import { useRef, useState } from 'react';
import { ValidationSummary } from '../../../src/composites';
import type { ValidationProblem } from '../../../src/composites';
import { Box, Field, TextInput } from '../../../src/primitives';

const KEY_ID = 'validation-demo-key-file';
const PATH_ID = 'validation-demo-ap-path';

const problemsOf = (key: string, path: string): ValidationProblem[] => [
  ...(key.trim() ? [] : [{ id: 'key', message: 'Enter the path of the key file.', field: KEY_ID }]),
  ...(path.startsWith('/') ? [] : [{ id: 'path', message: 'The Archipelago path must be absolute.', field: PATH_ID }]),
];

const ValidationSummaryDemo = () => {
  const [key, setKey] = useState('');
  const [path, setPath] = useState('srv/archipelago');
  const keyRef = useRef<HTMLInputElement>(null);
  const pathRef = useRef<HTMLInputElement>(null);
  const focusField = (field: string): void => (field === KEY_ID ? keyRef : pathRef).current?.focus();
  const problems = problemsOf(key, path);
  const errorOf = (id: string) => problems.find((problem) => problem.field === id)?.message;
  return (
    <Box className="validation-summary-story">
      <ValidationSummary problems={problems} onFocusField={focusField} />
      <Field label="Key file" htmlFor={KEY_ID} error={errorOf(KEY_ID)}>
        <TextInput ref={keyRef} id={KEY_ID} value={key} invalid={Boolean(errorOf(KEY_ID))} onChange={(event) => setKey(event.target.value)} />
      </Field>
      <Field label="Archipelago path on the host" htmlFor={PATH_ID} error={errorOf(PATH_ID)}>
        <TextInput ref={pathRef} id={PATH_ID} value={path} invalid={Boolean(errorOf(PATH_ID))} onChange={(event) => setPath(event.target.value)} />
      </Field>
    </Box>
  );
};

export { ValidationSummaryDemo };
