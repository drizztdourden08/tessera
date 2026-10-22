/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import { Span } from '../../text-elements';
import { STEPPER_SIZES } from '../behavior/stepper-sizes.constants';
import type { StepperDotFaceProps } from './StepperDotFace.type';
import './StepperDotFace.css';

const StepperDotFace = (props: StepperDotFaceProps) => {
  const { number, icon, size = 'md' } = props;
  return (
    <Span className="stepper-dot__face">
      <Span className="stepper-dot__card" data-flip={icon === undefined ? undefined : ''}>
        <Span className="stepper-dot__number">{number}</Span>
        {icon !== undefined && (
          <Span className="stepper-dot__icon">
            <Icon name={icon} size={STEPPER_SIZES[size].icon} />
          </Span>
        )}
      </Span>
    </Span>
  );
};

export { StepperDotFace };
