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
  hostHints: false,
  defaultHints: true,
  followPointer: false,
};

const ARG_TYPES: PlaygroundArgTypes<GuideArgs> = {
  hostHints: { group: 'Content', control: 'boolean', description: "Adds two rows of the host's own keys through hints." },
  defaultHints: { group: 'Content', control: 'boolean', description: 'Keeps the built-in Ctrl rows before the hints passed in.' },
  mode: { group: 'State', control: 'select', options: ['moving', 'resizing'], description: 'What the user is doing to the window.' },
  snapping: { group: 'State', control: 'boolean', description: 'Off shows Snapping off, as while Ctrl is held. Holding Ctrl over the page turns it off here too.' },
  open: { group: 'State', control: 'boolean', description: 'Shows the overlay with a quick fade.' },
  followPointer: { group: 'Layout', control: 'boolean', description: 'Passes the pointer: the card sits beside it and follows it, with no scrim. Move the pointer over the page.' },
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
const HostKeys = story("With the host's own keys", { mode: 'moving', hostHints: true });
const BesidePointer = story('Beside the pointer', { mode: 'moving', followPointer: true });

const CODE = `import { WindowGuideOverlay } from '@drizztdourden08/tessera';

<WindowGuideOverlay
  open={dragging}
  mode={resizing ? 'resizing' : 'moving'}
  snapping={!ctrlHeld}
  pointer={dragging ? { x: event.clientX, y: event.clientY } : null}
  hints={[{ keys: ['shift'], label: 'Keep the size while moving' }]}
/>`;

const Overview = overviewStory({
  component: 'WindowGuideOverlay',
  description: 'A compact guide that lists the keys while a window is moved or resized, beside the pointer or over the window.',
  points: [
    'The card names what is happening and whether the window snaps to corners and edges.',
    '`pointer` sets it beside the pointer, following it and kept on screen, with no scrim; else it sits centred.',
    '[[Ctrl]] moves or resizes without snapping; `hints` adds rows of the host\'s own keys.',
    'The host shows it with `open`; it fades in and out, at once under reduced motion.',
    'It is hidden from screen readers, and a polite status line says the mode instead.',
  ],
  playground: Playground,
  variants: [Moving, Resizing, SnappingOff, HostKeys, BesidePointer],
  code: CODE,
});

export default meta;
export { BesidePointer, HostKeys, Moving, Overview, Playground, Resizing, SnappingOff };
