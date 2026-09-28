/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { DeleteGuardDialog } from '../../src/composites';
import { Box, Button, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { PRESET_HITS } from './_samples/dialogs';

type DeleteGuardArgs = {
  subjectLabel: string;
  error: string;
  showError: boolean;
};

const GuardDemo = (props: DeleteGuardArgs) => {
  const { subjectLabel, error, showError } = props;
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <Box className="story-row">
      <Button variant="danger" onClick={() => setOpen(true)}>Delete preset</Button>
      <DeleteGuardDialog
        open={open}
        subjectLabel={subjectLabel}
        hits={PRESET_HITS}
        error={showError ? error : undefined}
        onConfirm={close}
        onCancel={close}
      />
    </Box>
  );
};

const ARGS: Partial<DeleteGuardArgs> = {
    subjectLabel: 'The game preset Casual',
    error: 'The server refused the delete: Friday async is running with this preset.',
    showError: false,
  };

const ARG_TYPES: StoryLiteArgTypes<DeleteGuardArgs> = {
    subjectLabel: { control: 'text' },
    error: { control: 'textarea' },
    showError: { control: 'boolean' },
  };

const meta = {
  title: 'Composites · Dialogs/DeleteGuardDialog',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<DeleteGuardArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <GuardDemo {...args} />,
} satisfies StoryLiteStoryDefinition<DeleteGuardArgs>;

const RefusedDelete = {
  name: 'Delete refused',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <GuardDemo {...args} showError />,
} satisfies StoryLiteStoryDefinition<DeleteGuardArgs>;

const AllVariants = {
  name: 'All variants',
  render: () => (
    <Box className="story-row">
      <Box className="story-column">
        <Text className="story-label">Still referenced</Text>
        <GuardDemo subjectLabel={ARGS.subjectLabel ?? ''} error="" showError={false} />
      </Box>
      <Box className="story-column">
        <Text className="story-label">Delete refused</Text>
        <GuardDemo subjectLabel={ARGS.subjectLabel ?? ''} error={ARGS.error ?? ''} showError />
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<DeleteGuardArgs>;

const CODE = `import { DeleteGuardDialog } from '@drizztdourden08/tessera';

<DeleteGuardDialog
  open={hits.length > 0}
  subjectLabel="The game preset Casual"
  hits={hits}
  error={deleteError}
  onConfirm={() => deletePreset('casual')}
  onCancel={() => setHits([])}
/>`;

const Overview = overviewStory({
  component: 'DeleteGuardDialog',
  description: 'A danger dialog that stands between a delete and a record other records still point at. Open it when a delete finds references; with none, delete at once and skip the dialog. It lists what points at the record, grouped, with Delete anyway and Cancel. When a confirmed delete comes back refused, the error takes the place of the list.',
  playground: Playground,
  variants: [AllVariants],
  code: CODE,
});

export default meta;
export { AllVariants, Overview, Playground, RefusedDelete };
