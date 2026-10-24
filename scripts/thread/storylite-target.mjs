/* @layer tooling-scripts @kind logic */
import { serveTarget } from '@drizztdourden08/brock-thread';
import { portFor, portSlotOf } from '@drizztdourden08/brock-thread/ports';
import { STORYLITE_COMMAND, STORYLITE_PORT_BASE } from './storylite-target.constants.mjs';

const storyliteTarget = () => {
  const launch = (options) => {
    const port = portFor(STORYLITE_PORT_BASE, portSlotOf(options.worktree.path));
    return serveTarget({ command: STORYLITE_COMMAND, port }).launch(options);
  };
  const { notReady } = serveTarget({ command: STORYLITE_COMMAND });
  return { kind: 'serve', launch, notReady };
};

export { storyliteTarget };
