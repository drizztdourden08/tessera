/* @layer renderer-components @kind component */
import { Svg, SvgGroup, SvgRect } from '../../primitives/Svg';
import { BrandPaths } from '../BrandPaths';
import { BRAND_FAMILY } from '../family.constants';
import { markClass } from './behavior/mark-class';
import { markLabelProps } from './behavior/mark-label-props';
import { markLook } from './behavior/mark-look';
import { squareBox } from './behavior/square-box';
import { tileTransform } from './behavior/tile-transform';
import { useMarkGround } from './behavior/useMarkGround';
import { TILE_RADIUS } from './BrandMark.constants';
import type { BrandMarkProps } from './BrandMark.type';
import { BrandMarkRim } from './sub-components/BrandMarkRim';
import './BrandMark.css';

const BrandMark = (props: BrandMarkProps) => {
  const { app, size = 'md', variant = 'mark', rim = 'none', ground, title, className = '' } = props;
  const brand = BRAND_FAMILY[app];
  const tile = variant === 'app-icon' && brand.appIcon === 'tile';
  const look = markLook(brand.mark, useMarkGround(ground, tile), rim);
  const { viewBox, pixelArt } = brand.mark;
  const box = squareBox(viewBox);
  const { x, y, w, h } = box;

  return (
    <Svg
      className={markClass(size, look.rim, className)}
      viewBox={`${x} ${y} ${w} ${h}`}
      {...markLabelProps(title ?? brand.name)}
      shapeRendering={pixelArt ? 'crispEdges' : undefined}
    >
      <BrandMarkRim rim={look.rim} paths={look.paths} box={box} tile={tile} pixelArt={pixelArt} fine={look.fine} />
      {tile && <SvgRect x={x} y={y} width={w} height={h} rx={w * TILE_RADIUS} fill={brand.tile} />}
      <SvgGroup transform={tile ? tileTransform(box) : undefined}>
        <BrandPaths paths={look.paths} />
      </SvgGroup>
    </Svg>
  );
};

export { BrandMark };
