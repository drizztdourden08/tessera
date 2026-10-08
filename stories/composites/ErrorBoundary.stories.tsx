/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Button } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { BreakDemo, ProviderFallbackDemo, ResetKeyDemo, SameMarkupDemo } from './_samples/error-boundary-demos';
import './ErrorBoundary.stories.css';

type BoundaryArgs = {
  label: string;
  errorMessage: string;
  withRetry: boolean;
  withAction: boolean;
};

const ERROR_MESSAGE = 'The order summary received a total that is not a number.';

const ARGS: Partial<BoundaryArgs> = {
  label: 'The order summary could not be shown',
  errorMessage: ERROR_MESSAGE,
  withRetry: true,
  withAction: false,
};

const ARG_TYPES: PlaygroundArgTypes<BoundaryArgs> = {
  label: { group: 'Content', control: 'text', description: 'The headline of the notice. Empty uses the sectionFailed string.' },
  errorMessage: { group: 'Content', control: 'text', description: 'What the section throws when you press Break this section.' },
  withRetry: { group: 'Behaviour', control: 'boolean', description: 'Passes onRetry: Retry renders the section again.' },
  withAction: { group: 'Content', control: 'boolean', description: 'Adds a button under the notice.' },
};

const meta = {
  title: 'Composites · Feedback/ErrorBoundary',
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
      retry={args.withRetry}
      action={args.withAction ? <Button size="sm" variant="secondary">Contact support</Button> : undefined}
    />
  ),
} satisfies PlaygroundStory<BoundaryArgs>;

const Healthy = {
  name: 'Healthy: no markup of its own',
  render: () => <SameMarkupDemo />,
} satisfies StoryLiteStoryDefinition<BoundaryArgs>;

const DefaultNotice = {
  name: 'Throws: the default notice, with Retry',
  render: () => <BreakDemo errorMessage={ERROR_MESSAGE} retry />,
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

<ErrorBoundary label="The order summary could not be shown" resetKey={orderId} onRetry={clearOrderCache}>
  <OrderSummary />
</ErrorBoundary>

<TesseraProvider overrides={{ errorFallback: RetryNotice }}>
  <App />
</TesseraProvider>`;

const Overview = overviewStory({
  component: 'ErrorBoundary',
  description: 'Catches an error thrown while its children render, so one broken section never takes the page down.',
  points: [
    'Wrap a section that reads data it does not control.',
    'It draws nothing of its own while the children are healthy.',
    'When a child throws, a [LoadError] box takes its place: the `label`, and the error behind Details.',
    '`onRetry` adds Retry, which calls it and then renders the children again.',
    'A changed `resetKey` drops the error too; `action` adds a node under the notice.',
    'An app replaces the notice everywhere through the `errorFallback` of [TesseraProvider].',
  ],
  playground: Playground,
  variants: [Healthy, DefaultNotice, ProviderFallback, Recoverable],
  code: CODE,
});

export default meta;
export { ProviderFallback, DefaultNotice, Healthy, Overview, Playground, Recoverable };
