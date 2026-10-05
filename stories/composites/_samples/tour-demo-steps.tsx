/* @layer stories @kind data */
import type { TourStep } from '../../../src/composites';
import type { TourDemoParts } from './TourDemo.type';

const settle = (ms: number): Promise<void> => new Promise((resolve) => { setTimeout(resolve, ms); });

const windowStep = (parts: TourDemoParts): TourStep[] => [{
  id: 'window',
  target: parts.titlebar,
  placement: 'bottom-center',
  title: 'The window stays yours',
  body: 'The title bar stays live through the whole tour: pin the window or close it at any time.',
  mascot: { walk: 'move-wobble', arrive: 'happy' },
}];

const tourDemoSteps = (parts: TourDemoParts, keepTitle: boolean): TourStep[] => [
  {
    id: 'welcome',
    title: 'Welcome to Relay',
    body: 'A short walk through the screen. Use the arrow keys or the buttons, and Escape to leave at any time.',
    mascot: 'wave',
  },
  ...(keepTitle ? windowStep(parts) : []),
  {
    id: 'nav',
    target: parts.nav,
    placement: 'right-start',
    title: 'Every page lives here',
    body: 'The side list holds the pages of the app. The current one is lit.',
    mascot: 'point',
  },
  {
    id: 'cards',
    target: parts.cards,
    title: 'Your week at a glance',
    body: 'Each card sums up one part of your games: time played, seeds and friends online.',
    mascot: 'happy',
    onEnter: () => parts.setSettings(false),
  },
  {
    id: 'gear',
    target: parts.gear,
    placement: 'bottom-end',
    advance: 'click',
    title: 'Open the settings',
    body: 'Click the gear to open the settings panel. The tour goes on once it is open.',
    mascot: 'curious',
    onEnter: () => parts.setSettings(false),
  },
  {
    id: 'settings',
    target: parts.settings,
    placement: 'bottom-end',
    title: 'Settings open beside the page',
    body: 'Changes apply at once. The tour opened this panel itself when you came back to this step.',
    mascot: 'idea',
    onEnter: async () => {
      parts.setSettings(true);
      await settle(120);
    },
  },
  {
    id: 'again',
    target: parts.restart,
    placement: 'bottom-end',
    title: 'Take the tour again',
    body: 'This button starts the tour from the top whenever you want.',
    mascot: 'success',
    onEnter: () => parts.setSettings(false),
  },
];

export { tourDemoSteps };
