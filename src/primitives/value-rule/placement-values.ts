/* @layer renderer-components @kind util */
import type { ValueScale } from './value-rule.type';
import { MAX_RULE_MARKS } from './value-rule.constants';
import { decimalsOf } from './decimals-of';
import type { RulePlacement, PlacedValue, RulePoint } from './value-rule.type';

const fixed = (value: number, decimals: number): number => Number(value.toFixed(Math.min(decimals, 10)));

const series = (scale: ValueScale, size: number, what: string): PlacedValue[] => {
  const count = Math.floor((scale.max - scale.min) / size + 1e-9) + 1;
  if (count > MAX_RULE_MARKS) throw new Error(`${what} places ${count} labels between min and max, more than ${MAX_RULE_MARKS}. Space them wider.`);
  const decimals = decimalsOf(scale.min, size);
  return Array.from({ length: count }, (_, index) => ({ value: fixed(scale.min + index * size, decimals) }));
};

const evenly = (scale: ValueScale, count: number): PlacedValue[] => {
  const decimals = decimalsOf(scale.min, scale.step);
  return Array.from({ length: count }, (_, index) => {
    const raw = count === 1 ? scale.min : scale.min + ((scale.max - scale.min) * index) / (count - 1);
    const snapped = scale.min + Math.round((raw - scale.min) / scale.step) * scale.step;
    return { value: fixed(Math.min(scale.max, snapped), decimals) };
  });
};

const pointValue = (point: RulePoint, scale: ValueScale): PlacedValue => {
  if (point.value === 'min') return { value: scale.min, text: point.text };
  if (point.value === 'max') return { value: scale.max, text: point.text };
  return { value: point.value, text: point.text };
};

const placeOne = (placement: RulePlacement, scale: ValueScale): PlacedValue[] => {
  switch (placement.kind) {
    case 'every': return series(scale, placement.size, `every ${placement.size}`);
    case 'steps': return series(scale, scale.step, 'steps');
    case 'count': return evenly(scale, placement.count);
    case 'ends': return [{ value: scale.min }, { value: scale.max }];
    case 'at': return placement.points.map((point) => pointValue(point, scale));
    case 'none': return [];
  }
};

const placementValues = (placements: readonly RulePlacement[], scale: ValueScale): PlacedValue[] => {
  const byValue = new Map<number, PlacedValue>();
  placements.flatMap((placement) => placeOne(placement, scale))
    .filter((point) => point.value >= scale.min && point.value <= scale.max)
    .forEach((point) => {
      const known = byValue.get(point.value);
      if (!known || (known.text === undefined && point.text !== undefined)) byValue.set(point.value, point);
    });
  return [...byValue.values()].sort((a, b) => a.value - b.value);
};

export { placementValues };
