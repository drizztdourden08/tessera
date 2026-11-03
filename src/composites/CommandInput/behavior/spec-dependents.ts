/* @layer renderer-components @kind logic */
import type { CommandSpec } from '../CommandInput.type';

const specDependents = (spec: CommandSpec, name: string): readonly string[] => {
  const found: string[] = [];
  const queue = [name];
  while (queue.length > 0) {
    const parent = queue.shift();
    spec.params.forEach((param) => {
      if (param.dependsOn !== parent || found.includes(param.name)) return;
      found.push(param.name);
      queue.push(param.name);
    });
  }
  return found;
};

export { specDependents };
