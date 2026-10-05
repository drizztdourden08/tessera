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

const Overview = overviewStory({
  component: 'Toast',
  description: 'Short messages that pop up in a corner of the window and leave on their own, such as a save written.',
  points: [
    '`toast()` raises one from any part of the app; `ToastStack`, mounted once at the root, draws the one queue.',
    'A second `ToastStack` draws nothing while the first is mounted, so two sources never make two stacks.',
    '`max` on the stack caps how many show at once, 3 by default; the rest wait and show as others leave.',
    'The same message raised again joins its toast and shows a count, and its timer starts over.',
    'A toast leaves after `duration`, 5 s by default, or stays at 0; it waits while the pointer or focus is on it.',
    '`action` adds a button such as Retry; the stack is a polite status region and a `danger` toast is an alert.',
  ],
  instead: '[Callout] for a note that stays in the page.',
  playground: Playground,
  variants: [Sources, Variants, Repeated, WithAction],
  code: `import { Button, ToastStack, toast } from '@drizztdourden08/tessera';

// Once, at the root of the app
<ToastStack position="bottom-right" max={3} />

// Anywhere else
<Button onClick={() => toast({ variant: 'success', message: 'Save state written to slot 3.' })}>Save</Button>`,
});

export default meta;
export { Overview, Playground, Repeated, Sources, Variants, WithAction };
