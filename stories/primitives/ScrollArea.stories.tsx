/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Flex, ScrollArea, Text } from '../../src/primitives';
import type { ScrollAxis, ScrollPosition } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import './ScrollArea.stories.css';

type ScrollAreaArgs = {
  axis: ScrollAxis;
  entries: number;
};

const CHANGES = [
  'Save slots show a screenshot of the last room',
  'Controller presets can be renamed',
  'Fixed audio drift after a long session',
  'The seed field accepts pasted links',
  'Tracker remembers its window position',
  'New shortcut to toggle the item tracker',
  'Faster startup on large save folders',
  'Screenshots are named after the room',
];

const SETTINGS_KEYS = ['scale', 'aspect', 'vsync', 'shader', 'volume', 'latency', 'deadzone', 'turbo', 'autosave', 'language'];

const configLines = (suffix: string) =>
  Array.from({ length: 30 }, (_, index) => `${SETTINGS_KEYS[index % SETTINGS_KEYS.length]}.${Math.floor(index / 10)} = ${suffix}${index}`);

const ARGS: Partial<ScrollAreaArgs> = { axis: 'y', entries: 24 };

const ARG_TYPES: StoryLiteArgTypes<ScrollAreaArgs> = {
    axis: { control: 'select', options: ['y', 'x', 'both'] },
    entries: { control: 'number' },
  };

const meta = {
  title: 'Primitives · Layout/ScrollArea',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ScrollAreaArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <ScrollArea axis={args.axis} className="scroll-demo">
      {Array.from({ length: Math.max(0, args.entries) }, (_, index) => (
        <Box key={index} className="scroll-demo__entry">
          <Text variant="caption">{`Version 2.${Math.floor(index / 4)}.${index % 4}`}</Text>
          <Text as="div">{CHANGES[index % CHANGES.length]}</Text>
        </Box>
      ))}
    </ScrollArea>
  ),
} satisfies StoryLiteStoryDefinition<ScrollAreaArgs>;

const AXES: readonly ScrollAxis[] = ['y', 'x', 'both'];

const axisContent = (axis: ScrollAxis) => {
  if (axis === 'y') {
    return CHANGES.map((change) => (
      <Box key={change} className="scroll-demo__entry">
        <Text as="div">{change}</Text>
      </Box>
    ));
  }
  return Array.from({ length: axis === 'x' ? 1 : 4 }, (_, row) => (
    <Box key={row} className="scroll-demo__strip">
      {CHANGES.map((change, index) => (
        <Box key={change} className="scroll-demo__card">
          <Text variant="caption">{`Slot ${row * CHANGES.length + index + 1}`}</Text>
          <Text as="div" variant="subtitle">{change}</Text>
        </Box>
      ))}
    </Box>
  ));
};

const AllVariants = {
  name: 'All variants',
  render: () => (
    <Box className="story-column">
      {AXES.map((axis) => (
        <Box key={axis} className="story-column">
          <Text className="story-label">{`axis ${axis}`}</Text>
          <ScrollArea axis={axis} className="scroll-demo">{axisContent(axis)}</ScrollArea>
        </Box>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ScrollAreaArgs>;

const Horizontal = {
  name: 'Horizontal axis',
  render: () => (
    <Box className="story-column">
      <ScrollArea axis="x" className="scroll-demo">
        <Box className="scroll-demo__strip">
          {CHANGES.map((change, index) => (
            <Box key={change} className="scroll-demo__card">
              <Text variant="caption">{`Slot ${index + 1}`}</Text>
              <Text as="div" variant="subtitle">{change}</Text>
            </Box>
          ))}
        </Box>
      </ScrollArea>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ScrollAreaArgs>;

const MirroredPanesDemo = () => {
  const [leftTarget, setLeftTarget] = useState<ScrollPosition | undefined>(undefined);
  const [rightTarget, setRightTarget] = useState<ScrollPosition | undefined>(undefined);
  const panes = [
    { title: 'Current', lines: configLines('old-'), target: leftTarget, onScroll: setRightTarget },
    { title: 'Proposed', lines: configLines('new-'), target: rightTarget, onScroll: setLeftTarget },
  ];

  return (
    <Flex gap="md">
      {panes.map((pane) => (
        <Box key={pane.title} className="scroll-demo__pane">
          <Text className="story-label">{pane.title}</Text>
          <ScrollArea className="scroll-demo" scrollTo={pane.target} onScroll={pane.onScroll}>
            {pane.lines.map((line) => (
              <Box key={line} className="scroll-demo__entry">
                <Text variant="caption">{line}</Text>
              </Box>
            ))}
          </ScrollArea>
        </Box>
      ))}
    </Flex>
  );
};

const MirroredPanes = {
  name: 'Mirrored panes',
  render: () => <MirroredPanesDemo />,
} satisfies StoryLiteStoryDefinition<ScrollAreaArgs>;

const CODE = `import { Box, ScrollArea } from '@drizztdourden08/tessera';

<ScrollArea axis="y" className="changelog">
  {entries.map((entry) => (
    <Box key={entry.id}>{entry.text}</Box>
  ))}
</ScrollArea>`;

const Overview = overviewStory({
  component: 'ScrollArea',
  description: 'A scrollable region with the one scrollbar style used everywhere, and scrolling that glides instead of jumping. Use it wherever content can grow past a fixed height or width. axis picks y, x or both, and the other direction is clipped. onScroll and scrollTo let two areas move together, as in a side by side comparison.',
  playground: Playground,
  variants: [AllVariants],
  code: CODE,
});

export default meta;
export { AllVariants, Horizontal, MirroredPanes, Overview, Playground };
