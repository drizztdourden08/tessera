/* @layer stories @kind story */
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Code, Glyph, Text, type ScaleLabelEntry, type ScaleOrientation } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { RuleMarks } from './_samples/RuleMarks';
import { ScaleStage } from './_samples/ScaleStage';
import { VALUE_RULE_EXAMPLES } from './_samples/value-rule-examples.constants';
import { VALUE_RULE_SYNTAX } from './_samples/value-rule-syntax.constants';

type ScaleLabelsArgs = {
  labels: string;
  min: number;
  max: number;
  step: number;
  orientation: ScaleOrientation;
  thin: boolean;
  ticks: boolean;
};

const ARGS: Partial<ScaleLabelsArgs> = { labels: 'every 25 | {v}%', min: 0, max: 100, step: 5, orientation: 'horizontal', thin: true, ticks: true };

const ARG_TYPES: StoryLiteArgTypes<ScaleLabelsArgs> = {
  labels: { control: 'text', description: 'A value rule, read as you type. The marks it makes are listed under the scale.' },
  min: { control: 'number' },
  max: { control: 'number' },
  step: { control: 'number' },
  orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  thin: { control: 'boolean', description: 'Hides labels that would overlap, keeping an even stride and both ends.' },
  ticks: { control: 'boolean' },
};

const meta = {
  title: 'Primitives · Display/ScaleLabels',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ScaleLabelsArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="story-column">
      <ScaleStage {...args} />
      <RuleMarks rule={args.labels} scale={{ min: args.min, max: args.max, step: args.step }} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ScaleLabelsArgs>;

const Syntax = {
  name: 'Value rule syntax',
  render: () => (
    <Demonstrator
      corner="Write"
      rows={Object.keys(VALUE_RULE_SYNTAX).map((key) => ({ key, label: key }))}
      columns={[{ key: 'means', label: 'Means', fill: true }]}
      align="start"
      cell={(row) => <Text>{VALUE_RULE_SYNTAX[row]}</Text>}
    />
  ),
} satisfies StoryLiteStoryDefinition<ScaleLabelsArgs>;

const RULE_COLUMNS = [{ key: 'rule', label: 'Rule' }, { key: 'marks', label: 'Marks', fill: true }, { key: 'drawn', label: 'Drawn', fill: true }] as const;

const exampleCell = (row: string, column: string): ReactNode => {
  const example = VALUE_RULE_EXAMPLES[row];
  if (!example) return null;
  if (column === 'rule') return <Code>{example.rule}</Code>;
  if (column === 'marks') return <RuleMarks rule={example.rule} scale={example.scale} />;
  return <ScaleStage {...example.scale} labels={example.rule} />;
};

const Rules = {
  name: 'Rules',
  render: () => (
    <Demonstrator rows={axis(Object.keys(VALUE_RULE_EXAMPLES))} columns={RULE_COLUMNS} align="stretch" cell={exampleCell} />
  ),
} satisfies StoryLiteStoryDefinition<ScaleLabelsArgs>;

const VOLUME: readonly ScaleLabelEntry[] = [[0, <Glyph key="mute" name="mute" />], [50, 'Half'], [100, <Glyph key="loud" name="volume" />]];

const degrees = (value: number): ReactNode => (value % 45 === 0 ? `${value}°` : null);

const SOURCES: Readonly<Record<string, ReactNode>> = {
  'Pairs of [value, label], with nodes': <ScaleStage min={0} max={100} labels={VOLUME} />,
  'A function, null for no label': <ScaleStage min={0} max={180} step={15} labels={degrees} />,
  'Stops and no labels: every stop': <ScaleStage min={0} max={4} stops={['Off', 'Low', 'Mid', 'High', 'Max']} />,
  'A highlighted span, 25 to 75': <ScaleStage min={0} max={100} labels="every 12.5 | {v}" highlight={[25, 75]} />,
};

const Sources = {
  name: 'Pairs, functions and highlight',
  render: () => <Demonstrator rows={axis(Object.keys(SOURCES))} align="stretch" cell={(row) => SOURCES[row]} />,
} satisfies StoryLiteStoryDefinition<ScaleLabelsArgs>;

const Orientation = {
  name: 'Orientation',
  render: () => (
    <Demonstrator
      columns={axis(['horizontal', 'vertical'] as const)}
      valign="start"
      align="stretch"
      fill
      cell={(_row, column) => <ScaleStage orientation={column} min={-1} max={1} step={0.1} labels="every 0.5 | {v:+0.0}" />}
    />
  ),
} satisfies StoryLiteStoryDefinition<ScaleLabelsArgs>;

const Thinning = {
  name: 'Thinning',
  render: () => (
    <Demonstrator
      rows={axis(['narrow', 'medium', 'wide'] as const)}
      cell={(width) => <ScaleStage width={width} min={0} max={100} labels="steps" />}
    />
  ),
} satisfies StoryLiteStoryDefinition<ScaleLabelsArgs>;

const CODE = `import { ScaleLabels, formatValueRule, parseValueRule } from '@drizztdourden08/tessera';

<ScaleLabels min={0} max={4} step={0.25} labels="every 0.5 | {v}x" />
<ScaleLabels orientation="vertical" min={-1} max={1} labels="ends + 0 | {v:+0.0}" />

const { rule, error } = parseValueRule('every 25 | {v}%');
const { marks } = formatValueRule('every 25 | {v}%', { min: 0, max: 100, step: 5 });
// marks: [{ value: 0, text: '0%' }, { value: 25, text: '25%' }, ...]`;

const Overview = overviewStory({
  component: 'ScaleLabels',
  description: 'Labels along a scale, with a tick above each, from one labels field. Slider draws its labels with it, and a ProgressBar or a StickPlot axis can too. labels takes a value rule (a short text that says where the labels go and how each reads, such as "every 0.5 | {v}x"), a list of [value, label] pairs, or a function from value to label. min, max, step, stops and formatValue describe the scale; orientation lays it out across or up; highlight brightens a span; and thin hides labels that would overlap, keeping an even stride and both ends. The rule engine is also exported on its own: parseValueRule reads a rule into a structure or a clear error, formatValueRule turns a rule and a scale into marks, each a value and its text, and thinLabels picks which of a row of measured labels fit. A rule that does not read warns once in development and draws nothing.',
  playground: Playground,
  variants: [Syntax, Rules, Sources, Orientation, Thinning],
  code: CODE,
});

export default meta;
export { Orientation, Overview, Playground, Rules, Sources, Syntax, Thinning };
