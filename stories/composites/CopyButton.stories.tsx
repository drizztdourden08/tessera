/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { CodeBlock, CopyButton } from '../../src/composites';
import type { CopyButtonSize } from '../../src/composites';
import { Flex } from '../../src/primitives';
import type { ButtonVariant } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type CopyButtonArgs = {
  label: string;
  showLabel: boolean;
  variant: ButtonVariant;
  size: CopyButtonSize;
  disabled: boolean;
  loading: boolean;
};

const ADDRESS = 'archipelago.gg:38281';

const DEBUG_INFO = ['Brock 0.12.4', 'Electron 39.2.1', 'Windows 11 (26200)', 'Palette pelago'].join('\n');

const SIZES: readonly CopyButtonSize[] = ['xs', 'sm', 'md'];

const VARIANTS: readonly ButtonVariant[] = ['ghost', 'secondary', 'tertiary'];

const ARGS: Partial<CopyButtonArgs> = { label: 'Copy address', showLabel: false, variant: 'ghost', size: 'sm', disabled: false, loading: false };

const ARG_TYPES: PlaygroundArgTypes<CopyButtonArgs> = {
  label: { group: 'Content', control: 'text', description: 'The name of the button; it reads Copied for two seconds after a copy.' },
  showLabel: { group: 'Content', control: 'boolean', description: 'Shows the word beside the icon, as a Button.' },
  variant: { group: 'Appearance', control: 'select', options: [...VARIANTS] },
  size: { group: 'Appearance', control: 'select', options: [...SIZES] },
  disabled: { group: 'State', control: 'boolean' },
  loading: { group: 'State', control: 'boolean', description: 'For a text that is still being gathered.' },
};

const meta = {
  title: 'Composites · Actions/CopyButton',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CopyButtonArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <CopyButton text={ADDRESS} {...args} />,
} satisfies PlaygroundStory<CopyButtonArgs>;

const IconOnly = {
  name: 'Icon only',
  render: () => (
    <Demonstrator
      corner="Variant"
      rows={axis(VARIANTS)}
      columns={axis(SIZES)}
      cell={(variant, size) => <CopyButton text={ADDRESS} label="Copy address" variant={variant} size={size} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<CopyButtonArgs>;

const WithWord = {
  name: 'With its word',
  render: () => (
    <Flex gap="sm" align="center" wrap>
      <CopyButton text={ADDRESS} label="Copy address" showLabel variant="secondary" />
      <CopyButton text={() => DEBUG_INFO} label="Copy debug info" showLabel variant="secondary" size="md" />
      <CopyButton text={DEBUG_INFO} label="Copy debug info" showLabel variant="secondary" loading />
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<CopyButtonArgs>;

const InCode = {
  name: 'In a code block',
  render: () => <CodeBlock code={'pnpm add @drizztdourden08/tessera'} language="text" copyable />,
} satisfies StoryLiteStoryDefinition<CopyButtonArgs>;

const CODE = `import { CopyButton } from '@drizztdourden08/tessera';

<CopyButton text={address} label="Copy address" />
<CopyButton text={() => debugInfo()} label="Copy debug info" showLabel variant="secondary" />`;

const Overview = overviewStory({
  component: 'CopyButton',
  description: 'A button that copies a text to the clipboard and says Copied for two seconds.',
  points: [
    '`text` is the string to copy, or a function that builds it at the moment of the click.',
    'Icon only by default, named by `label`; `showLabel` writes the word beside the icon.',
    '`xs` draws a 12 px icon in a 20 px button, like an xs [IconButton], and keeps a 24 px hit area.',
    'After a copy the icon turns to a check, the name reads Copied and a screen reader hears it.',
    '`onCopied` runs after a copy that worked, such as to close the menu the button sits in.',
    'Every Tessera copy goes through it, so [CopyValue], [FactsPanel] and [CodeBlock] copy alike.',
  ],
  instead: '[CopyValue] to show the value itself with its copy button.',
  playground: Playground,
  variants: [IconOnly, WithWord, InCode],
  states: {
    render: (props: StateProps) => <CopyButton text={ADDRESS} label="Copy address" showLabel variant="secondary" {...props} />,
    list: [STATE.idle, { ...STATE.hover, target: 'button' }, { ...STATE.focus, target: 'button' }, STATE.loading, STATE.disabled],
  },
  code: CODE,
});

export default meta;
export { IconOnly, InCode, Overview, Playground, WithWord };
