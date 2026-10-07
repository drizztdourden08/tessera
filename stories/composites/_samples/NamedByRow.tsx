/* @layer stories @kind component */
import { FormRow } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import type { NamedByRowProps } from './NamedByRow.type';
import './option-editor-story.css';

const NamedByRow = ({ rows }: NamedByRowProps) => (
  <Box className="option-editor-story option-editor-story--wide">
    {rows.map(({ id, label, description, control }) => (
      <FormRow key={id} id={id} label={label} description={description}>{control(`${id}-label`)}</FormRow>
    ))}
  </Box>
);

export { NamedByRow };
