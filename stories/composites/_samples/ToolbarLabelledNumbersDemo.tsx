/* @layer stories @kind component */
import { useState } from 'react';
import { Toolbar } from '../../../src/composites';
import type { ToolbarItem } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { LABELLED_NUMBERS } from './toolbar-labelled-numbers.constants';

const ToolbarLabelledNumbersDemo = () => {
  const [values, setValues] = useState<Readonly<Record<string, number>>>(() => Object.fromEntries(LABELLED_NUMBERS.map((entry) => [entry.id, entry.value])));
  const items: readonly ToolbarItem[] = LABELLED_NUMBERS.map((entry) => ({
    kind: 'number',
    ...entry,
    showLabel: true,
    value: values[entry.id] ?? entry.value,
    onChange: (value: number) => setValues((current) => ({ ...current, [entry.id]: value })),
  }));
  return (
    <Box className="toolbar-story">
      {['640', '240'].map((extent) => (
        <Box key={extent} className="toolbar-story">
          <Text className="story-label">{extent === '640' ? 'Room for all four: every value is readable.' : 'Too narrow: whole items fold into More.'}</Text>
          <Box className="toolbar-story__box" data-orientation="horizontal" data-extent={extent}>
            <Toolbar label="Labelled numbers" items={items} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export { ToolbarLabelledNumbersDemo };
