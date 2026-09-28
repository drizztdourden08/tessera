/* @layer renderer-components @kind component */
import { rangePercent } from '../behavior/range-percent';
import type { RangeTicksProps } from './RangeTicks.type';

const RangeTicks = (props: RangeTicksProps) => {
  const { stops, low, high, labelEvery } = props;
  const last = Math.max(0, stops.length - 1);
  const every = labelEvery ?? 1;
  const ticks = stops
    .map((label, index) => ({ label, index }))
    .filter(({ index }) => index === 0 || index === last || index % every === 0);

  return (
    <div className="range-slider__ticks">
      {ticks.map(({ label, index }) => (
        <span
          key={index}
          className={`range-slider__tick${index >= low && index <= high ? ' range-slider__tick--in' : ''}`}
          style={{ left: `${rangePercent(index, last)}%` }}
        >
          {label}
        </span>
      ))}
    </div>
  );
};

export { RangeTicks };
