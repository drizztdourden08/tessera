/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Button } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { BreakDemo, ProviderFallbackDemo, ResetKeyDemo, SameMarkupDemo } from './_samples/error-boundary-demos';
import './ErrorBoundary.stories.css';

type BoundaryArgs = {
  label: string;
  errorMessage: string;
  withAction: boolean;
};

const ERROR_MESSAGE = 'The order summary received a total that is not a number.';

const ARGS: Partial<BoundaryArgs> = {
  label: 'The order summary could not be shown',
  errorMessage: ERROR_MESSAGE,
  withAction: false,
};

const ARG_TYPES: StoryLiteArgTypes<BoundaryArgs> = {
  label: { control: 'text', description: 'The headline of the notice. Empty uses the sectionFailed string.' },
  errorMessage: { control: 'text', description: 'What the section throws when you press Break this section.' },
  withAction: { control: 'boolean', description: 'Adds a button under the notice.' },
};

const meta = {
  title: 'Primitives · Feedback/ErrorBoundary',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<BoundaryArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <BreakDemo
      errorMessage={args.errorMessage}
      label={args.label || undefined}
      action={args.withAction ? <Button size="sm" variant="secondary">Contact support</Button> : undefined}
    />
  ),
} satisfies StoryLiteStoryDefinition<BoundaryArgs>;

const Healthy = {
  name: 'Healthy: no markup of its own',
  render: () => <SameMarkupDemo />,
} satisfies StoryLiteStoryDefinition<BoundaryArgs>;

const DefaultNotice = {
  name: 'Throws: the default notice',
  render: () => <BreakDemo errorMessage={ERROR_MESSAGE} />,
} satisfies StoryLiteStoryDefinition<BoundaryArgs>;

const ProviderFallback = {
  name: 'Throws: a notice from errorFallback',
  render: () => <ProviderFallbackDemo errorMessage={ERROR_MESSAGE} />,
} satisfies StoryLiteStoryDefinition<BoundaryArgs>;

const Recoverable = {
  name: 'Recover with resetKey',
  render: () => <ResetKeyDemo errorMessage={ERROR_MESSAGE} />,
} satisfies StoryLiteStoryDefinition<BoundaryArgs>;

const CODE = `import { ErrorBoundary, TesseraProvider } from '@drizztdourden08/tessera';

<ErrorBoundary label="The order summary could not be shown" resetKey={orderId}>
  <OrderSummary />
</ErrorBoundary>

<TesseraProvider overrides={{ errorFallback: RetryNotice }}>
  <App />
</TesseraProvider>`;

const Overview = overviewStory({
  component: 'ErrorBoundary',
  description: 'A behaviour with a default notice, not a styled container: it catches an error thrown while its children render and draws nothing of its own while they are healthy. Wrap a section that reads data it does not control, so one broken section never takes the page down. When a child throws, a small danger notice takes its place, with a headline, the error message and an optional action. An app replaces that notice everywhere through the errorFallback of TesseraProvider, and a changed resetKey drops the error and renders the children again.',
  playground: Playground,
  variants: [Healthy, DefaultNotice, ProviderFallback, Recoverable],
  code: CODE,
});

export default meta;
export { ProviderFallback, DefaultNotice, Healthy, Overview, Playground, Recoverable };
