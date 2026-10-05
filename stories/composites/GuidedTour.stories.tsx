/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { TourDemo } from './_samples/TourDemo';
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

const CODE = `import { GuidedTour, useGuidedTour } from '@drizztdourden08/tessera';
import type { TourStep } from '@drizztdourden08/tessera';

const steps: TourStep[] = [
  { id: 'welcome', title: 'Welcome', body: 'A short walk through the screen.', mascot: 'wave' },
  { id: 'nav', target: { tour: 'nav' }, placement: 'right-start', title: 'Pages', body: 'Every page lives here.' },
  { id: 'gear', target: { tour: 'gear' }, advance: 'click', title: 'Settings', body: 'Click the gear.' },
  { id: 'panel', target: { tour: 'settings' }, title: 'Settings', body: 'Changes apply at once.', onEnter: () => openSettings() },
];

const Home = () => {
  const tour = useGuidedTour({ steps });
  return (
    <>
      <Button onClick={() => tour.start()}>Start tour</Button>
      <GuidedTour tour={tour} mascot="auto" />
    </>
  );
};`;

const Overview = overviewStory({
  component: 'GuidedTour',
  description: 'A tour of a screen, step by step: one part stays lit while the rest dims and blurs, and the mascot presents it.',
  points: [
    'Steps are data: a target, a title, a body, a mascot state, a placement and an advance.',
    'A target is `{ tour }` for a data-tour name, `{ selector }` or a ref. Without one the step sits in the middle.',
    '`onEnter` runs before its step shows, so the app can open a panel or switch a tab; it may be async.',
    "`advance: 'click'` waits for a click on the lit part; the rest of the page stays inert.",
    'Right or Enter goes on, Left goes back, Escape closes; `tour.shortcuts` lists them for a ShortcutList.',
    '`useGuidedTour` holds the step; pass `step` and `open` with their handlers to keep them in the app.',
  ],
  instead: '[ShortcutTour] to teach one shortcut on a drawn keyboard.',
  playground: Playground,
  variants: [ClickStep],
  code: CODE,
});

export default meta;
export { ClickStep, Overview, Playground };
