/* @layer renderer-components @kind logic */
import type { TabTargetParams } from './tab-target.type';

const edgeOf = <T>(stops: readonly T[], backwards: boolean): T | undefined => (backwards ? stops.at(-1) : stops[0]);

const looseTarget = <T>(params: TabTargetParams<T>): T | null => {
  const { stops, backwards, container, follows } = params;
  if (!follows) return null;
  const near = backwards ? stops.filter((stop) => !follows(stop)).at(-1) : stops.find(follows);
  return near ?? edgeOf(stops, backwards) ?? container;
};

const tabTarget = <T>(params: TabTargetParams<T>): T | null => {
  const { stops, active, backwards, container, inside } = params;
  if (stops.length === 0) return container;
  const at = active === null ? -1 : stops.indexOf(active);
  if (at === -1 && inside && active !== container) return looseTarget(params);
  const atEdge = at === (backwards ? 0 : stops.length - 1);
  return atEdge || at === -1 ? edgeOf(stops, backwards) ?? container : null;
};

export { tabTarget };
