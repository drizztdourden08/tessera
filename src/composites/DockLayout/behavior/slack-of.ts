/* @layer renderer-components @kind logic */
import { MIN_SIZE } from '../DockLayout.constants';

const slackOf = (size: number) => Math.max(0, size - MIN_SIZE);

export { slackOf };
