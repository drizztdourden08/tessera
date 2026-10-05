/* @layer renderer-components @kind component */
import { preventTextSelection } from '../../dom/prevent-text-selection';
import { Glyph } from '../../Glyph';
import type { NumberInputButtonProps } from '../NumberInput.type';

const NumberInputButton = (props: NumberInputButtonProps) => {
  const { className, glyph, glyphSize, stroke, label, disabled, onStep } = props;
  return (
    <button type="button" className={className} tabIndex={-1} aria-label={label} disabled={disabled} onMouseDown={preventTextSelection} onClick={onStep}>
      <Glyph name={glyph} size={glyphSize} strokeWidth={stroke} />
    </button>
  );
};

export { NumberInputButton };
