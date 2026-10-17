/* @layer stories @kind story */
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { VolumeControl } from '../../src/composites';
import type { VolumeSlider } from '../../src/composites';
import type { ControlSize, ScaleOrientation } from '../../src/primitives';
import { axis } from '../_template/axis';
import { SIZE_ARG } from '../_template/control-sizes.constants';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { sizesStory } from '../_template/sizes-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { StatefulVolume } from './_samples/StatefulVolume';
import { VolumeHints } from './_samples/VolumeHints';
import { VolumePopovers } from './_samples/VolumePopovers';
import { VolumeTitleBar } from './_samples/VolumeTitleBar';
import './VolumeControl.stories.css';

type VolumeArgs = {
  label: string;
  description: string;
  flag: boolean;
  showValue: boolean;
  disabled: boolean;
  size: ControlSize;
  slider: VolumeSlider;
  orientation: ScaleOrientation;
};

const ARGS: Partial<VolumeArgs> = { label: 'Music volume', description: 'Plays under every screen.', flag: false, showValue: true, disabled: false, size: 'md', slider: 'inline', orientation: 'vertical' };

const ARG_TYPES: PlaygroundArgTypes<VolumeArgs> = {
  label: { group: 'Content', control: 'text' },
  description: { group: 'Content', control: 'text' },
  showValue: { group: 'Appearance', control: 'boolean' },
  disabled: { group: 'State', control: 'boolean' },
  flag: { group: 'Behaviour', control: 'boolean', description: 'Passes muted and onMutedChange, so muting keeps the level instead of dropping it to zero.' },
  size: SIZE_ARG,
  slider: { group: 'Appearance', control: 'select', options: ['inline', 'popover'], description: 'Beside the button, or in a popover that opens on hover or focus.' },
  orientation: { group: 'Appearance', control: 'select', options: ['vertical', 'horizontal'], description: 'Which way the slider runs in the popover.' },
};

const meta = {
  title: 'Composites · Inputs/VolumeControl',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<VolumeArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StatefulVolume key={`${String(args.flag)} ${args.slider}`} initial={60} {...args} />,
} satisfies PlaygroundStory<VolumeArgs>;

const LEVELS: Readonly<Record<string, ReactNode>> = {
  Silent: <StatefulVolume initial={0} label="Music volume" />,
  Quiet: <StatefulVolume initial={30} label="Music volume" />,
  Loud: <StatefulVolume initial={85} label="Music volume" />,
};

const Levels = {
  name: 'The icon follows the level',
  render: () => <Demonstrator rows={axis(Object.keys(LEVELS))} align="stretch" cell={(row) => LEVELS[row]} />,
} satisfies StoryLiteStoryDefinition<VolumeArgs>;

const MODES: Readonly<Record<string, ReactNode>> = {
  'Level only: mute drops to 0 and brings the level back': <StatefulVolume initial={60} label="Effects" />,
  'With a muted flag: the level stays while muted': <StatefulVolume initial={60} label="Effects" flag />,
};

const Modes = {
  name: 'Two ways to mute',
  render: () => <Demonstrator rows={axis(Object.keys(MODES))} align="stretch" cell={(row) => MODES[row]} />,
} satisfies StoryLiteStoryDefinition<VolumeArgs>;

const Popover = {
  name: 'In a popover on hover or focus',
  render: () => <VolumePopovers />,
} satisfies StoryLiteStoryDefinition<VolumeArgs>;

const TitleBar = {
  name: 'In a title bar',
  render: () => <VolumeTitleBar />,
} satisfies StoryLiteStoryDefinition<VolumeArgs>;

const Hints = {
  name: 'Hints',
  render: () => <VolumeHints />,
} satisfies StoryLiteStoryDefinition<VolumeArgs>;

const Sizes = sizesStory<VolumeArgs>((size) => <StatefulVolume initial={60} size={size} label="Music volume" />, { align: 'stretch' });

const renderState = (props: StateProps) => (
  <VolumeControl label="Music volume" value={props.muted === true ? 0 : 60} onChange={() => undefined} disabled={props.disabled === true} />
);

const CODE = `import { useState } from 'react';
import { VolumeControl } from '@drizztdourden08/tessera';

const [volume, setVolume] = useState(80);
<VolumeControl label="Music volume" value={volume} onChange={setVolume} />

const [muted, setMuted] = useState(false);
<VolumeControl value={volume} onChange={setVolume} muted={muted} onMutedChange={setMuted} />

<VolumeControl slider="popover" value={volume} onChange={setVolume} muted={muted} onMutedChange={setMuted} />`;

const Overview = overviewStory({
  component: 'VolumeControl',
  description: 'A mute button with a volume [Slider] beside it or in a popover, for any sound level, drawn with [VolumeIcon].',
  points: [
    'With `value` and `onChange` alone, mute drops the level to the minimum and a second press brings it back.',
    'Pass `muted` and `onMutedChange` to keep the level while muted; dragging the slider while muted unmutes.',
    'The icon grows primary colour waves in four steps as the level rises, and a red X at 0 or muted.',
    '`slider="popover"` opens the slider on hover or focus, vertical unless `orientation` is horizontal.',
    'In the popover the wheel and the arrows change the level; it closes on leave, blur, Escape or a click away.',
    'The readout shows percent of the range unless `formatValue` says otherwise, and both parts report hints.',
  ],
  playground: Playground,
  variants: [Levels, Modes, Popover, TitleBar, Hints, Sizes],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.icon-btn' },
      { ...STATE.focus, target: '.slider__input' },
      { name: 'Muted', props: { muted: true } },
      STATE.disabled,
    ],
  },
  code: CODE,
});

export default meta;
export { Hints, Levels, Modes, Overview, Playground, Popover, Sizes, TitleBar };
