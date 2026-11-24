/* @layer renderer-components @kind component */
import { SvgPath } from '../../primitives/Svg';
import type { BrandPathsProps } from './BrandPaths.type';

const BrandPaths = (props: BrandPathsProps) => {
  const { paths } = props;
  const eyes = paths.filter((p) => p.part === 'eye');
  return (
    <>
      {paths.map((p, i) => (
        <SvgPath
          key={i}
          d={p.d}
          fill={p.ink}
          fillRule={p.evenOdd ? 'evenodd' : undefined}
          fillOpacity={p.opacity}
          className={p.part ? `brand-mark__${p.part}` : undefined}
          data-eye={p.part === 'eye' ? eyes.indexOf(p) : undefined}
        />
      ))}
    </>
  );
};

export { BrandPaths };
