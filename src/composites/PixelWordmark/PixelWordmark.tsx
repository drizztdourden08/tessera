/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Svg, SvgPath } from '../../primitives/Svg';
import { buildPixelWordmark } from './behavior/build-pixel-wordmark';
import type { PixelWordmarkProps } from './PixelWordmark.type';
import './PixelWordmark.css';

const PixelWordmark = (props: PixelWordmarkProps) => {
  const { text, colors, size = 'sm', title, className = '' } = props;
  const art = useMemo(() => buildPixelWordmark(text, colors), [text, colors]);
  const label = title ?? text;
  const cls = ['pixel-wordmark', `pixel-wordmark--${size}`, className].filter(Boolean).join(' ');
  return (
    <Svg
      className={cls}
      viewBox={art.viewBox}
      style={{ aspectRatio: `${art.width} / ${art.height}` }}
      shapeRendering="crispEdges"
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
    >
      {art.paths.map((p) => <SvgPath key={p.ink} d={p.d} fill={p.ink} />)}
    </Svg>
  );
};

export { PixelWordmark };
