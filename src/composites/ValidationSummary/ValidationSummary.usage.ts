/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'What blocks a save, listed above the form in a toned box, each problem a link that moves focus to its field.',
  useWhen: [
    'A form or an editor cannot save or run until the user fixes one or more fields.',
    'The problems sit in fields the user may not see, such as rows of a long list or another section.',
  ],
  avoidWhen: [
    { case: 'One note with no list, such as a warning about the whole page.', use: 'Callout' },
    { case: 'Only one field is wrong and it is in view; its own error is enough.', use: 'Field' },
    { case: 'A step of a wizard reports what stops it going on.', use: 'WizardStep' },
  ],
  rules: [
    'Write each problem as what to fix, such as Enter the path of the key file, and give it the field it belongs to.',
    'Move focus to the field in onFocusField, and scroll it into view; the summary does not know the form.',
    'Keep tone danger for what blocks the save, and warning for options to check that do not.',
    'Show the summary once the user tries to save, or keep it in step with the form; leave it out when nothing is wrong.',
  ],
  a11y: [
    'The box is an alert, so a screen reader reads the title and the problems when it appears.',
    'The problems are a list; one with a field is a button named by its message, the arrow hidden.',
    'And N more shows the rest and moves focus to the first problem it revealed.',
  ],
  tree: {
    path: ['feedback', 'what blocks a save, with a jump to each field'],
    rule: 'ValidationSummary lists what blocks a save in one place and takes the user to each field, the same way in every editor.',
  },
  example: `import { ValidationSummary } from '@drizztdourden08/tessera';
import type { ValidationProblem } from '@drizztdourden08/tessera';

interface ServerProblemsProps {
  problems: ValidationProblem[];
  focusField: (field: string) => void;
}

const ServerProblems = ({ problems, focusField }: ServerProblemsProps) => (
  <ValidationSummary problems={problems} onFocusField={focusField} />
);
`,
  propsHash: '872391f6f422e9d2',
} satisfies ComponentUsage;

export { usage };
