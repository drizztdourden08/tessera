/* @layer renderer-components @kind logic */
import type { ActorCore } from './actor.type';

const dropWaiting = (actor: ActorCore): void => {
  actor.waiting?.resolve('interrupted');
  actor.waiting = undefined;
};

export { dropWaiting };
