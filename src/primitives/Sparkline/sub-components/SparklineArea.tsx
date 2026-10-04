/* @layer renderer-components @kind component */
import { useId } from 'react';
import type { SparklineAreaProps } from './SparklineArea.type';

const SparklineArea = (props: SparklineAreaProps) => {
  const { d } = props;
  const fade = useId();
  return (
    <>
      <defs>
        <linearGradient id={fade} x1={0} y1={0} x2={0} y2={1}>
          <stop className="sparkline__fade-top" offset={0} />
          <stop className="sparkline__fade-bottom" offset={1} />
        </linearGradient>
      </defs>
      <path className="sparkline__area" d={d} fill={`url(#${fade})`} />
    </>
  );
};

export { SparklineArea };
