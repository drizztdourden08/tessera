/* @layer renderer-components @kind logic */
import type { TabTargetParams } from './tab-target.type';

const tabTarget = <T>(params: TabTargetParams<T>): T | null => {
  const { stops, active, backwards, container, inside } = params;
  if (stops.length === 0) return container;
  const at = active === null ? -1 : stops.indexOf(active);
  const atEdge = at === (backwards ? 0 : stops.length - 1);
  const lost = at === -1 && (!inside || active === container);
  if (!atEdge && !lost) return null;
  return (backwards ? stops.at(-1) : stops[0]) ?? container;
};

export { tabTarget };
