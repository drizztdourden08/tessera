/* @layer renderer-components @kind component */
import { SvgCircle, SvgRect } from '../../../primitives/Svg';
import type { ControllerShapeProps } from '../ControllerLayout.type';

const ControllerOutline = (props: ControllerShapeProps) => {
  const { shape, className, active = false } = props;
  const lit = active ? '' : undefined;

  if (shape.kind === 'circle') return <SvgCircle className={className} cx={shape.cx} cy={shape.cy} r={shape.r} data-active={lit} />;
  return <SvgRect className={className} x={shape.x} y={shape.y} width={shape.w} height={shape.h} rx={shape.r} data-active={lit} />;
};

export { ControllerOutline };
