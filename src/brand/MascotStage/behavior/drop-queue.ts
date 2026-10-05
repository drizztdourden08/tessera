/* @layer renderer-components @kind logic */
import type { ActorCore } from './actor.type';

const dropQueue = (actor: ActorCore): void => {
  for (const queued of actor.queue.splice(0)) queued.resolve('interrupted');
};

export { dropQueue };
