/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { DeleteGuardDialog } from '../../src/composites';
import { Box, Button } from '../../src/primitives';
import { Demonstrator } from '../_template/Demonstrator';
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

const ARG_TYPES: PlaygroundArgTypes<DeleteGuardArgs> = {
    subjectLabel: { group: 'Content', control: 'text' },
    error: { group: 'State', control: 'textarea' },
    showError: { group: 'State', control: 'boolean' },
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
} satisfies PlaygroundStory<DeleteGuardArgs>;

const RefusedDelete = {
  name: 'Delete refused',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <GuardDemo {...args} showError />,
} satisfies PlaygroundStory<DeleteGuardArgs>;

const VARIANTS = [
  { key: 'referenced', label: 'Still referenced' },
  { key: 'refused', label: 'Delete refused' },
] as const;

const AllVariants = {
  name: 'All variants',
  render: () => (
    <Demonstrator
      rows={VARIANTS}
      cell={(key) => (
        <GuardDemo subjectLabel={ARGS.subjectLabel ?? ''} error={key === 'refused' ? ARGS.error ?? '' : ''} showError={key === 'refused'} />
      )}
    />
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
