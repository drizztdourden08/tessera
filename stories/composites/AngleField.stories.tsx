/* @layer stories @kind story */
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { AngleField } from '../../src/composites';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { ValueReadout } from '../_template/ValueReadout';

type AngleFieldArgs = {
  snap: number;
  dial: boolean;
  disabled: boolean;
  mixed: boolean;
};

const ARGS: AngleFieldArgs = { snap: 15, dial: true, disabled: false, mixed: false };

const ARG_TYPES: PlaygroundArgTypes<AngleFieldArgs> = {
  snap: { group: 'Behaviour', control: 'select', options: [0, 15, 22.5, 45], description: 'Degrees the dial and the wheel snap to; 0 is free. Shift drops the snap while dragging the dial.' },
  dial: { group: 'Appearance', control: 'boolean' },
  mixed: { group: 'State', control: 'boolean', description: 'The values differ; the next angle clears it.' },
  disabled: { group: 'State', control: 'boolean' },
};

const meta = {
  title: 'Composites · Inputs/AngleField',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<AngleFieldArgs>;

const StatefulAngle = (props: { initial: number } & Partial<AngleFieldArgs>) => {
  const { initial, snap, mixed = false, ...rest } = props;
  const [value, setValue] = useState(initial);
  const [differs, setDiffers] = useState(mixed);
  return (
    <ValueReadout value={differs ? 'mixed' : `${String(value)} degrees`}>
      <AngleField
        aria-label="Rotation"
        {...rest}
        snap={snap === 0 ? undefined : snap}
        mixed={differs}
        value={value}
        onChange={(next) => {
          setDiffers(false);
          setValue(next);
        }}
      />
    </ValueReadout>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StatefulAngle key={String(args.mixed)} initial={45} {...args} />,
} satisfies PlaygroundStory<AngleFieldArgs>;

const SNAPS: Readonly<Record<string, ReactNode>> = {
  'Snap 15 degrees': <StatefulAngle initial={45} snap={15} />,
  'Snap 22.5 degrees': <StatefulAngle initial={45} snap={22.5} />,
  'Snap 45 degrees': <StatefulAngle initial={45} snap={45} />,
  'Free: whole degrees': <StatefulAngle initial={37} />,
};

const Snaps = {
  name: 'Snaps: 15, 22.5 and 45 degrees, or free',
  render: () => <Demonstrator rows={axis(Object.keys(SNAPS))} cell={(row) => SNAPS[row]} />,
} satisfies StoryLiteStoryDefinition<AngleFieldArgs>;

const Mixed = {
  name: 'Mixed: the sprites differ, and a new angle clears it',
  render: () => <StatefulAngle initial={90} snap={15} mixed />,
} satisfies StoryLiteStoryDefinition<AngleFieldArgs>;

const NoDial = {
  name: 'Without the dial: only the number and the wheel',
  render: () => <StatefulAngle initial={90} snap={15} dial={false} />,
} satisfies StoryLiteStoryDefinition<AngleFieldArgs>;

const renderState = (props: StateProps) => (
  <AngleField aria-label="Rotation" value={60} snap={15} onChange={() => undefined} mixed={props.mixed === true} disabled={props.disabled === true} />
);

const CODE = `import { useState } from 'react';
import { AngleField } from '@drizztdourden08/tessera';

const [angle, setAngle] = useState(45);
<AngleField label="Rotation" snap={15} value={angle} onChange={setAngle} />`;

const Overview = overviewStory({
  component: 'AngleField',
  description: 'An angle in degrees with a dial you drag and a [NumberField] for the exact number.',
  points: [
    'Drag the dial or type a number; 0 points right and the angle grows clockwise, wrapping at 360.',
    '`snap` rounds the dial to 15, 22.5 or 45 degrees; Shift while dragging drops the snap.',
    'The wheel and the arrow keys step by the snap and wrap past 0 and 360; Shift steps one degree.',
    '`mixed` shows Mixed for angles that differ, and the next angle clears it.',
  ],
  playground: Playground,
  variants: [Snaps, Mixed, NoDial],
  states: {
    render: renderState,
    list: [STATE.idle, { name: 'Mixed', props: { mixed: true } }, STATE.disabled],
  },
  code: CODE,
});

export default meta;
export { Mixed, NoDial, Overview, Playground, Snaps };
