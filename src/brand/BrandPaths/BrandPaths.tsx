/* @layer renderer-components @kind component */
import { SvgPath } from '../../primitives/Svg';
import type { BrandPathsProps } from './BrandPaths.type';

const BrandPaths = (props: BrandPathsProps) => {
  const { paths } = props;
  return (
    <>
      {paths.map((p, i) => (
        <SvgPath
          key={i}
          d={p.d}
          fill={p.ink}
          fillRule={p.evenOdd ? 'evenodd' : undefined}
          fillOpacity={p.opacity}
        />
      ))}
    </>
  );
};

export { BrandPaths };
