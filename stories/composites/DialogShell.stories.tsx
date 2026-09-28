/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { DialogShell } from '../../src/composites';
import { Badge, Box, Button, Spinner, StatRow, Text } from '../../src/primitives';
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
        headerExtra={withHeaderExtra ? <Badge variant="success">Live</Badge> : undefined}
      >
        {waiting ? <Waiting /> : <SessionSummary />}
      </DialogShell>
    </Box>
  );
};

const ARGS: Partial<DialogShellArgs> = { title: 'Friday async', dismissable: true, withActions: true, withHeaderExtra: false };

const ARG_TYPES: StoryLiteArgTypes<DialogShellArgs> = {
    title: { control: 'text' },
    dismissable: { control: 'boolean' },
    withActions: { control: 'boolean' },
    withHeaderExtra: { control: 'boolean' },
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
} satisfies StoryLiteStoryDefinition<DialogShellArgs>;

const HeaderStatus = {
  name: 'Status in the header',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ShellDemo {...args} withHeaderExtra openLabel="Session details" />,
} satisfies StoryLiteStoryDefinition<DialogShellArgs>;

const NotDismissable = {
  name: 'Not dismissable',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <ShellDemo {...args} title="Creating room" dismissable={false} withActions waiting openLabel="Host session" />
  ),
} satisfies StoryLiteStoryDefinition<DialogShellArgs>;

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
  description: 'The modal chrome every dialog here is built on: a backdrop, a panel with a header and a close button, a body and a footer row of actions. Use it for a dialog whose body is your own, where Dialog\'s one question does not fit. It closes on Escape and a backdrop click, takes extra content in its header, and focuses a given element on open. Set it not dismissable while a write is in flight, and only its own actions can close it.',
  playground: Playground,
  variants: [HeaderStatus, NotDismissable],
  code: CODE,
});

export default meta;
export { HeaderStatus, NotDismissable, Overview, Playground };
