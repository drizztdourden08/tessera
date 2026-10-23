/* @layer renderer-components @kind component */
import { SvgCircle, SvgGroup, SvgRect } from '../../../primitives/Svg';
import { PILL_HALF_H, PILL_HALF_W, SQUARE_CORNER, STICK_FLOOR } from '../behavior/well.constants';
import type { SilhouetteWellProps } from '../ControllerSilhouette.type';

const SilhouetteWell = (props: SilhouetteWellProps) => {
  const { well, ids } = props;
  const { kind, x, y, r } = well;
  const fill = `url(#${kind === 'dish' ? ids.dish : ids.well})`;
  const stroke = `url(#${ids.rim})`;
  const className = `controller-silhouette__well controller-silhouette__well--${kind}`;

  if (kind === 'pill') {
    const w = r * PILL_HALF_W;
    const h = r * PILL_HALF_H;
    return <SvgRect className={className} x={x - w} y={y - h} width={w * 2} height={h * 2} rx={h} fill={fill} stroke={stroke} data-anchor={well.id} />;
  }
  if (kind === 'square') {
    return <SvgRect className={className} x={x - r} y={y - r} width={r * 2} height={r * 2} rx={r * SQUARE_CORNER} fill={fill} stroke={stroke} data-anchor={well.id} />;
  }
  if (kind !== 'stick') return <SvgCircle className={className} cx={x} cy={y} r={r} fill={fill} stroke={stroke} data-anchor={well.id} />;

  return (
    <SvgGroup className={className} data-anchor={well.id}>
      <SvgCircle className="controller-silhouette__socket" cx={x} cy={y} r={r} fill={fill} stroke={stroke} />
      <SvgCircle className="controller-silhouette__floor" cx={x} cy={y} r={r * STICK_FLOOR} fill={`url(#${ids.dish})`} />
    </SvgGroup>
  );
};

export { SilhouetteWell };
