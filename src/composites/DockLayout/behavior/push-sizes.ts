/* @layer renderer-components @kind logic */
import { slackOf } from './slack-of';

const sumSlack = (sizes: readonly number[], order: readonly number[]) => order.reduce((sum, at) => sum + slackOf(sizes[at] ?? 0), 0);

const shrinkChain = (sizes: number[], order: readonly number[], amount: number) => {
  let left = amount;
  for (const at of order) {
    const take = Math.min(left, slackOf(sizes[at] ?? 0));
    sizes[at] = (sizes[at] ?? 0) - take;
    left -= take;
  }
};

const pushSizes = (origin: readonly number[], index: number, delta: number): number[] => {
  const sizes = [...origin];
  const ahead = Array.from({ length: Math.max(0, origin.length - index - 1) }, (_, k) => index + 1 + k);
  const behind = Array.from({ length: index + 1 }, (_, k) => index - k);
  if (delta >= 0) {
    const amount = Math.min(delta, sumSlack(origin, ahead));
    sizes[index] = (origin[index] ?? 0) + amount;
    shrinkChain(sizes, ahead, amount);
    return sizes;
  }
  const amount = Math.min(-delta, sumSlack(origin, behind));
  sizes[index + 1] = (origin[index + 1] ?? 0) + amount;
  shrinkChain(sizes, behind, amount);
  return sizes;
};

export { pushSizes };
