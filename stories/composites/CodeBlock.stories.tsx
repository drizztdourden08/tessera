/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { CodeBlock } from '../../src/composites';
import type { CodeBlockLanguage } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { JSON_SAMPLE, TS_SAMPLE } from './_samples/data-code';

type CodeBlockArgs = {
  language: CodeBlockLanguage;
  highlightedLines: string;
  showLineNumbers: boolean;
  copyable: boolean;
};

const TSX_SAMPLE = `import { Button } from '@drizztdourden08/tessera';

<Button variant="primary" size="md">
  Save changes
</Button>`;

const SAMPLES: Record<CodeBlockLanguage, string> = { typescript: TS_SAMPLE, tsx: TSX_SAMPLE, json: JSON_SAMPLE };

const parseLines = (text: string): number[] =>
  text.split(',').flatMap((part) => {
    const [from = Number.NaN, to] = part.split('-').map((n) => Number.parseInt(n.trim(), 10));
    if (Number.isNaN(from)) return [];
    if (to === undefined || Number.isNaN(to)) return [from];
    return Array.from({ length: Math.max(0, to - from + 1) }, (_, i) => from + i);
  });

const ARGS: Partial<CodeBlockArgs> = { language: 'typescript', highlightedLines: '12-13', showLineNumbers: true, copyable: true };

const ARG_TYPES: StoryLiteArgTypes<CodeBlockArgs> = {
    language: { control: 'select', options: ['typescript', 'tsx', 'json'] },
    showLineNumbers: { control: 'boolean' },
    copyable: { control: 'boolean' },
    highlightedLines: { control: 'text', description: 'Lines to mark as changed, for example 3, 5-7' },
  };

const meta = {
  title: 'Composites · Content/CodeBlock',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CodeBlockArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <CodeBlock
      code={SAMPLES[args.language]}
      language={args.language}
      highlightedLines={parseLines(args.highlightedLines)}
      showLineNumbers={args.showLineNumbers}
      copyable={args.copyable}
    />
  ),
} satisfies StoryLiteStoryDefinition<CodeBlockArgs>;

const SideBySide = {
  name: 'Both languages',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">typescript</Text>
      <CodeBlock code={TS_SAMPLE} language="typescript" />
      <Text className="story-label">json, settings block changed</Text>
      <CodeBlock code={JSON_SAMPLE} language="json" highlightedLines={[6, 7, 8, 9]} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<CodeBlockArgs>;

const Overview = overviewStory({
  component: 'CodeBlock',
  description: 'A panel of highlighted, monospaced code that scrolls sideways when a line runs long. Use it to show a snippet, a config file or a diff in docs and settings. It highlights TypeScript, TSX and JSON with colours from the theme, can mark changed lines, and can add a line-number gutter and a copy button.',
  playground: Playground,
  variants: [SideBySide],
});

export default meta;
export { Overview, Playground, SideBySide };
