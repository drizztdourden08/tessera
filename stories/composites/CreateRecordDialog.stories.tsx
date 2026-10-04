/* @layer stories @kind story */
import { useCallback, useState } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { CreateRecordDialog } from '../../src/composites';
import type { CreateOutcome } from '../../src/composites';
import { Box, Button, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { INITIAL_SESSION, REQUIRED_PATHS, SESSION_CONFIG, SESSION_SCHEMA } from './_samples/dialogs';

type CreateArgs = {
  title: string;
  grouped: boolean;
  rejectCreate: boolean;
  rejection: string;
  delayMs: number;
};

const wait = (ms: number) => new Promise<void>((resolve) => { setTimeout(resolve, ms); });

const CreateDemo = (props: CreateArgs) => {
  const { title, grouped, rejectCreate, rejection, delayMs } = props;
  const [open, setOpen] = useState(false);
  const [created, setCreated] = useState<string | null>(null);

  const handleCreate = useCallback(async (): Promise<CreateOutcome> => {
    await wait(delayMs);
    if (rejectCreate) return { success: false, error: rejection };
    return { success: true, id: 'ses-0421' };
  }, [delayMs, rejectCreate, rejection]);

  const handleCreated = useCallback((id: string) => {
    setCreated(id);
    setOpen(false);
  }, []);

  return (
    <Box className="story-row">
      <Button onClick={() => setOpen(true)}>New session</Button>
      {created && <Text className="story-label">Created {created}</Text>}
      <CreateRecordDialog
        open={open}
        title={title}
        schema={SESSION_SCHEMA}
        config={grouped ? SESSION_CONFIG : undefined}
        initialRecord={INITIAL_SESSION}
        requiredPaths={REQUIRED_PATHS}
        onCreate={handleCreate}
        onCreated={handleCreated}
        onCancel={() => setOpen(false)}
      />
    </Box>
  );
};

const ARGS: Partial<CreateArgs> = {
    title: 'New session',
    grouped: false,
    rejectCreate: false,
    rejection: 'A session named this way already exists on eu-west-2.',
    delayMs: 600,
  };

const ARG_TYPES: PlaygroundArgTypes<CreateArgs> = {
    title: { group: 'Content', control: 'text' },
    grouped: { group: 'Layout', control: 'boolean' },
    rejectCreate: { group: 'Behaviour', control: 'boolean' },
    rejection: { group: 'Behaviour', control: 'textarea' },
    delayMs: { group: 'Behaviour', control: 'number' },
  };

const meta = {
  title: 'Composites · Dialogs/CreateRecordDialog',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CreateArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <CreateDemo {...args} />,
} satisfies PlaygroundStory<CreateArgs>;

const GroupedFields = {
  name: 'Grouped fields',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <CreateDemo {...args} grouped />,
} satisfies PlaygroundStory<CreateArgs>;

const Rejected = {
  name: 'Create rejected',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <CreateDemo {...args} grouped rejectCreate />,
} satisfies PlaygroundStory<CreateArgs>;

const CODE = `import { CreateRecordDialog } from '@drizztdourden08/tessera';

<CreateRecordDialog
  open={open}
  title="New session"
  schema={SESSION_SCHEMA}
  initialRecord={INITIAL_SESSION}
  requiredPaths={['name', 'preset', 'maxPlayers']}
  onCreate={(record) => api.createSession(record)}
  onCreated={(id) => { setOpen(false); select(id); }}
  onCancel={() => setOpen(false)}
/>`;

const Overview = overviewStory({
  component: 'CreateRecordDialog',
  description: 'A dialog where the user fills in a new record, with the same fields as [RecordEditor].',
  points: [
    'Give it a `schema`, an `initialRecord` and the `requiredPaths` that must hold a value.',
    'Focus starts in the first field; Create stays locked until every required field is filled.',
    '`onCreate` saves the record while a [Spinner] takes the place of Create.',
    'A refused save shows its error in the dialog; a saved one calls `onCreated` with the new id.',
  ],
  playground: Playground,
  variants: [GroupedFields, Rejected],
  code: CODE,
});

export default meta;
export { GroupedFields, Overview, Playground, Rejected };
