/* @layer renderer-components @kind component */
import { ColorSwatch } from '../../../primitives/ColorSwatch';
import { ContextMenu } from '../../ContextMenu';
import { stepCaption } from '../behavior/step-caption';
import { stepLabel } from '../behavior/step-label';
import { RAMP_INDEX_ATTRIBUTE, STEP_MENU_GROUP_ID } from '../RampStrip.constants';
import type { RampStripStepProps } from '../RampStrip.type';

const RampStripStep = (props: RampStripStepProps) => {
  const { step, index, picked, multi, size, numbered, strip, menu, data, onPress, onDoubleClick, onDragStart } = props;
  const preview = size === 'preview';
  const swatch = (
    <ColorSwatch
      color={step.color}
      size={preview ? undefined : size}
      fill={preview}
      caption={stepCaption(step, index, numbered)}
      unused={step.unused}
      disabled={step.disabled}
      marks={step.marks}
      selected={picked}
      focusRing="apart"
      className="ramp-strip__step"
      role={multi ? undefined : 'radio'}
      aria-checked={multi ? undefined : picked}
      aria-pressed={multi ? picked : undefined}
      aria-label={stepLabel(step)}
      title={stepLabel(step)}
      tabIndex={index === strip.tabStop ? 0 : -1}
      draggable={onDragStart === undefined ? undefined : true}
      {...data}
      {...{ [RAMP_INDEX_ATTRIBUTE]: index }}
      onFocus={() => strip.onFocusStep(index)}
      onClick={onPress}
      onDoubleClick={onDoubleClick}
      onDragStart={onDragStart}
    />
  );
  if (menu === undefined || menu.length === 0) return swatch;
  return <ContextMenu groups={[{ id: STEP_MENU_GROUP_ID, items: menu }]}>{swatch}</ContextMenu>;
};

export { RampStripStep };
