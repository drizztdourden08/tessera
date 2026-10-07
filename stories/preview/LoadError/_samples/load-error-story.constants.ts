/* @layer stories @kind data */
import type { PlaygroundArgTypes } from '../../../_template/controls/playground.type';
import type { LoadErrorVariant } from '../LoadError.type';
import type { LoadErrorArgs, LoadErrorChoice, LoadErrorPlace } from './load-error-story.type';

const VARIANTS: readonly LoadErrorVariant[] = ['center', 'box', 'inline'];

const LOAD_ERROR_ARGS: Partial<LoadErrorArgs> = { variant: 'center', message: 'Could not load your sessions.', raw: 'short', retry: true, retrying: false };

const LOAD_ERROR_ARG_TYPES: PlaygroundArgTypes<LoadErrorArgs> = {
  variant: { group: 'Appearance', control: 'select', options: [...VARIANTS], description: 'Center fills a pane or screen, box sits in a section, inline sits in a row.' },
  message: { group: 'Content', control: 'text', description: 'The one plain sentence the user reads.' },
  raw: { group: 'Content', control: 'select', options: ['short', 'long', 'none'], description: 'The raw error behind Details; none hides Details.' },
  retry: { group: 'Behaviour', control: 'boolean', description: 'Passes onRetry, which shows the Retry button.' },
  retrying: { group: 'State', control: 'boolean', description: 'A try is running: Retry spins and takes no second click.' },
};

const LOAD_ERROR_CHOICES: readonly LoadErrorChoice[] = [
  {
    name: 'A. Disclosure and LoadError, two new parts',
    chosen: true,
    why: 'Disclosure is the Show more toggle on its own, so TaskProgress (Show log) and RecordEditor (Referenced by) can drop their hand-built copies. LoadError draws every failed load the same way: a sentence, Retry and Details.',
  },
  {
    name: 'B. LoadError only, Details built into it',
    why: 'One new part instead of two, but the toggle stays copied in TaskProgress and RecordEditor, and the next part that needs Show more builds a fourth copy.',
  },
  {
    name: 'C. No new part: Callout gains a details prop',
    why: 'Each app puts a RetryButton in the Callout action itself. Smallest change, but ItemList, ErrorBoundary and TaskProgress keep three different looks, and nothing fills a pane or sits in a row.',
  },
];

const LOAD_ERROR_PLACES: readonly LoadErrorPlace[] = [
  { place: 'ItemList and ListDetail', change: 'The error in place of the rows becomes a LoadError with Retry, in place of a red box holding the raw message.' },
  { place: 'ErrorBoundary', change: 'Its fallback becomes a LoadError box: the label is the sentence, the caught error goes behind Details, Retry resets it.' },
  { place: 'TaskProgress', change: 'A failed job can show its error as a LoadError box, the same red box ItemList draws today; Show log becomes a Disclosure.' },
  { place: 'Video', change: 'A video that fails to load shows a LoadError with Retry over the player.' },
  { place: 'Settings rows', change: 'A choice whose options could not load, such as sound devices, shows an inline LoadError where the control goes.' },
  { place: 'UtilityScreen and Splash', change: 'They keep their own look; their raw message can sit in a Disclosure.' },
];

const LOAD_ERROR_CODE = `import { LoadError } from '@drizztdourden08/tessera';

<LoadError message="Could not load your sessions." error={error} onRetry={reload} retrying={reloading} />
<LoadError variant="box" message="Could not load the map." error={error} onRetry={reload} />
<LoadError variant="inline" message="Could not list the sound devices." error={error} onRetry={listDevices} />`;

export { LOAD_ERROR_ARG_TYPES, LOAD_ERROR_ARGS, LOAD_ERROR_CHOICES, LOAD_ERROR_CODE, LOAD_ERROR_PLACES, VARIANTS };
