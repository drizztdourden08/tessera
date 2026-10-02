/* @layer stories @kind story */
import type { ReactNode } from 'react';
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { VolumeControl } from '../../src/composites';
import type { ControlSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import { SIZE_ARG } from '../_template/control-sizes.constants';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { sizesStory } from '../_template/sizes-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { StatefulVolume } from './_samples/StatefulVolume';
import { VolumeHints } from './_samples/VolumeHints';

type VolumeArgs = {
  label: string;
  description: string;
  flag: boolean;
  showValue: boolean;
  disabled: boolean;
  size: ControlSize;
};

const ARGS: Partial<VolumeArgs> = { label: 'Music volume', description: 'Plays under every screen.', flag: false, showValue: true, disabled: false, size: 'md' };

const ARG_TYPES: StoryLiteArgTypes<VolumeArgs> = {
  label: { control: 'text' },
  description: { control: 'text' },
  flag: { control: 'boolean', description: 'Passes muted and onMutedChange, so muting keeps the level instead of dropping it to zero.' },
  showValue: { control: 'boolean' },
  disabled: { control: 'boolean' },
  size: SIZE_ARG,
};

const meta = {
  title: 'Composites · Inputs/VolumeControl',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<VolumeArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StatefulVolume key={String(args.flag)} initial={60} {...args} />,
} satisfies StoryLiteStoryDefinition<VolumeArgs>;

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
<VolumeControl value={volume} onChange={setVolume} muted={muted} onMutedChange={setMuted} />`;

const Overview = overviewStory({
  component: 'VolumeControl',
  description: 'A mute button beside a Slider, for any sound level. The speaker icon follows the level: crossed out when silent, one wave below half, two above. With only value and onChange, mute drops the level to the minimum and a second press brings back the last level. Pass muted and onMutedChange to keep the level while muted, as a video player does; the slider then reads zero, and dragging it unmutes. Both parts report hints to a HintScope, and the readout shows percent of the range unless formatValue says otherwise. size md and sm follow the Slider and the IconButton sizes.',
  playground: Playground,
  variants: [Levels, Modes, Hints, Sizes],
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
export { Hints, Levels, Modes, Overview, Playground, Sizes };
