/* @layer renderer-components @kind component */
import { Svg, SvgPath } from '../../../primitives/Svg';
import { isActive } from '../behavior/slot-state';
import { stickClickState } from '../behavior/stick-click';
import { VIEW_BOX } from '../ControllerLayout.constants';
import { ControllerFill } from './ControllerFill';
import { ControllerOutline } from './ControllerOutline';
import { ControllerStick } from './ControllerStick';
import type { ControllerSilhouetteProps } from '../ControllerLayout.type';

const ControllerSilhouette = (props: ControllerSilhouetteProps) => {
  const { geometry, slots } = props;

  return (
    <Svg className="controller-layout__art" viewBox={VIEW_BOX} aria-hidden="true" focusable="false">
      <SvgPath className="controller-layout__body" d={geometry.body} />
      {geometry.decor.map((shape, index) => <ControllerOutline key={index} shape={shape} className="controller-layout__decor" />)}
      {geometry.places.map((place) => {
        const state = slots[place.id];
        if (place.kind === 'stick') return <ControllerStick key={place.id} place={place} state={state} click={stickClickState(slots, place.id)} />;
        if (place.kind === 'fill') return <ControllerFill key={place.id} place={place} state={state} />;
        return <ControllerOutline key={place.id} shape={place.shape} className="controller-layout__control" active={isActive(state)} />;
      })}
    </Svg>
  );
};

export { ControllerSilhouette };
