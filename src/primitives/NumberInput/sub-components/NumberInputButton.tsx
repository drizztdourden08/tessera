/* @layer renderer-components @kind component */
import { preventTextSelection } from '../../dom/prevent-text-selection';
import type { NumberInputButtonProps } from '../NumberInput.type';

const NumberInputButton = (props: NumberInputButtonProps) => {
  const { className, mark, label, disabled, onStep } = props;
  return (
    <button type="button" className={className} tabIndex={-1} aria-label={label} disabled={disabled} onMouseDown={preventTextSelection} onClick={onStep}>
      {mark}
    </button>
  );
};

export { NumberInputButton };
