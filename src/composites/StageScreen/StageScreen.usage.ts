/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../ai/usage.type';

const usage = {
  job: 'One big open stage for custom work with no navigation of its own, with an optional toolbar row and a Done button.',
  useWhen: [
    'Controller calibration, HUD layout, a map or an editor the app draws itself.',
    'The content is one surface, not pages or sections.',
  ],
  avoidWhen: [
    { case: 'The screen has pages the user moves between.', use: 'WorkspaceScreen' },
    { case: 'The screen is read, such as About or credits.', use: 'InfoScreen' },
    { case: 'The app runs one short task and reports a status.', use: 'UtilityScreen' },
  ],
  rules: [
    'Keep the toolbar to a status and a few tools; it is not a place for navigation.',
    'Set done when the work ends with a clear finish; the close button still closes without it.',
    'Put each calibration step on the stage in its own Card, with a SectionHeader that says what to do.',
    'The stage scrolls when its content is larger; a canvas that pans itself sets its own size to fill the stage.',
  ],
  a11y: [
    'The card is a modal dialog named by the title.',
    'Custom content on the stage brings its own roles and keyboard support.',
  ],
  tree: {
    path: ['a full screen view', 'one big custom surface, such as calibration'],
    rule: 'One open stage with an optional toolbar.',
  },
  example: `import { StageScreen, Status } from '@drizztdourden08/tessera';

const Calibration = ({ onClose }: { onClose: () => void }) => (
  <StageScreen
    title="Input calibration"
    onClose={onClose}
    toolbar={<Status tone="success" variant="pill">Controller connected</Status>}
    done={{ onClick: onClose }}
  >
    Calibration steps
  </StageScreen>
);
`,
  propsHash: 'f21b5c1f9815620e',
} satisfies ComponentUsage;

export { usage };
