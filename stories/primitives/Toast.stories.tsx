/* @layer stories @kind story */
import { useCallback, useRef, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Button, Text, Toast, ToastContainer } from '../../src/primitives';
import type { ToastItem, ToastPosition, ToastVariant } from '../../src/primitives';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';

type ToastArgs = {
  message: string;
  variant: ToastVariant;
  duration: number;
  position: ToastPosition;
};

const VARIANTS: readonly ToastVariant[] = ['info', 'success', 'warning', 'danger'];

const SAMPLE_MESSAGES: Record<ToastVariant, string> = {
  info: 'A new player joined the session.',
  success: 'Save state written to slot 3.',
  warning: 'The tracker lost sync. Retrying.',
  danger: 'This ROM does not match a supported version.',
};

const ARGS: Partial<ToastArgs> = { message: SAMPLE_MESSAGES.success, variant: 'success', duration: 4000, position: 'bottom-right' };

const ARG_TYPES: PlaygroundArgTypes<ToastArgs> = {
    message: { group: 'Content', control: 'text' },
    variant: { group: 'Appearance', control: 'select', options: [...VARIANTS] },
    position: { group: 'Layout', control: 'select', options: ['bottom-right', 'bottom-left'] },
    duration: { group: 'Behaviour', control: 'number', description: 'Milliseconds before it leaves. Zero keeps it until dismissed.' },
  };

const meta = {
  title: 'Primitives · Feedback/Toast',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ToastArgs>;

const useToastQueue = (initial: ToastItem[] = []) => {
  const [toasts, setToasts] = useState<ToastItem[]>(initial);
  const nextId = useRef(initial.length);
  const push = useCallback((item: Omit<ToastItem, 'id'>) => {
    nextId.current += 1;
    const id = `toast-${nextId.current}`;
    setToasts((current) => [...current, { ...item, id }]);
  }, []);
  const dismiss = useCallback((id: string) => setToasts((current) => current.filter((t) => t.id !== id)), []);
  return { toasts, push, dismiss };
};

const ToastLauncher = (props: ToastArgs) => {
  const { message, variant, duration, position } = props;
  const { toasts, push, dismiss } = useToastQueue();
  return (
    <Box className="story-column">
      <Box className="story-row">
        <Button onClick={() => push({ message, variant, duration })}>Show toast</Button>
        <Text className="story-label">{toasts.length} on screen</Text>
      </Box>
      <ToastContainer toasts={toasts} onDismiss={dismiss} position={position} />
    </Box>
  );
};

const EVERY_VARIANT: ToastItem[] = VARIANTS.map((variant) => ({ id: variant, variant, message: SAMPLE_MESSAGES[variant] }));

const VariantList = () => {
  const { toasts, dismiss } = useToastQueue(EVERY_VARIANT);
  if (toasts.length === 0) {
    return <Text className="story-label">All dismissed. Reload the story to bring them back.</Text>;
  }
  return (
    <Demonstrator
      rows={toasts.map((item) => ({ key: item.id, label: item.variant ?? item.id }))}
      align="stretch"
      cell={(id) => toasts.filter((item) => item.id === id).map((item) => <Toast key={item.id} item={item} onDismiss={dismiss} />)}
    />
  );
};

const ToastStack = () => {
  const { toasts, push, dismiss } = useToastQueue();
  return (
    <Box className="story-row">
      {VARIANTS.map((variant) => (
        <Button key={variant} variant="secondary" onClick={() => push({ variant, message: SAMPLE_MESSAGES[variant], duration: 5000 })}>
          {variant}
        </Button>
      ))}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </Box>
  );
};

const RetryDemo = () => {
  const { toasts, push, dismiss } = useToastQueue();
  const fail = () => push({
    variant: 'danger',
    message: 'Settings could not be saved.',
    action: { label: 'Retry', onSelect: () => push({ variant: 'success', message: 'Settings saved.', duration: 3000 }) },
  });
  return (
    <Box className="story-row">
      <Button variant="secondary" onClick={fail}>Save settings</Button>
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </Box>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ToastLauncher {...args} />,
} satisfies PlaygroundStory<ToastArgs>;

const Variants = {
  name: 'Variants',
  render: () => <VariantList />,
} satisfies StoryLiteStoryDefinition<ToastArgs>;

const Stacked = {
  name: 'Stacked in the container',
  render: () => <ToastStack />,
} satisfies StoryLiteStoryDefinition<ToastArgs>;

const WithAction = {
  name: 'With an action',
  render: () => <RetryDemo />,
} satisfies StoryLiteStoryDefinition<ToastArgs>;

const Overview = overviewStory({
  component: 'Toast',
  description: 'Short messages that pop up in a corner of the window and leave on their own, such as a save written.',
  points: [
    '`ToastContainer` draws the queue at the bottom right or the bottom left.',
    '`variant` sets the colour: `info`, `success`, `warning` or `danger`.',
    'A toast leaves after its `duration`, or stays when it is 0; it waits while the pointer or focus is on it.',
    '`action` adds a button, such as Retry, that runs `onSelect` and closes the toast, beside the close button.',
    'Screen readers announce each toast: the queue is a polite status region, and a `danger` toast is an alert.',
  ],
  instead: '[Callout] for a note that stays in the page.',
  playground: Playground,
  variants: [Variants, WithAction],
  code: `import { useState } from 'react';
import { Button, ToastContainer } from '@drizztdourden08/tessera';
import type { ToastItem } from '@drizztdourden08/tessera';

const [toasts, setToasts] = useState<ToastItem[]>([]);
const dismiss = (id: string) => setToasts((all) => all.filter((t) => t.id !== id));

<Button onClick={() => setToasts((all) => [...all, { id: 'saved', variant: 'success', message: 'Save state written to slot 3.', duration: 4000 }])}>
  Show toast
</Button>
<ToastContainer toasts={toasts} onDismiss={dismiss} position="bottom-right" />`,
});

export default meta;
export { Overview, Playground, Stacked, Variants, WithAction };
