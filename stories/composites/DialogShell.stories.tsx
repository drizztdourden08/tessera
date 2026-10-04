/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { DialogShell } from '../../src/composites';
import { Box, Button, Spinner, StatRow, Status, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type DialogShellArgs = {
  title: string;
  dismissable: boolean;
  withActions: boolean;
  withHeaderExtra: boolean;
};

type ShellDemoProps = DialogShellArgs & { openLabel: string; waiting?: boolean };

const SessionSummary = () => (
  <Box className="story-column">
    <StatRow label="Host" value="mira" />
    <StatRow label="Server" value="eu-west-2" mono />
    <StatRow label="Preset" value="Casual" />
    <StatRow label="Players" value="8 of 8 connected" />
  </Box>
);

const Waiting = () => (
  <Box className="story-row">
    <Spinner />
    <Text>Waiting for eu-west-2 to accept the room. Closing now would leave the room half created.</Text>
  </Box>
);

const ShellDemo = (props: ShellDemoProps) => {
  const { title, dismissable, withActions, withHeaderExtra, openLabel, waiting = false } = props;
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const actions = withActions
    ? (
      <>
        <Button variant="tertiary" onClick={close}>{waiting ? 'Cancel hosting' : 'Close'}</Button>
        {!waiting && <Button onClick={close}>Join session</Button>}
      </>
    )
    : undefined;
  return (
    <Box className="story-row">
      <Button variant="secondary" onClick={() => setOpen(true)}>{openLabel}</Button>
      <DialogShell
        open={open}
        onClose={close}
        title={title}
        dismissable={dismissable}
        actions={actions}
        headerExtra={withHeaderExtra ? <Status tone="success">Live</Status> : undefined}
      >
        {waiting ? <Waiting /> : <SessionSummary />}
      </DialogShell>
    </Box>
  );
};

const ARGS: Partial<DialogShellArgs> = { title: 'Friday async', dismissable: true, withActions: true, withHeaderExtra: false };

const ARG_TYPES: PlaygroundArgTypes<DialogShellArgs> = {
    title: { group: 'Content', control: 'text' },
    withActions: { group: 'Content', control: 'boolean' },
    withHeaderExtra: { group: 'Content', control: 'boolean' },
    dismissable: { group: 'Behaviour', control: 'boolean' },
  };

const meta = {
  title: 'Composites · Dialogs/DialogShell',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<DialogShellArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ShellDemo {...args} openLabel="Open dialog" />,
} satisfies PlaygroundStory<DialogShellArgs>;

const HeaderStatus = {
  name: 'Status in the header',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ShellDemo {...args} withHeaderExtra openLabel="Session details" />,
} satisfies PlaygroundStory<DialogShellArgs>;

const NotDismissable = {
  name: 'Not dismissable',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <ShellDemo {...args} title="Creating room" dismissable={false} withActions waiting openLabel="Host session" />
  ),
} satisfies PlaygroundStory<DialogShellArgs>;

const CODE = `import { Button, DialogShell } from '@drizztdourden08/tessera';

<DialogShell
  open={open}
  onClose={() => setOpen(false)}
  title="Friday async"
  actions={<Button onClick={join}>Join session</Button>}
>
  <SessionSummary />
</DialogShell>`;

const Overview = overviewStory({
  component: 'DialogShell',
  description: 'The frame every modal is built in: a backdrop, a panel with a header and close button, a body and a row of actions.',
  points: [
    'Pass your own body as children and your buttons as `actions`.',
    'It closes on [[Esc]], on the close button and on a click on the backdrop.',
    'Focus moves in on open: `initialFocusRef`, else the first control of the body, or the panel itself.',
    '[[Tab]] and [[Shift+Tab]] stay inside, and on close focus returns to the control that opened it.',
    '`initialFocus="dialog"` starts on the panel; `headerExtra` adds content to the header.',
    '**Set `dismissable` to false while a save runs:** then only its own `actions` can close it.',
  ],
  instead: '[Dialog] for one question with confirm and cancel.',
  playground: Playground,
  variants: [HeaderStatus, NotDismissable],
  code: CODE,
});

export default meta;
export { HeaderStatus, NotDismissable, Overview, Playground };
