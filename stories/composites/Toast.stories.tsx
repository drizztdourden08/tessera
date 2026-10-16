/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Button, Text } from '../../src/primitives';
import { Toast, ToastStack, toast } from '../../src/composites';
import type { ToastItem, ToastPosition, ToastVariant } from '../../src/composites';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { SAMPLE_MESSAGES, TOAST_VARIANTS } from './_samples/toast-samples.constants';
import { ToastSources } from './_samples/ToastSources';
import { ToastUndoDemo } from './_samples/ToastUndoDemo';

type ToastArgs = {
  message: string;
  variant: ToastVariant;
  duration: number;
  max: number;
  position: ToastPosition;
};

const ARGS: Partial<ToastArgs> = { message: SAMPLE_MESSAGES.success, variant: 'success', duration: 4000, max: 3, position: 'bottom-right' };

const ARG_TYPES: PlaygroundArgTypes<ToastArgs> = {
  message: { group: 'Content', control: 'text' },
  variant: { group: 'Appearance', control: 'select', options: [...TOAST_VARIANTS] },
  position: { group: 'Layout', control: 'select', options: ['bottom-right', 'bottom-left'] },
  max: { group: 'Layout', control: 'number', description: 'How many show at once; the rest wait in the queue.' },
  duration: { group: 'Behaviour', control: 'number', description: 'Milliseconds before it leaves. Zero keeps it until dismissed.' },
};

const meta = {
  title: 'Composites · Feedback/Toast',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ToastArgs>;

const noop = () => undefined;

const EVERY_VARIANT: ToastItem[] = TOAST_VARIANTS.map((variant) => ({ id: variant, variant, message: SAMPLE_MESSAGES[variant] }));

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: ({ message, variant, duration, max, position }) => (
    <Box className="story-row">
      <Button onClick={() => toast({ message, variant, duration, id: `${variant}:${message}:${duration}` })}>Show toast</Button>
      <Button variant="secondary" onClick={() => toast.clear()}>Clear the queue</Button>
      <ToastStack position={position} max={max} />
    </Box>
  ),
} satisfies PlaygroundStory<ToastArgs>;

const Variants = {
  name: 'Variants',
  render: () => (
    <Demonstrator
      rows={EVERY_VARIANT.map((item) => ({ key: item.id, label: item.variant ?? item.id }))}
      align="stretch"
      cell={(id) => EVERY_VARIANT.filter((item) => item.id === id).map((item) => <Toast key={item.id} item={item} onDismiss={noop} />)}
    />
  ),
} satisfies StoryLiteStoryDefinition<ToastArgs>;

const Repeated = {
  name: 'The same message shown three times',
  render: () => <Toast item={{ id: 'saved', variant: 'success', message: SAMPLE_MESSAGES.success, count: 3 }} onDismiss={noop} />,
} satisfies StoryLiteStoryDefinition<ToastArgs>;

const Sources = {
  name: 'Two parts raise toasts, one stack',
  render: () => <ToastSources />,
} satisfies StoryLiteStoryDefinition<ToastArgs>;

const WithAction = {
  name: 'With an action',
  render: () => (
    <Box className="story-row">
      <Button
        variant="secondary"
        onClick={() => toast({
          variant: 'danger',
          message: 'Settings could not be saved.',
          duration: 0,
          action: { label: 'Retry', onSelect: () => toast({ variant: 'success', message: 'Settings saved.', duration: 3000 }) },
        })}
      >
        Save settings
      </Button>
      <Text className="story-label">Every press adds to the count of the same toast.</Text>
      <ToastStack />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ToastArgs>;

const UndoWindow = {
  name: 'An Undo that lasts as long as the toast',
  render: () => <ToastUndoDemo />,
} satisfies StoryLiteStoryDefinition<ToastArgs>;

const Overview = overviewStory({
  component: 'Toast',
  description: 'Short messages that pop up in a corner of the window and leave on their own, such as a save written.',
  points: [
    '`toast()` raises one from any part of the app; `ToastStack`, mounted once at the root, draws the one queue.',
    '`max` caps how many show, 3 by default; a second `ToastStack` draws nothing while the first is mounted.',
    'The stack is a polite status region and a `danger` toast is an alert; the same message joins with a count.',
    'It leaves after `duration` (5 s, 0 stays); it waits under the pointer or focus, then the full time starts again.',
    '`action` adds a button such as Retry or Undo, which runs and closes the toast.',
    '`onClose` runs once as it goes: `expired`, `dismissed`, `action`, or `replaced` when the same message joins.',
  ],
  instead: '[Callout] for a note that stays in the page.',
  playground: Playground,
  variants: [Sources, Variants, Repeated, WithAction, UndoWindow],
  code: `import { Button, ToastStack, toast } from '@drizztdourden08/tessera';

// Once, at the root of the app
<ToastStack position="bottom-right" max={3} />

// Anywhere else
<Button onClick={() => toast({ variant: 'success', message: 'Save state written to slot 3.' })}>Save</Button>

// An undo window that follows the toast: the delete runs when the toast goes for any reason but its action
toast({
  message: 'Save deleted.',
  duration: 8000,
  action: { label: 'Undo', onSelect: restoreSave },
  onClose: (reason) => { if (reason !== 'action') deleteSaveForGood(); },
});`,
});

export default meta;
export { Overview, Playground, Repeated, Sources, UndoWindow, Variants, WithAction };
