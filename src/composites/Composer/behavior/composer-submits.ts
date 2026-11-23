/* @layer renderer-components @kind logic */
import type { ComposerKeyEvent } from '../Composer.type';

const composerSubmits = (event: ComposerKeyEvent, composing: boolean): boolean => (
  event.key === 'Enter' && !composing && !event.defaultPrevented && !event.shiftKey && !event.ctrlKey && !event.metaKey && !event.altKey
);

export { composerSubmits };
