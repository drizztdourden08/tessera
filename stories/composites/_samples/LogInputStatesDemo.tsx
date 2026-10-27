/* @layer stories @kind component */
import { LogPanel } from '../../../src/composites';
import type { LogRow } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { TERMINAL_KINDS } from './data-log-terminal';

const ROWS: readonly LogRow[] = [{ id: 'input-0', gutter: '', tag: '', kind: 'out', message: 'The run has started.' }];

const refuseThenSend = (text: string): Promise<boolean> => new Promise((resolve) => {
  setTimeout(() => resolve(text !== 'fail'), 800);
});

const LogInputStatesDemo = () => (
  <Box className="story-column">
    <Text className="story-label">Type fail and press Enter: the line stays in the field. Any other line is sent after a short wait, and a second Enter in that time is ignored.</Text>
    <Box className="log-panel-story">
      <LogPanel rows={ROWS} kinds={TERMINAL_KINDS} toolbar={false} onInput={refuseThenSend} />
    </Box>
    <Text className="story-label">A run without input shows a disabled row with its reason.</Text>
    <Box className="log-panel-story">
      <LogPanel rows={ROWS} kinds={TERMINAL_KINDS} toolbar={false} inputDisabled inputPlaceholder="This run has no input" />
    </Box>
  </Box>
);

export { LogInputStatesDemo };
