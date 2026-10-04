/* @layer stories @kind story */
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Dialog } from '../../src/composites';
import { Box, Button, Field, TextInput } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type DialogArgs = {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  variant: 'default' | 'danger';
  confirmDisabled: boolean;
  hideCancel: boolean;
};

type DialogDemoProps = DialogArgs & { openLabel: string; children?: ReactNode };

const DialogDemo = (props: DialogDemoProps) => {
  const { openLabel, children, ...dialog } = props;
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <Box className="story-row">
      <Button variant={dialog.variant === 'danger' ? 'danger' : 'secondary'} onClick={() => setOpen(true)}>{openLabel}</Button>
      <Dialog {...dialog} open={open} onConfirm={close} onCancel={close}>{children}</Dialog>
    </Box>
  );
};

const RenameBody = () => {
  const [name, setName] = useState('Friday async');
  return (
    <Field label="Session name" hint="Players see this name in their session list.">
      <TextInput value={name} onChange={(e) => setName(e.target.value)} />
    </Field>
  );
};

const ARGS: Partial<DialogArgs> = {
    title: 'Start the session?',
    message: 'Eight players are connected. Starting locks the player list and sends every game its seed.',
    confirmLabel: 'Start session',
    cancelLabel: 'Not yet',
    variant: 'default',
    confirmDisabled: false,
    hideCancel: false,
  };

const ARG_TYPES: PlaygroundArgTypes<DialogArgs> = {
    title: { group: 'Content', control: 'text' },
    message: { group: 'Content', control: 'textarea' },
    confirmLabel: { group: 'Content', control: 'text' },
    cancelLabel: { group: 'Content', control: 'text' },
    hideCancel: { group: 'Content', control: 'boolean' },
    variant: { group: 'Appearance', control: 'select', options: ['default', 'danger'] },
    confirmDisabled: { group: 'State', control: 'boolean' },
  };

const meta = {
  title: 'Composites · Dialogs/Dialog',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<DialogArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <DialogDemo {...args} openLabel="Open dialog" />,
} satisfies PlaygroundStory<DialogArgs>;

const DangerConfirm = {
  name: 'Danger confirm',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <DialogDemo
      {...args}
      openLabel="End session"
      variant="danger"
      title="End Friday async?"
      message="All eight players are disconnected and the item log is archived. This cannot be undone."
      confirmLabel="End session"
      cancelLabel="Keep running"
    />
  ),
} satisfies PlaygroundStory<DialogArgs>;

const Acknowledge = {
  name: 'Acknowledge only',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <DialogDemo
      {...args}
      openLabel="Show notice"
      hideCancel
      title="Server restarted"
      message="eu-west-2 restarted for maintenance. Every player reconnected and no items were lost."
      confirmLabel="Got it"
    />
  ),
} satisfies PlaygroundStory<DialogArgs>;

const WithBody = {
  name: 'With form body',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <DialogDemo
      {...args}
      openLabel="Rename session"
      title="Rename session"
      message="The new name shows up for every connected player."
      confirmLabel="Rename"
    >
      <RenameBody />
    </DialogDemo>
  ),
} satisfies PlaygroundStory<DialogArgs>;

const CODE = `import { Dialog } from '@drizztdourden08/tessera';

<Dialog
  open={open}
  title="Start the session?"
  message="Eight players are connected. Starting locks the player list."
  confirmLabel="Start session"
  cancelLabel="Not yet"
  onConfirm={startSession}
  onCancel={() => setOpen(false)}
/>`;

const Overview = overviewStory({
  component: 'Dialog',
  description: 'A modal that asks one question, with a message, a confirm button and a cancel button.',
  points: [
    'Use it to confirm an action, to acknowledge a notice, or to hold a short form in its body.',
    '`variant="danger"` turns confirm red, for an action that cannot be undone.',
    '`confirmDisabled` holds confirm until the body is valid; `hideCancel` leaves confirm alone.',
    'Focus starts on confirm, and [[Esc]] cancels.',
  ],
  instead: '[DialogShell] for a dialog whose body and buttons are your own.',
  playground: Playground,
  variants: [DangerConfirm, Acknowledge, WithBody],
  code: CODE,
});

export default meta;
export { Acknowledge, DangerConfirm, Overview, Playground, WithBody };
