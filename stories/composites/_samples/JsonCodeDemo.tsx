/* @layer stories @kind component */
import { Box, Text } from '../../../src/primitives';
import type { JsonCodeDemoProps } from './json-text.type';
import { JsonField } from './JsonField';
import { useJsonText } from './useJsonText';
import './option-editor-story.css';

const JsonCodeDemo = ({ start, draft }: JsonCodeDemoProps) => {
  const json = useJsonText(start, draft);
  return (
    <Box className="option-editor-story">
      <JsonField json={json} label="Plando texts" />
      <Text variant="caption" tone={json.problem ? 'danger' : 'dim'}>{json.problem?.message ?? 'Valid JSON'}</Text>
      <Text variant="caption" tone="dim" className="option-editor-story__value">{`Saved value: ${JSON.stringify(json.saved)}`}</Text>
    </Box>
  );
};

export { JsonCodeDemo };
