/* @layer renderer-components @kind component */
import { useControlSize } from '../../field-control/useControlSize';
import type { NativeSelectProps } from '../Select.type';

const NativeSelect = (props: NativeSelectProps) => {
  const { className = '', size, children, ...rest } = props;
  const controlSize = useControlSize(size);

  return (
    <select className={`select control-size--${controlSize} ${className}`} {...rest}>
      {children}
    </select>
  );
};

export { NativeSelect };
