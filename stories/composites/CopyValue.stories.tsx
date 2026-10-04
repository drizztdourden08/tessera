/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { CopyValue } from '../../src/composites';
import type { CopyValueSize } from '../../src/composites';
import { Box, Flex, Status } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import './CopyValue.stories.css';

type TruncateChoice = 'none' | 'end' | 'middle';

type CopyValueArgs = {
  value: string;
  label: string;
  mono: boolean;
  truncate: TruncateChoice;
  size: CopyValueSize;
  narrow: boolean;
};

const ADDRESS = 'archipelago.gg:38281';

const SEED = '48213907751426690131';

const FINGERPRINT = 'SHA256:mK3v9Qe1ZtR8wLp2xN6cY4hB0sJ7uF5dA1gH9kT2oE';

const ROOM = 'https://archipelago.gg/room/qL7xR2mN9vTzK4pW';

const ARGS: Partial<CopyValueArgs> = { value: FINGERPRINT, label: 'host key', mono: true, truncate: 'middle', size: 'sm', narrow: true };

const ARG_TYPES: PlaygroundArgTypes<CopyValueArgs> = {
  value: { group: 'Content', control: 'text', description: 'The text shown and copied.' },
  label: { group: 'Content', control: 'text', description: 'What the value is; the button reads Copy and this name.' },
  mono: { group: 'Appearance', control: 'boolean', description: 'Sets the value in the monospace face, for codes and keys.' },
  truncate: { group: 'Layout', control: 'select', options: ['none', 'end', 'middle'], description: 'How a value too long for its line is cut; none wraps it.' },
  size: { group: 'Appearance', control: 'select', options: ['sm', 'md'] },
  narrow: { group: 'Layout', control: 'boolean', description: 'Sets the value in a 224 px box.' },
};

const meta = {
  title: 'Composites · Content/CopyValue',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CopyValueArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: ({ truncate, narrow, ...args }) => (
    <Box className={narrow ? 'copy-value-story copy-value-story--narrow' : 'copy-value-story'}>
      <CopyValue {...args} truncate={truncate === 'none' ? undefined : truncate} />
    </Box>
  ),
} satisfies PlaygroundStory<CopyValueArgs>;

const VALUES = {
  'Room address': { label: 'room address', value: ADDRESS, mono: true },
  'Seed': { label: 'seed', value: SEED, mono: true },
  'Room page': { label: 'room page', value: ROOM, mono: true },
  'Player name': { label: 'player name', value: 'Link of Hyrule', mono: false },
} as const;

const VALUE_KEYS = Object.keys(VALUES) as (keyof typeof VALUES)[];

const Values = {
  name: 'Values',
  render: () => (
    <Demonstrator
      rows={axis(VALUE_KEYS)}
      cell={(key) => <CopyValue {...VALUES[key]} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<CopyValueArgs>;

const TRUNCATIONS: readonly TruncateChoice[] = ['none', 'end', 'middle'];

const Truncation = {
  name: 'Truncation in 224 px',
  render: () => (
    <Demonstrator
      corner="truncate"
      rows={axis(TRUNCATIONS)}
      cell={(truncate) => (
        <Box className="copy-value-story copy-value-story--narrow">
          <CopyValue value={FINGERPRINT} label="host key" mono truncate={truncate === 'none' ? undefined : truncate} />
        </Box>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<CopyValueArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Demonstrator columns={axis(['sm', 'md'] as const)} cell={(_row, size) => <CopyValue value={ADDRESS} label="room address" mono size={size} />} />
  ),
} satisfies StoryLiteStoryDefinition<CopyValueArgs>;

const InStatusBar = {
  name: 'In a status bar',
  render: () => (
    <Flex className="copy-value-story__bar" align="center" gap="md" wrap>
      <Status tone="success" variant="pill">HOSTING</Status>
      <CopyValue value={ADDRESS} label="room address" mono />
      <CopyValue value={SEED} label="seed" mono truncate="middle" />
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<CopyValueArgs>;

const CODE = `import { CopyValue } from '@drizztdourden08/tessera';

<CopyValue value={address} label="room address" mono />
<CopyValue value={fingerprint} label="host key" mono truncate="middle" />`;

const Overview = overviewStory({
  component: 'CopyValue',
  description: 'A value the user often copies, such as an address, a seed or a key, with a copy button at its end.',
  points: [
    '`label` names the value, so the button reads Copy room address and Copied after a click.',
    '`mono` sets codes, keys and addresses in the monospace face.',
    '`truncate` cuts a long value at its `end` or in its `middle`, which keeps the last characters in view.',
    'A cut value shows the whole text on hover, and a screen reader reads it whole.',
    'Its button is a [CopyButton], so it copies, confirms and announces like every other copy.',
  ],
  instead: 'A [StatRow] with `copyable` for a label and its value on one row.',
  playground: Playground,
  variants: [Values, Truncation, Sizes, InStatusBar],
  states: {
    render: (props: StateProps) => <CopyValue value={ADDRESS} label="room address" mono {...props} />,
    list: [STATE.idle, { ...STATE.hover, target: 'button' }, { ...STATE.focus, target: 'button' }],
  },
  code: CODE,
});

export default meta;
export { InStatusBar, Overview, Playground, Sizes, Truncation, Values };
