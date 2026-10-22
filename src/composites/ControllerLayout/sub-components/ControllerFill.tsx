/* @layer renderer-components @kind component */
import { REVIEW_MASK } from '../../../primitives/dom/review-mask.constants';
import { SvgGroup, SvgRect } from '../../../primitives/Svg';
import { amountOf, isActive } from '../behavior/slot-state';
import { TRIGGER_INSET } from '../ControllerLayout.constants';
import { ControllerOutline } from './ControllerOutline';
import type { ControllerControlProps } from '../ControllerLayout.type';

const ControllerFill = (props: ControllerControlProps) => {
  const { place, state } = props;
  const { shape } = place;
  if (shape.kind !== 'rect') return null;
  const inset = Math.min(TRIGGER_INSET, shape.h / 4);
  const amount = amountOf(state);

  return (
    <SvgGroup className="controller-layout__fill">
      <ControllerOutline shape={shape} className="controller-layout__control" active={isActive(state)} />
      <SvgRect
        className="controller-layout__level"
        x={shape.x + inset}
        y={shape.y + inset}
        width={shape.w - 2 * inset}
        height={shape.h - 2 * inset}
        rx={Math.max(0, shape.r - inset)}
        style={{ transform: `scaleY(${amount})` }}
        {...REVIEW_MASK}
      />
    </SvgGroup>
  );
};

export { ControllerFill };
