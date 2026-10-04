/* @layer tooling-scripts @kind logic */
import { importPath } from './import-path.mjs';
import { quoteText } from './quote-text.mjs';

const importsOf = ({ mode, kind, names, folder, kindDir, storyDir, primitivesDir }) => {
  if (mode === 'app') {
    return [
      'import { Text } from \'@drizztdourden08/tessera\';',
      `import { ${names.name} } from '${importPath(storyDir, folder)}';`,
    ];
  }
  if (kind === 'primitive') return [`import { ${names.name}, Text } from '${importPath(storyDir, kindDir)}';`];
  return [`import { ${names.name} } from '${importPath(storyDir, kindDir)}';`, `import { Text } from '${importPath(storyDir, primitivesDir)}';`];
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

const typesOf = (overview, args) => (overview
  ? {
    storylite: 'StoryLiteMeta, StoryLiteStoryDefinition',
    imports: ['import { overviewStory } from \'../_template/overview-story\';', 'import type { PlaygroundArgTypes, PlaygroundStory } from \'../_template/controls/playground.type\';'],
    argTypes: `PlaygroundArgTypes<${args}>`,
    title: '{ group: \'Content\', control: \'text\' }',
    playground: `PlaygroundStory<${args}>`,
  }
  : {
    storylite: 'StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition',
    imports: [],
    argTypes: `StoryLiteArgTypes<${args}>`,
    title: '{ control: \'text\' }',
    playground: `StoryLiteStoryDefinition<${args}>`,
  });

const storySource = (spec) => {
  const { name, human } = spec.names;
  const args = `${name}Args`;
  const overview = spec.mode === 'tessera';
  const types = typesOf(overview, args);
  return [
    '/* @layer stories @kind story */',
    `import type { ${types.storylite} } from '@storylite/storylite';`,
    ...importsOf(spec),
    ...types.imports,
    '',
    `type ${args} = {\n  title: string;\n};`,
    '',
    `const ARG_TYPES: ${types.argTypes} = {\n  title: ${types.title},\n};`,
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
    `} satisfies ${types.playground};`,
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
