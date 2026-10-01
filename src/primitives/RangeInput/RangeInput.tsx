/* @layer renderer-components @kind component */
import './RangeInput.css';
import { useControlSize } from '../field-control/useControlSize';
import type { RangeInputProps } from './RangeInput.type';

const RangeInput = (props: RangeInputProps) => {
  const { className = '', size, ...rest } = props;
  const controlSize = useControlSize(size);
  return <input type="range" className={`range-input range-input--${controlSize} ${className}`} {...rest} />;
};

export { RangeInput };
