/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Tries a failed step again, such as a lost connection or a failed fetch, and counts down to the next automatic try.',
  useWhen: [
    'A connection closed or failed and the user can start it again.',
    'The app tries again by itself after a wait and the user should see how long, or skip the wait.',
  ],
  avoidWhen: [
    { case: 'The action is not a second try of something that failed.', use: 'Button' },
    { case: 'The failure belongs to a long job with steps and a log.', use: 'TaskProgress' },
  ],
  rules: [
    'Keep the timer in the app: pass retryAt, the time of the next automatic try, and start that try from the app, never from the button.',
    'Pass attempt and attempts only when the app stops after a fixed number of tries.',
    'Set retrying while a try runs, so the button shows a spinner and takes no second click.',
    'Put it at the end of the row that says what failed, with the reason in the text before it.',
  ],
  a11y: [
    'The button is named Retry, or Retry now while a countdown runs.',
    'The countdown line describes the button, so it is read on focus and not every second.',
  ],
  tree: {
    path: ['actions', 'one action', 'tries a failed step again'],
    rule: 'RetryButton says how long until the next automatic try and lets the user skip the wait, with one look for every retry.',
  },
  example: `import { RetryButton } from '@drizztdourden08/tessera';

const Reconnect = ({ nextTry, onRetry }: { nextTry: number | null; onRetry: () => void }) => (
  <RetryButton onRetry={onRetry} retryAt={nextTry} attempt={2} attempts={5} />
);
`,
  propsHash: 'c9ef07d747804ddb',
} satisfies ComponentUsage;

export { usage };
