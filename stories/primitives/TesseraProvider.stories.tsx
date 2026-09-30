/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, SegmentedControl, TesseraProvider } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { ProviderShowcase } from './_samples/provider-showcase';
import { APP_OVERRIDES, SPINNER_CHOICES, SPINNER_OPTIONS } from './_samples/provider-spinners.constants';
import type { SpinnerChoice } from './_samples/provider-spinners.constants';

type ProviderArgs = {
  spinner: SpinnerChoice;
};

const ARGS: Partial<ProviderArgs> = { spinner: 'mosaic' };

const ARG_TYPES: StoryLiteArgTypes<ProviderArgs> = {
  spinner: { control: 'select', options: [...SPINNER_CHOICES], description: 'The spinner the app hands to TesseraProvider.' },
};

const meta = {
  title: 'Primitives · Setup/TesseraProvider',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ProviderArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <TesseraProvider overrides={APP_OVERRIDES[args.spinner]}>
      <ProviderShowcase />
    </TesseraProvider>
  ),
} satisfies StoryLiteStoryDefinition<ProviderArgs>;

const SpinnerSwap = () => {
  const [choice, setChoice] = useState<SpinnerChoice>('mosaic');
  return (
    <Box className="story-column">
      <SegmentedControl label="App spinner" value={choice} options={SPINNER_OPTIONS} onChange={setChoice} />
      <TesseraProvider overrides={APP_OVERRIDES[choice]}>
        <ProviderShowcase />
      </TesseraProvider>
    </Box>
  );
};

const AppSpinner = {
  name: 'A custom spinner, app wide',
  render: () => <SpinnerSwap />,
} satisfies StoryLiteStoryDefinition<ProviderArgs>;

const CODE = `import { TesseraProvider } from '@drizztdourden08/tessera';
import type { SpinnerProps, TesseraOverrides } from '@drizztdourden08/tessera';

const AppSpinner = ({ size, label, className }: SpinnerProps) => (
  <span className={className} data-size={size} role="status" aria-label={label}>...</span>
);

const OVERRIDES: TesseraOverrides = { spinner: AppSpinner };

createRoot(root).render(
  <TesseraProvider overrides={OVERRIDES}>
    <App />
  </TesseraProvider>,
);`;

const Overview = overviewStory({
  component: 'TesseraProvider',
  description: 'Swaps parts of Tessera for the app\'s own, once, at the root. Every Spinner rendered below it draws the app spinner, including the ones inside Button, IconButton, Select, Combobox and Video, and the ones in dialogs and popups rendered through a portal, since a portal keeps the React tree. The app spinner takes size, label and className, and carries the status role and the label itself. Keep the overrides object stable, as a module constant, so the tree does not redraw. A provider inside another one keeps the outer parts and replaces the ones it names; naming a part as undefined gives back the Tessera part for that subtree. A separate React root, such as one mounted inside an iframe, needs its own provider. It reads nothing from window or document, so it renders on the server.',
  playground: Playground,
  variants: [AppSpinner],
  code: CODE,
});

export default meta;
export { AppSpinner, Overview, Playground };
