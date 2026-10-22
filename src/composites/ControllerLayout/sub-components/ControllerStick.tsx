/* @layer renderer-components @kind component */
import { REVIEW_MASK } from '../../../primitives/dom/review-mask.constants';
import { SvgCircle, SvgGroup, SvgLine } from '../../../primitives/Svg';
import { clampAxis } from '../behavior/clamp-axis';
import { isActive } from '../behavior/is-active';
import { stickMoved } from '../behavior/stick-moved';
import { STICK_CAP_RATIO, STICK_TRAVEL_RATIO } from '../ControllerLayout.constants';
import type { ControllerStickProps } from '../ControllerLayout.type';

const ControllerStick = (props: ControllerStickProps) => {
  const { place, state, click } = props;
  const { shape } = place;
  if (shape.kind !== 'circle') return null;
  const { cx, cy, r } = shape;
  const travel = r * STICK_TRAVEL_RATIO;
  const dx = clampAxis(state?.x) * travel;
  const dy = -clampAxis(state?.y) * travel;
  const clicked = isActive(click) ? '' : undefined;
  const moved = stickMoved(state) ? '' : undefined;

  return (
    <SvgGroup className="controller-layout__stick" data-clicked={clicked} data-moved={moved}>
      <SvgCircle className="controller-layout__well" cx={cx} cy={cy} r={r} />
      <SvgLine className="controller-layout__axis" x1={cx - r} y1={cy} x2={cx + r} y2={cy} />
      <SvgLine className="controller-layout__axis" x1={cx} y1={cy - r} x2={cx} y2={cy + r} />
      <SvgGroup className="controller-layout__cap" transform={`translate(${dx} ${dy})`} {...REVIEW_MASK}>
        <SvgCircle className="controller-layout__cap-face" cx={cx} cy={cy} r={r * STICK_CAP_RATIO} />
      </SvgGroup>
    </SvgGroup>
  );
};

export { ControllerStick };
