/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { TourDemo } from './_samples/TourDemo';
import { TourMenuDemo } from './_samples/TourMenuDemo';
import { TourSpotDemo } from './_samples/TourSpotDemo';
import { TourWaitDemo } from './_samples/TourWaitDemo';
import './GuidedTour.stories.css';

type TourArgs = {
  mascot: 'auto' | 'rotp' | 'brock' | 'archipelia' | 'none';
};

const ARG_TYPES: PlaygroundArgTypes<TourArgs> = {
  mascot: {
    group: 'Content',
    control: 'select',
    options: ['auto', 'rotp', 'brock', 'archipelia', 'none'],
    description: 'Who presents the tour. auto takes the mascot of the nearest data-palette; none leaves the mascot out.',
  },
};

const meta = {
  title: 'Composites · Overlays/GuidedTour',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TourArgs>;

const Playground = {
  name: 'Playground',
  args: { mascot: 'rotp' },
  argTypes: ARG_TYPES,
  render: (args) => <TourDemo mascot={args.mascot === 'none' ? false : args.mascot} />,
} satisfies PlaygroundStory<TourArgs>;

const ClickStep = {
  name: 'Starts on the click step',
  args: { mascot: 'brock' },
  argTypes: ARG_TYPES,
  render: (args) => <TourDemo mascot={args.mascot === 'none' ? false : args.mascot} startAt={3} />,
} satisfies PlaygroundStory<TourArgs>;

const KeptTitle = {
  name: 'Keeps the title bar live',
  args: { mascot: 'archipelia' },
  argTypes: ARG_TYPES,
  render: (args) => <TourDemo mascot={args.mascot === 'none' ? false : args.mascot} startAt={1} keepTitle />,
} satisfies PlaygroundStory<TourArgs>;

const WaitStep = {
  name: 'Waits for the app',
  args: { mascot: 'brock' },
  argTypes: ARG_TYPES,
  render: (args) => <TourWaitDemo mascot={args.mascot === 'none' ? false : args.mascot} />,
} satisfies PlaygroundStory<TourArgs>;

const MenuClick = {
  name: 'Lights a menu, goes on from one entry',
  args: { mascot: 'rotp' },
  argTypes: ARG_TYPES,
  render: (args) => <TourMenuDemo mascot={args.mascot === 'none' ? false : args.mascot} />,
} satisfies PlaygroundStory<TourArgs>;

const SpotAlone = {
  name: 'TourSpot alone',
  args: { mascot: 'none' },
  argTypes: ARG_TYPES,
  render: () => <TourSpotDemo />,
} satisfies PlaygroundStory<TourArgs>;

const CODE = `import { GuidedTour, useGuidedTour } from '@drizztdourden08/tessera';
import type { TourStep } from '@drizztdourden08/tessera';

const steps: TourStep[] = [
  { id: 'welcome', title: 'Welcome', body: 'A short walk through the screen.', mascot: 'wave' },
  { id: 'nav', target: { tour: 'nav' }, placement: 'right-start', title: 'Pages', body: 'Every page lives here.' },
  { id: 'gear', target: { tour: 'gear' }, advance: 'click', title: 'Settings', body: 'Click the gear.' },
  { id: 'panel', target: { tour: 'settings' }, title: 'Settings', body: 'Changes apply at once.', onEnter: () => openSettings() },
  { id: 'save', target: { tour: 'form' }, advance: 'wait', hint: 'Save the form to go on.', title: 'Save', body: 'Name it, then save.' },
];

const Home = () => {
  const tour = useGuidedTour({ steps });
  const save = () => {
    saveForm();
    if (tour.current?.id === 'save') tour.next();
  };
  return (
    <>
      <Button onClick={() => tour.start()}>Start tour</Button>
      <SeedForm data-tour="form" onSave={save} />
      <GuidedTour tour={tour} mascot="auto" keep={[{ tour: 'title-bar' }]} />
    </>
  );
};`;

const Overview = overviewStory({
  component: 'GuidedTour',
  description: 'A tour of a screen, step by step: one part stays lit while the rest dims and blurs, and the mascot presents it.',
  points: [
    'Steps are data: a target, a title, a body, a mascot state, a placement and an advance.',
    '`onEnter` runs before its step shows, with a signal that aborts when the step is left; it may be async.',
    "`advance: 'click'` goes on from a click on the lit part, or on its `clickTarget` when one is set.",
    "`advance: 'wait'` hides Next until the app calls `tour.next()`; `hint` says what to do.",
    '`keep` leaves parts such as the title bar lit and usable; `TourSpot` draws the spotlight alone.',
    '`onStepShown` and `onStepLeave` follow each step; the keys of the tour go ahead of the keys of the app.',
  ],
  instead: '[ShortcutTour] to teach one shortcut on a drawn keyboard.',
  playground: Playground,
  variants: [ClickStep, KeptTitle, WaitStep, MenuClick, SpotAlone],
  code: CODE,
});

export default meta;
export { ClickStep, KeptTitle, MenuClick, Overview, Playground, SpotAlone, WaitStep };
