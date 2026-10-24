/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { FloatingPrompt } from '../../src/composites';
import type { FloatingPromptScope } from '../../src/composites';
import type { ToastVariant } from '../../src/composites';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { PromptWorkArea } from './_samples/PromptWorkArea';
import { TOAST_VARIANTS } from './_samples/toast-samples.constants';

type PromptArgs = {
  message: string;
  variant: ToastVariant;
  scope: FloatingPromptScope;
  open: boolean;
};

const ARGS: Partial<PromptArgs> = { message: 'Apply the 3 pending edits to the canvas.', variant: 'info', scope: 'container', open: true };

const ARG_TYPES: PlaygroundArgTypes<PromptArgs> = {
  message: { group: 'Content', control: 'text' },
  variant: { group: 'Appearance', control: 'select', options: [...TOAST_VARIANTS] },
  scope: { group: 'Behaviour', control: 'select', options: ['container', 'window'], description: 'container blocks the parent only; window blocks the whole page.' },
  open: { group: 'Behaviour', control: 'boolean' },
};

const meta = {
  title: 'Composites · Feedback/FloatingPrompt',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PromptArgs>;

const noop = () => undefined;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: ({ message, variant, scope, open }) => (
    <Box className="story-frame">
      <FloatingPrompt
        open={open}
        message={message}
        variant={variant}
        scope={scope}
        actions={[
          { id: 'apply', label: 'Apply', onSelect: noop },
          { id: 'cancel', label: 'Cancel', onSelect: noop, cancel: true },
        ]}
      />
    </Box>
  ),
} satisfies PlaygroundStory<PromptArgs>;

const OverCanvas = {
  name: 'Over a work area',
  render: () => <PromptWorkArea />,
} satisfies StoryLiteStoryDefinition<PromptArgs>;

const WholeWindow = {
  name: 'Blocking the whole window',
  render: () => <PromptWorkArea scope="window" startOpen={false} />,
} satisfies StoryLiteStoryDefinition<PromptArgs>;

const Overview = overviewStory({
  component: 'FloatingPrompt',
  description: 'A bar at the foot of a region that asks a question and blocks that region until the user answers.',
  points: [
    'It draws as a Toast across the full width of its parent, with `actions` from data such as Apply and Cancel.',
    'While `open`, the siblings of the bar are inert, so the region gets no pointer or keyboard input.',
    '`scope="window"` blocks the whole page; the default `container` blocks only the parent, which must be positioned.',
    'Focus moves to the first action when it opens and returns to where it was when it closes.',
    'Escape runs the action marked `cancel`; the bar is an alert dialog that is not modal to the rest of the app.',
    'Under reduced motion the bar appears with no animation.',
  ],
  instead: '[Dialog] when the whole app must wait, [Toast] for a message that passes.',
  playground: Playground,
  variants: [OverCanvas, WholeWindow],
  code: `import { FloatingPrompt } from '@drizztdourden08/tessera';

// Inside a positioned parent, beside the region it blocks
<FloatingPrompt
  open={pending > 0}
  message="Apply the 3 pending edits to the canvas."
  actions={[
    { id: 'apply', label: 'Apply', onSelect: apply },
    { id: 'cancel', label: 'Cancel', onSelect: cancel, cancel: true },
  ]}
/>

// The whole page waits
<FloatingPrompt open scope="window" variant="warning" message="Discard the unsaved changes?" actions={actions} />`,
});

export default meta;
export { Overview, OverCanvas, Playground, WholeWindow };
