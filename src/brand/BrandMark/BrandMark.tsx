/* @layer renderer-components @kind component */
import { Svg, SvgGroup, SvgRect } from '../../primitives/Svg';
import { BrandPaths } from '../BrandPaths';
import { BRAND_FAMILY } from '../family.constants';
import { markClass } from './behavior/mark-class';
import { markLabelProps } from './behavior/mark-label-props';
import { squareBox } from './behavior/square-box';
import { tileTransform } from './behavior/tile-transform';
import { TILE_RADIUS } from './BrandMark.constants';
import type { BrandMarkProps } from './BrandMark.type';
import { BrandMarkRim } from './sub-components/BrandMarkRim';
import './BrandMark.css';

const BrandMark = (props: BrandMarkProps) => {
  const { app, size = 'md', variant = 'mark', rim = 'none', title, className = '' } = props;
  const brand = BRAND_FAMILY[app];
  const { viewBox, paths, pixelArt } = brand.mark;
  const tile = variant === 'app-icon' && brand.appIcon === 'tile';
  const box = squareBox(viewBox);
  const { x, y, w, h } = box;

  return (
    <Svg
      className={markClass(size, rim, className)}
      viewBox={`${x} ${y} ${w} ${h}`}
      {...markLabelProps(title ?? brand.name)}
      shapeRendering={pixelArt ? 'crispEdges' : undefined}
    >
      <BrandMarkRim rim={rim} paths={paths} box={box} tile={tile} pixelArt={pixelArt} />
      {tile && <SvgRect x={x} y={y} width={w} height={h} rx={w * TILE_RADIUS} fill={brand.tile} />}
      <SvgGroup transform={tile ? tileTransform(box) : undefined}>
        <BrandPaths paths={paths} />
      </SvgGroup>
    </Svg>
  );
};

export { BrandMark };
