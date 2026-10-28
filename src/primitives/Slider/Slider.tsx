/* @layer renderer-components @kind data */
import '../../theme/control-size.css';
import '../../theme/slider-thumb.css';
import './Slider.css';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import { useControlSize } from '../field-control/useControlSize';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { FieldControlBoundary } from '../FieldControlBoundary';
import { useHintTarget } from '../hint/useHintTarget';
import { sliderClass } from './behavior/slider-class';
import { sliderScale } from './behavior/slider-scale';
import type { SliderProps } from './Slider.type';
import { SliderHeader } from './sub-components/SliderHeader';
import { SliderRange } from './sub-components/SliderRange';
import { SliderSingle } from './sub-components/SliderSingle';

const Slider = (props: SliderProps) => {
  const { label, description, disabled = false, size, hint, onHint, 'aria-label': ariaLabel } = props;
  const controlSize = useControlSize(size);
  const { fields } = useTesseraStrings();
  const hintHandlers = useHintTarget<HTMLDivElement>({ hint, onHint });
  const control = useFieldControl(props.id);
  const accessibleName = ariaLabel ?? label ?? hint?.label;
  const part = { scale: sliderScale(props), disabled, accessibleName, mixedText: props.mixed ? fields.mixed : undefined, labelledBy: accessibleName ? undefined : control.labelId, describedBy: control.describedBy };

  return (
    <div className={sliderClass(props, controlSize, disabled)} {...hintHandlers}>
      <SliderHeader label={label} description={description} />
      <FieldControlBoundary>
        {props.range ? <SliderRange {...part} props={{ ...props, id: control.id }} /> : <SliderSingle {...part} props={{ ...props, id: control.id }} />}
      </FieldControlBoundary>
    </div>
  );
};

export {
  Slider,
};
