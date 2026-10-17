/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { ArmedIconButton } from '../../src/composites';
import type { ArmedIconButtonTone } from '../../src/composites';
import type { ArmedIconName, IconButtonSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { SaveSlotRows } from './_samples/SaveSlotRows';

type ToneChoice = 'none' | ArmedIconButtonTone;

type ArmedArgs = {
  icon: ArmedIconName;
  label: string;
  tone: ToneChoice;
  size: IconButtonSize;
  disabled: boolean;
};

const ICONS: readonly ArmedIconName[] = ['load-state', 'save-state', 'trash-2'];
const TONES: readonly ToneChoice[] = ['none', 'info', 'warning', 'danger', 'primary', 'success'];
const toneOf = (tone: ToneChoice): ArmedIconButtonTone | undefined => (tone === 'none' ? undefined : tone);

const ARG_TYPES: PlaygroundArgTypes<ArmedArgs> = {
  icon: { group: 'Content', control: 'select', options: ICONS, description: 'The drawing and the loop it plays while armed.' },
  label: { group: 'Content', control: 'text' },
  tone: { group: 'Appearance', control: 'select', options: ['none', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'info'] },
  size: { group: 'Appearance', control: 'select', options: ['xs', 'sm', 'md'] },
  disabled: { group: 'State', control: 'boolean' },
};

const meta = {
  title: 'Composites · Actions/ArmedIconButton',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ArmedArgs>;

const Playground = {
  name: 'Playground',
  args: { icon: 'load-state', label: 'Load', tone: 'info', size: 'sm', disabled: false },
  argTypes: ARG_TYPES,
  render: (args) => (
    <ArmedIconButton icon={args.icon} label={args.label} tone={toneOf(args.tone)} size={args.size} disabled={args.disabled} onConfirm={() => undefined} />
  ),
} satisfies PlaygroundStory<ArmedArgs>;

const SaveRow = {
  name: 'A save row: Load, Overwrite and Delete',
  render: () => <SaveSlotRows />,
} satisfies StoryLiteStoryDefinition<ArmedArgs>;

const Tones = {
  name: 'Each icon in each tone',
  render: () => (
    <Demonstrator
      corner="icon"
      rows={axis(ICONS)}
      columns={axis(TONES)}
      cell={(icon, tone) => <ArmedIconButton icon={icon} label={icon} tone={toneOf(tone)} onConfirm={() => undefined} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<ArmedArgs>;

const renderState = (props: StateProps) => (
  <ArmedIconButton icon="save-state" tone="warning" label="Overwrite" timeout={false} onConfirm={() => undefined} {...props} />
);

const Overview = overviewStory({
  component: 'ArmedIconButton',
  description: 'An icon button pressed twice: the first press arms it and its icon loops, the second press acts.',
  points: [
    'The first press morphs the icon and loops it until a second press runs `onConfirm`.',
    'It disarms after 4 s, on blur, on [[Esc]] or when focus moves to another button, and runs `onCancel`.',
    'Armed, its name and tooltip read Click again to and the label; a status region says it once.',
    '`icon` picks the drawing and its loop: `load-state`, `save-state` or `trash-2`.',
    '`tone` colours the icon, such as `info` or `danger`; without it the icon takes currentColor.',
    '`timeout={false}` keeps it armed until blur or [[Esc]]. Reduced motion shows the armed pose still.',
  ],
  instead: '[ConfirmIconButton] when the second press should be a separate check with a cancel beside it.',
  playground: Playground,
  variants: [SaveRow, Tones],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { name: 'Armed', props: { defaultArmed: true } },
      { name: 'Armed, load', props: { defaultArmed: true, icon: 'load-state', tone: 'info', label: 'Load' } },
      { name: 'Armed, delete', props: { defaultArmed: true, icon: 'trash-2', tone: 'danger', label: 'Delete' } },
      { ...STATE.disabled, props: { disabled: true, label: 'Cannot overwrite while the game runs' } },
    ],
  },
});

export default meta;
export { Overview, Playground, SaveRow, Tones };
