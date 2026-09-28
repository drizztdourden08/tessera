/* @layer renderer-components @kind component */
import { Svg, SvgGroup, SvgRect } from '../../primitives/Svg';
import { BrandPaths } from '../BrandPaths';
import { BRAND_FAMILY } from '../family.constants';
import { markLabelProps } from './behavior/markLabelProps';
import { parseViewBox } from './behavior/parseViewBox';
import { pickMarkArt } from './behavior/pickMarkArt';
import { TILE_SCALE } from './BrandMark.constants';
import type { BrandMarkProps } from './BrandMark.type';
import './BrandMark.css';

const BrandMark = (props: BrandMarkProps) => {
  const { app, size = 'md', variant = 'mark', tile = false, title, className = '' } = props;
  const brand = BRAND_FAMILY[app];
  const { viewBox, paths, pixelArt } = pickMarkArt(brand, variant);
  const { x, y, w, h } = parseViewBox(viewBox);
  const cls = ['brand-mark', `brand-mark--${size}`, className].filter(Boolean).join(' ');
  const cx = x + w / 2;
  const cy = y + h / 2;

  return (
    <Svg
      className={cls}
      viewBox={viewBox}
      {...markLabelProps(title ?? brand.name)}
      shapeRendering={pixelArt ? 'crispEdges' : undefined}
    >
      {tile && <SvgRect x={x} y={y} width={w} height={h} rx={w * 0.2} fill={brand.tile} />}
      <SvgGroup transform={tile ? `translate(${cx} ${cy}) scale(${TILE_SCALE}) translate(${-cx} ${-cy})` : undefined}>
        <BrandPaths paths={paths} />
      </SvgGroup>
    </Svg>
  );
};

export { BrandMark };
