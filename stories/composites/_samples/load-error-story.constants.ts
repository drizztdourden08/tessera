/* @layer stories @kind data */
import type { LoadErrorVariant } from '../../../src/composites';
import type { PlaygroundArgTypes } from '../../_template/controls/playground.type';
import type { LoadErrorArgs } from './load-error-story.type';

const VARIANTS: readonly LoadErrorVariant[] = ['center', 'box', 'inline'];

const LOAD_ERROR_ARGS: Partial<LoadErrorArgs> = { variant: 'center', message: 'Could not load your sessions.', raw: 'short', retry: true, retrying: false };

const LOAD_ERROR_ARG_TYPES: PlaygroundArgTypes<LoadErrorArgs> = {
  variant: { group: 'Appearance', control: 'select', options: [...VARIANTS], description: 'Center fills a pane or screen, box sits in a section, inline sits in a row.' },
  message: { group: 'Content', control: 'text', description: 'The one plain sentence the user reads.' },
  raw: { group: 'Content', control: 'select', options: ['short', 'long', 'none'], description: 'The raw error behind Details; none hides Details.' },
  retry: { group: 'Behaviour', control: 'boolean', description: 'Passes onRetry, which shows the Retry button.' },
  retrying: { group: 'State', control: 'boolean', description: 'A try is running: Retry spins and takes no second click.' },
};

const LOAD_ERROR_CODE = `import { ErrorBoundary, ItemList, LoadError, SettingsRow } from '@drizztdourden08/tessera';

<LoadError message="Could not load your sessions." error={error} onRetry={reload} retrying={reloading} />
<LoadError variant="box" message="Could not load the map." error={error} onRetry={reload} />
<LoadError variant="inline" message="Could not list the sound devices." error={error} onRetry={listDevices} />

<ItemList title="Servers" items={servers} error={error} onRetry={reload} {...rest} />
<SettingsRow {...row} problem={{ message: 'Could not list the sound devices.', error, onRetry: listDevices }} />
<ErrorBoundary label="The map could not be shown" onRetry={clearMapCache}><Map /></ErrorBoundary>`;

export { LOAD_ERROR_ARG_TYPES, LOAD_ERROR_ARGS, LOAD_ERROR_CODE, VARIANTS };
