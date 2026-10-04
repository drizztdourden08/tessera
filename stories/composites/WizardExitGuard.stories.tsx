/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { useWizardExit, WizardExitGuard } from '../../src/composites';
import { Box, Button, Checkbox, Field, Span, TextInput } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type GuardArgs = {
  blocked: boolean;
  title: string;
  message: string;
  discardLabel: string;
  stayLabel: string;
};

const ARGS: Partial<GuardArgs> = {
  blocked: false,
  title: 'Discard this profile?',
  message: 'The name, mode and seed you picked are not saved yet. Leaving now throws them away.',
  discardLabel: 'Discard',
  stayLabel: 'Keep editing',
};

const ARG_TYPES: PlaygroundArgTypes<GuardArgs> = {
  title: { group: 'Content', control: 'text' },
  message: { group: 'Content', control: 'textarea' },
  discardLabel: { group: 'Content', control: 'text' },
  stayLabel: { group: 'Content', control: 'text' },
  blocked: { group: 'State', control: 'boolean', description: 'Something runs, so leaving waits.' },
};

const meta = {
  title: 'Composites · Wizard/WizardExitGuard',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<GuardArgs>;

const GuardDemo = (props: GuardArgs) => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <Box className="story-row">
      <Button variant="secondary" onClick={() => setOpen(true)}>Cancel</Button>
      <WizardExitGuard {...props} open={open} onDiscard={close} onStay={close} />
    </Box>
  );
};

const WithHook = () => {
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [left, setLeft] = useState(0);
  const exit = useWizardExit({ dirty: name !== '', busy, onExit: () => { setName(''); setLeft(left + 1); } });
  return (
    <Box className="story-column">
      <Field label="Profile name" hint="Type something, then leave."><TextInput value={name} placeholder="My Profile" onChange={(e) => setName(e.target.value)} /></Field>
      <Checkbox checked={busy} onChange={setBusy} label="A seed is being generated" />
      <Box className="story-inline">
        <Button variant="secondary" onClick={exit.requestExit}>Back to profiles</Button>
        <Span tone="muted">{`Left the wizard ${left} times.`}</Span>
      </Box>
      <WizardExitGuard {...exit.guard} />
    </Box>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <GuardDemo {...args} />,
} satisfies PlaygroundStory<GuardArgs>;

const Blocked = {
  name: 'While something runs',
  render: () => <GuardDemo {...(ARGS as GuardArgs)} blocked />,
} satisfies StoryLiteStoryDefinition<GuardArgs>;

const Hooked = {
  name: 'With useWizardExit',
  render: () => <WithHook />,
} satisfies StoryLiteStoryDefinition<GuardArgs>;

const CODE = `import { useWizardExit, WizardExitGuard } from '@drizztdourden08/tessera';

const exit = useWizardExit({ dirty: wizard.dirty, busy: wizard.busy, onExit: closeWizard });

<Button onClick={exit.requestExit}>Back to profiles</Button>
<WizardExitGuard {...exit.guard} />`;

const Overview = overviewStory({
  component: 'WizardExitGuard',
  description: 'Asks before a wizard is left with unsaved input: a danger Dialog with Discard and Keep editing. While something runs, such as a seed being generated, it does not offer to leave at all and asks the user to wait. useWizardExit decides: it leaves at once when nothing is entered, asks when something is, and waits while busy. Wizard wires both to its Cancel; a screen that can be left another way, such as a tab or a menu, calls requestExit itself.',
  playground: Playground,
  variants: [Blocked, Hooked],
  code: CODE,
});

export default meta;
export { Blocked, Hooked, Overview, Playground };
