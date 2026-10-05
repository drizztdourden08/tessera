/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The splash of the static page drawn from React, so the app can show it again, or take over from the static page with no jump.',
  useWhen: [
    'The app has loaded and has to wait again for the whole window, such as a lost engine it reconnects to or an update that restarts it.',
    'The app takes over from a static splash page and keeps showing the splash until its own start tasks finish.',
  ],
  avoidWhen: [
    { case: 'One part of the page failed and the rest still works.', use: 'ErrorBoundary' },
    { case: 'Work inside a page the user can still use.', use: 'ProgressBar' },
    { case: 'A long job the user can hide or cancel.', use: 'JobDialog' },
  ],
  rules: [
    'Before the bundle loads, write the same page in static HTML with splash.css; give both the same title, mark, status and version, so the hand-over shows no change.',
    'Keep status to one short line that says what runs now; put the error text of a failure in detail.',
    'Pass a BrandMark or Logo as mark and it takes its dark ground look by itself; an image URL points at brand/dark-ground/<app>.svg or a mark PNG beside it, and an app mark of its own keeps its edge at 3:1 on the gradient, every shape or an outline around them.',
    'It sits on the dark gradient of the palette; an app theme that changes the palette seeds sets --p-gradient-dark-from and --p-gradient-dark-to too, dark enough that the text stays at WCAG AA.',
    'Pass progress as a fraction from 0 to 1 when the steps are known, and indeterminate when they are not.',
    'Show actions only when the user has something to do, such as Retry and Report a bug after a failure; mark Retry primary.',
    'It covers the window; while it covers a mounted app, set inert on the app root so keys do not reach it.',
  ],
  a11y: [
    'The title is the h1 of the splash, and the status line is a polite live region, so each new step is read out.',
    'When failed turns on, the status line becomes an alert and focus moves to the first primary action.',
    'The bar is a progressbar named by progressLabel, Loading by default, with its value in percent.',
    'The mark is decoration and hidden from screen readers.',
  ],
  tree: {
    path: ['feedback', 'the app is starting, or starting again'],
    rule: 'Splash draws the classes of splash.css, so it looks the same as the static splash page.',
  },
  example: `import { Splash } from '@drizztdourden08/tessera';

const Reconnecting = ({ quit }: { quit: () => void }) => (
  <Splash
    title="Archipelia"
    mark="/logos/mark.svg"
    status="Reconnecting to the engine"
    progress="indeterminate"
    actions={[{ label: 'Quit', onSelect: quit }]}
    version="v0.4.2"
  />
);
`,
  propsHash: 'f4beb0c4420e86ee',
} satisfies ComponentUsage;

export { usage };
