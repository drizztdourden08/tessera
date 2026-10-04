/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { ReactNode } from 'react';
import { TEXT_ELEMENT_SPECS, Text, TextElement } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';

const ELEMENTS: readonly { label: string; node: ReactNode }[] = [
  ...TEXT_ELEMENT_SPECS.map((spec) => ({
    label: spec.name === spec.short ? `Text.${spec.name}` : `Text.${spec.name} · Text.${spec.short}`,
    node: <TextElement as={spec.tag}>{spec.name}</TextElement>,
  })),
  { label: 'Text.Shortcut · Text.Sc', node: <Text.Sc keys="ctrl" mouse="left" /> },
  { label: 'Text.Quote · Text.Q', node: <Text.Quote>It is dangerous to go alone.</Text.Quote> },
  { label: 'Text.CodeBlock', node: <Text.CodeBlock code="const hero = 'Link';" language="typescript" /> },
];

const meta = {
  title: 'Core · Text/All elements',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const All = {
  name: 'All elements',
  render: () => (
    <Demonstrator rows={axis(ELEMENTS.map((entry) => entry.label))} cell={(label) => ELEMENTS.find((entry) => entry.label === label)?.node} />
  ),
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'Text elements',
  description: 'Every HTML text element as a Tessera component, side by side on one page.',
  points: [
    'Each one is on [Text] by full name or short name, such as `Text.Paragraph` or `Text.P`.',
    'Each one also imports on its own, such as `Paragraph` or `P`.',
    'Each takes the native attributes of its tag and only the look its use needs.',
    'Free text takes `weight`, `italic`, `opticalSize` and `features`; numbers take `features`.',
    'A `tone` appears only where colour carries meaning.',
  ],
  variants: [All],
});

export default meta;
export { All, Overview };
