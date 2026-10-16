/* @layer renderer-components @kind component */
import { growClass } from '../../field-control/grow-class';
import { useControlSize } from '../../field-control/useControlSize';
import type { NativeSelectProps } from '../Select.type';

const NativeSelect = (props: NativeSelectProps) => {
  const { className, grow, size, children, ...rest } = props;
  const controlSize = useControlSize(size);

  return (
    <select className={`select control-size--${controlSize} ${growClass(grow, className)}`} {...rest}>
      {children}
    </select>
  );
};

export { NativeSelect };
