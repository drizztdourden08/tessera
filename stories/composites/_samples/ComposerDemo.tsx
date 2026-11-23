/* @layer stories @kind component */
import { useState } from 'react';
import { Composer } from '../../../src/composites';
import { Box, Button, Text } from '../../../src/primitives';

interface ComposerDemoProps {
  disabled?: boolean;
  busy?: boolean;
  maxRows?: number;
  withBar?: boolean;
}

const ComposerDemo = ({ disabled = false, busy = false, maxRows, withBar = false }: ComposerDemoProps) => {
  const [value, setValue] = useState('');
  const [sent, setSent] = useState('Enter sends, Shift+Enter adds a line');
  return (
    <Box className="composer-story__frame">
      <Composer
        aria-label="Message"
        value={value}
        onChange={setValue}
        onSubmit={(text) => {
          setSent(`Sent ${text.length} characters`);
          setValue('');
        }}
        placeholder="Ask anything"
        maxRows={maxRows}
        disabled={disabled}
        busy={busy}
        bar={withBar ? <Button size="sm" variant="ghost">Attach</Button> : undefined}
      />
      <Text className="story-label">{sent}</Text>
    </Box>
  );
};

export { ComposerDemo };
