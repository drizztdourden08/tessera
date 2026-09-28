/* @layer renderer-components @kind component */
import type { PathIconProps } from './PathIcon.type';

const PathIcon = (props: PathIconProps) => {
  const { paths = [], circles = [], size = 16, viewBox = '0 0 16 16', ...rest } = props;
  return (
    <svg width={size} height={size} viewBox={viewBox} fill="currentColor" {...rest}>
      {paths.map((d) => <path key={d} d={d} />)}
      {circles.map((c) => <circle key={`${c.cx},${c.cy}`} cx={c.cx} cy={c.cy} r={c.r} />)}
    </svg>
  );
};

export { PathIcon };
