/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { WindowGuideDemo } from './_samples/WindowGuideDemo';
import type { WindowGuideDemoProps } from './_samples/WindowGuideDemo';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import './WindowGuideOverlay.stories.css';

type GuideArgs = WindowGuideDemoProps;

const ARGS: Partial<GuideArgs> = {
  open: true,
  mode: 'moving',
  snapping: true,
  groupHints: false,
  defaultHints: true,
};

const ARG_TYPES: PlaygroundArgTypes<GuideArgs> = {
  groupHints: { group: 'Content', control: 'boolean', description: 'Adds two group shortcut rows through hints, the way a host lists its own keys.' },
  defaultHints: { group: 'Content', control: 'boolean', description: 'Keeps the built-in Ctrl rows before the hints passed in.' },
  mode: { group: 'State', control: 'select', options: ['moving', 'resizing'], description: 'What the user is doing to the window.' },
  snapping: { group: 'State', control: 'boolean', description: 'Off shows Snapping off, as while Ctrl is held. Holding Ctrl over the page turns it off here too.' },
  open: { group: 'State', control: 'boolean', description: 'Shows the overlay with a quick fade.' },
};

const meta = {
  title: 'Composites · Widgets/WindowGuideOverlay',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<GuideArgs>;

const story = (name: string, patch: Partial<GuideArgs>) => ({
  name,
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WindowGuideDemo {...args} {...patch} />,
} satisfies PlaygroundStory<GuideArgs>);

const Playground = story('Playground', {});
const Moving = story('Moving', { mode: 'moving', snapping: true });
const Resizing = story('Resizing', { mode: 'resizing', snapping: true });
const SnappingOff = story('Snapping off', { mode: 'moving', snapping: false });
const GroupShortcuts = story('With group shortcuts', { mode: 'moving', groupHints: true });

const CODE = `import { WindowGuideOverlay } from '@drizztdourden08/tessera';

<WindowGuideOverlay
  open={dragging}
  mode={resizing ? 'resizing' : 'moving'}
  snapping={!ctrlHeld}
  hints={[{ keys: ['shift'], label: 'Move the whole group together' }]}
/>`;

const Overview = overviewStory({
  component: 'WindowGuideOverlay',
  description: 'A dimmed guide over the whole window that lists the keys while a window is moved or resized.',
  points: [
    'The card names what is happening and whether the window snaps to corners and edges.',
    '[[Ctrl]] moves or resizes without snapping, and on a shared edge it resizes only this window.',
    '`hints` adds rows of the host\'s own, such as group shortcuts.',
    'The host shows it with `open`; it fades in and out, at once under reduced motion.',
    'It is hidden from screen readers, and a polite status line says the mode instead.',
  ],
  playground: Playground,
  variants: [Moving, Resizing, SnappingOff, GroupShortcuts],
  code: CODE,
});

export default meta;
export { GroupShortcuts, Moving, Overview, Playground, Resizing, SnappingOff };
