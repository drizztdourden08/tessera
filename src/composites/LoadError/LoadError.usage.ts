/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'What to show when something fails to load: one plain sentence, a Retry button and the raw error behind Details.',
  useWhen: [
    'A list, a screen or a section could not load its data, such as the server list or the sessions page.',
    'A choice could not load its options, such as the sound devices in a settings row.',
  ],
  avoidWhen: [
    { case: 'The load worked and there is nothing to show.', use: 'EmptyState' },
    { case: 'A long job with steps and a log failed.', use: 'TaskProgress' },
    { case: 'A part threw while it rendered.', use: 'ErrorBoundary' },
  ],
  rules: [
    'Write message as one plain sentence that says what failed, such as Could not load your servers; never the raw error.',
    'Pass the raw failure as error, an Error, a string or an object: it waits behind Details, closed, so the user can copy it into a report.',
    'Pass onRetry when the load can run again, and set retrying while it runs so the button spins and takes no second click.',
    'Use variant center to fill a list pane or a screen, box inside a section, and inline in a row.',
    'ItemList, ErrorBoundary and SettingsRow draw it from their own props; reach for it directly in other places.',
  ],
  a11y: [
    'The sentence is an alert, so a screen reader reads it once when the load fails.',
    'Details is the browser details element, and the raw text scrolls by keyboard once it takes focus.',
  ],
  tree: {
    path: ['feedback', 'something failed to load, with Retry'],
    rule: 'LoadError draws every failed load the same way: a sentence, Retry and the raw error behind Details.',
  },
  example: `import { LoadError } from '@drizztdourden08/tessera';

interface SessionsFailedProps {
  error: unknown;
  reloading: boolean;
  reload: () => void;
}

const SessionsFailed = ({ error, reloading, reload }: SessionsFailedProps) => (
  <LoadError message="Could not load your sessions." error={error} onRetry={reload} retrying={reloading} />
);
`,
  propsHash: 'f12b78f2cc1a1df8',
} satisfies ComponentUsage;

export { usage };
