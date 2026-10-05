/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import { SIDE_GLYPH_SIZES, SPIN_GLYPH_SIZES } from '../NumberInput.constants';
import type { NumberInputStepsProps } from '../NumberInput.type';
import { NumberInputButton } from './NumberInputButton';

const NumberInputSteps = (props: NumberInputStepsProps) => {
  const { at, size, disabled, onStep } = props;
  const { fields } = useTesseraStrings();
  if (at === 'stack') {
    return (
      <div className="number-input__spin">
        <NumberInputButton className="number-input__btn" glyph="chevronUp" glyphSize={SPIN_GLYPH_SIZES[size]} stroke={2} label={fields.increase} disabled={disabled} onStep={() => onStep(1)} />
        <NumberInputButton className="number-input__btn" glyph="chevronDown" glyphSize={SPIN_GLYPH_SIZES[size]} stroke={2} label={fields.decrease} disabled={disabled} onStep={() => onStep(-1)} />
      </div>
    );
  }
  const down = at === 'start';
  return (
    <NumberInputButton
      className="number-input__side"
      glyph={down ? 'minus' : 'plus'}
      glyphSize={SIDE_GLYPH_SIZES[size]}
      stroke={1.5}
      label={down ? fields.decrease : fields.increase}
      disabled={disabled}
      onStep={() => onStep(down ? -1 : 1)}
    />
  );
};

export { NumberInputSteps };
