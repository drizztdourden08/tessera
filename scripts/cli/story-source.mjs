/* @layer tooling-scripts @kind logic */
import { quoteText } from './quote-text.mjs';

const importsOf = ({ mode, kind, names, folder }) => {
  if (mode === 'app') {
    return [
      'import { Text } from \'@drizztdourden08/tessera\';',
      `import { ${names.name} } from '../../${folder}';`,
    ];
  }
  if (kind === 'primitive') return [`import { ${names.name}, Text } from '../../src/primitives';`];
  return [`import { ${names.name} } from '../../src/composites';`, 'import { Text } from \'../../src/primitives\';'];
};

const overviewLines = ({ names }) => [
  'const Overview = overviewStory({',
  `  component: '${names.name}',`,
  `  description: ${quoteText(`Write what ${names.name} is for, then show its variants, its states and its playground.`)},`,
  '  playground: Playground,',
  '  variants: [Default],',
  '});',
  '',
];

const storySource = (spec) => {
  const { name, human } = spec.names;
  const args = `${name}Args`;
  const overview = spec.mode === 'tessera';
  return [
    '/* @layer stories @kind story */',
    'import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from \'@storylite/storylite\';',
    ...importsOf(spec),
    ...(overview ? ['import { overviewStory } from \'../_template/overview-story\';'] : []),
    '',
    `type ${args} = {\n  title: string;\n};`,
    '',
    `const ARG_TYPES: StoryLiteArgTypes<${args}> = {\n  title: { control: 'text' },\n};`,
    '',
    `const meta = {\n  title: ${quoteText(spec.storyTitle)},\n  parameters: { renderer: 'react' },\n} satisfies StoryLiteMeta<${args}>;`,
    '',
    'const Playground = {',
    '  name: \'Playground\',',
    `  args: { title: ${quoteText(human)} },`,
    '  argTypes: ARG_TYPES,',
    '  render: (args) => (',
    `    <${name} title={args.title}>`,
    `      <Text>The content ${name} holds.</Text>`,
    `    </${name}>`,
    '  ),',
    `} satisfies StoryLiteStoryDefinition<${args}>;`,
    '',
    `const Default = {\n  name: 'Default',\n  render: () => <${name} title=${JSON.stringify(human)} />,\n} satisfies StoryLiteStoryDefinition<${args}>;`,
    '',
    ...(overview ? overviewLines(spec) : []),
    'export default meta;',
    `export { Default, ${overview ? 'Overview, ' : ''}Playground };`,
    '',
  ].join('\n');
};

export { storySource };
