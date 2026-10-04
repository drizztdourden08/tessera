/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The results of a list of checks, such as a connection test or a diagnostics report, each with its state, what was found and an optional fix.',
  useWhen: [
    'A test runs several checks and the user needs to see which passed, which only advise and which failed.',
    'The checks run one after another, so some are still checking or wait on another.',
  ],
  avoidWhen: [
    { case: 'One long job with steps that run in order, with a bar and a log.', use: 'TaskProgress' },
    { case: 'One state shown alone, such as the state of a server.', use: 'Status' },
    { case: 'Labels and values read from a record, with no state.', use: 'FactsPanel' },
  ],
  rules: [
    'Name each check after what it tests, such as Game port, and write in detail what was found, such as port 38281 is in use.',
    'Keep warn for advice that does not stop the user, and fail for what must be fixed first.',
    'Give a failed check an action when the app can help fix it, such as Pick another port.',
    'Pass summary to say what the result means, such as Home NAS is not ready.',
  ],
  a11y: [
    'The list is a section named by label, Checks by default, and each check a list item.',
    'Each icon is named by its state word, and a check in progress is a Spinner named checking.',
    'The counts are a status region, so a screen reader hears them change as checks finish.',
  ],
  tree: {
    path: ['feedback', 'the results of a list of checks'],
    rule: 'CheckList gives pass, advice and failure their own icon and colour, so a test result reads the same in every app.',
  },
  example: `import { CheckList } from '@drizztdourden08/tessera';
import type { Check } from '@drizztdourden08/tessera';

interface ServerTestProps {
  server: string;
  checks: Check[];
}

const ServerTest = ({ server, checks }: ServerTestProps) => {
  const ready = checks.every((check) => check.state === 'pass' || check.state === 'warn');
  return <CheckList summary={ready ? \`\${server} is ready\` : \`\${server} is not ready\`} checks={checks} />;
};
`,
  propsHash: '8955be1997e6a09a',
} satisfies ComponentUsage;

export { usage };
