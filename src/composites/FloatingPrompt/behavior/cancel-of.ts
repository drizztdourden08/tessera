/* @layer renderer-components @kind logic */
import type { FloatingPromptAction } from '../FloatingPrompt.type';

const cancelOf = (actions: readonly FloatingPromptAction[]): FloatingPromptAction | undefined =>
  actions.find((action) => action.cancel === true && action.disabled !== true);

export { cancelOf };
