/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import { Span } from '../../text-elements';
import { FACE_ICON_SIZE } from './StepperDot.constants';
import type { StepperDotFaceProps } from './StepperDotFace.type';
import './StepperDotFace.css';

const StepperDotFace = (props: StepperDotFaceProps) => {
  const { number, icon } = props;
  return (
    <Span className="stepper-dot__face">
      <Span className="stepper-dot__card" data-flip={icon === undefined ? undefined : ''}>
        <Span className="stepper-dot__number">{number}</Span>
        {icon !== undefined && (
          <Span className="stepper-dot__icon">
            <Icon name={icon} size={FACE_ICON_SIZE} />
          </Span>
        )}
      </Span>
    </Span>
  );
};

export { StepperDotFace };
