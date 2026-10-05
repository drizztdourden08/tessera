/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { CodeBlock } from '../../src/composites';
import type { CodeBlockLanguage } from '../../src/composites';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { axis } from '../_template/axis';
import { BROKEN, BROKEN_CASES, PLANDO } from '../primitives/_samples/option-samples.constants';
import { DIAGNOSTICS_SAMPLE, JSON_SAMPLE, TS_SAMPLE } from './_samples/data-code';
import { EditableCode } from './_samples/EditableCode';
import { JsonCodeDemo } from './_samples/JsonCodeDemo';

type CodeBlockArgs = {
  language: CodeBlockLanguage;
  highlightedLines: string;
  showLineNumbers: boolean;
  copyable: boolean;
  wrap: boolean;
  capped: boolean;
  editable: boolean;
};

const TSX_SAMPLE = `import { Button } from '@drizztdourden08/tessera';

<Button variant="primary" size="md">
  Save changes
</Button>`;

const SAMPLES: Record<CodeBlockLanguage, string> = { typescript: TS_SAMPLE, tsx: TSX_SAMPLE, json: JSON_SAMPLE, text: DIAGNOSTICS_SAMPLE };

const parseLines = (text: string): number[] =>
  text.split(',').flatMap((part) => {
    const [from = Number.NaN, to] = part.split('-').map((n) => Number.parseInt(n.trim(), 10));
    if (Number.isNaN(from)) return [];
    if (to === undefined || Number.isNaN(to)) return [from];
    return Array.from({ length: Math.max(0, to - from + 1) }, (_, i) => from + i);
  });

const ARGS: Partial<CodeBlockArgs> = {
  language: 'typescript', highlightedLines: '12-13', showLineNumbers: true, copyable: true, wrap: false, capped: false, editable: false,
};

const ARG_TYPES: PlaygroundArgTypes<CodeBlockArgs> = {
    language: { group: 'Content', control: 'select', options: ['typescript', 'tsx', 'json', 'text'] },
    showLineNumbers: { group: 'Appearance', control: 'boolean' },
    highlightedLines: { group: 'Appearance', control: 'text', description: 'Lines to mark as changed, for example 3, 5-7' },
    wrap: { group: 'Layout', control: 'boolean', description: 'Wraps long lines in place of scrolling sideways.' },
    capped: { group: 'Layout', control: 'boolean', description: 'Stops growing at a fixed height and scrolls inside.' },
    copyable: { group: 'Behaviour', control: 'boolean' },
    editable: { group: 'Behaviour', control: 'boolean', description: 'Turns the block into a field: the text is typed over the highlighting.' },
  };

const meta = {
  title: 'Composites · Content/CodeBlock',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CodeBlockArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (args.editable ? <EditableCode key={args.language} start={SAMPLES[args.language]} language={args.language} /> : (
    <CodeBlock
      code={SAMPLES[args.language]}
      language={args.language}
      highlightedLines={parseLines(args.highlightedLines)}
      showLineNumbers={args.showLineNumbers}
      copyable={args.copyable}
      wrap={args.wrap}
      capped={args.capped}
    />
  )),
} satisfies PlaygroundStory<CodeBlockArgs>;

const SideBySide = {
  name: 'Both languages',
  render: () => (
    <Demonstrator
      rows={[{ key: 'typescript', label: 'typescript' }, { key: 'json', label: 'json, settings block changed' }]}
      align="stretch"
      cell={(language) => (language === 'json'
        ? <CodeBlock code={JSON_SAMPLE} language="json" highlightedLines={[6, 7, 8, 9]} />
        : <CodeBlock code={TS_SAMPLE} language="typescript" />)}
    />
  ),
} satisfies StoryLiteStoryDefinition<CodeBlockArgs>;

const Diagnostics = {
  name: 'Plain text, wrapped and capped',
  render: () => <CodeBlock code={DIAGNOSTICS_SAMPLE} language="text" wrap capped copyable />,
} satisfies StoryLiteStoryDefinition<CodeBlockArgs>;

const JSON_ROWS = { 'valid JSON': undefined, 'a missing comma': BROKEN } as const;

const Editable = {
  name: 'Editable JSON, checked with JSON.parse',
  render: () => (
    <Demonstrator
      rows={axis(Object.keys(JSON_ROWS) as (keyof typeof JSON_ROWS)[])}
      align="stretch"
      cell={(row) => <JsonCodeDemo start={PLANDO} draft={JSON_ROWS[row]} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<CodeBlockArgs>;

const Problems = {
  name: 'What the browser says for each problem',
  render: () => (
    <Demonstrator rows={axis(Object.keys(BROKEN_CASES))} align="stretch" cell={(name) => <JsonCodeDemo start={{}} draft={BROKEN_CASES[name]} />} />
  ),
} satisfies StoryLiteStoryDefinition<CodeBlockArgs>;

const Overview = overviewStory({
  component: 'CodeBlock',
  description: 'A panel of highlighted code for a snippet, a config file or a diff in docs and settings.',
  points: [
    '`language` takes `typescript`, `tsx`, `json`, or `text` for a debug report shown as it is.',
    '`highlightedLines` marks changed lines; `showLineNumbers` adds a gutter.',
    '`copyable` adds a copy button.',
    'Long lines scroll sideways; `wrap` wraps them, and `capped` stops at a fixed height and scrolls inside.',
    '`editable` makes it a field for any language; `value` and `onChange` hold the text, which grows and wraps.',
    '`invalid` marks the field and `problemLine` tints a line, to show what a check such as `JSON.parse` found.',
  ],
  instead: '[Code] for a fragment inside a sentence, or [Preformatted] for plain text with no panel tools.',
  playground: Playground,
  variants: [SideBySide, Diagnostics, Editable, Problems],
});

export default meta;
export { Diagnostics, Editable, Overview, Playground, Problems, SideBySide };
