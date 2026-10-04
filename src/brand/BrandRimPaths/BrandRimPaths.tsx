/* @layer renderer-components @kind component */
import { SvgGroup, SvgPath } from '../../primitives/Svg';
import type { BrandRimPathsProps } from './BrandRimPaths.type';
import './BrandRimPaths.css';

const BrandRimPaths = (props: BrandRimPathsProps) => {
  const { paths, tone, pixelArt = false } = props;
  const cls = ['brand-rim', `brand-rim--${tone}`, pixelArt ? 'brand-rim--pixel' : ''].filter(Boolean).join(' ');
  return (
    <SvgGroup className={cls} aria-hidden>
      {paths.map((p, i) => <SvgPath key={i} d={p.d} fill="none" vectorEffect="non-scaling-stroke" />)}
    </SvgGroup>
  );
};

export { BrandRimPaths };
