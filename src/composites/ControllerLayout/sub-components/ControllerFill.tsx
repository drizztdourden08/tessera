/* @layer renderer-components @kind component */
import { REVIEW_MASK } from '../../../primitives/dom/review-mask.constants';
import { SvgGroup, SvgRect } from '../../../primitives/Svg';
import { amountOf } from '../behavior/amount-of';
import { isActive } from '../behavior/is-active';
import { TRIGGER_INSET } from '../ControllerLayout.constants';
import { ControllerOutline } from './ControllerOutline';
import type { ControllerControlProps } from '../ControllerLayout.type';

const ControllerFill = (props: ControllerControlProps) => {
  const { place, state } = props;
  const { shape } = place;
  if (shape.kind !== 'rect') return null;
  const inset = Math.min(TRIGGER_INSET, shape.h / 4);
  const track = shape.h - 2 * inset;
  const level = track * amountOf(state);

  return (
    <SvgGroup className="controller-layout__fill">
      <ControllerOutline shape={shape} className="controller-layout__control" active={isActive(state)} />
      <SvgRect
        className="controller-layout__level"
        x={shape.x + inset}
        y={shape.y + inset + track - level}
        width={shape.w - 2 * inset}
        height={level}
        rx={Math.max(0, shape.r - inset)}
        {...REVIEW_MASK}
      />
    </SvgGroup>
  );
};

export { ControllerFill };
