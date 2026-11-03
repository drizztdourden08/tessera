/* @layer renderer-components @kind component */
import { Glyph } from '../../Glyph';
import { Icon } from '../../Icon';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import { SIDE_GLYPH_SIZES, SPIN_GLYPH_SIZES } from '../NumberInput.constants';
import type { NumberInputStepsProps } from '../NumberInput.type';
import { NumberInputButton } from './NumberInputButton';

const NumberInputSteps = (props: NumberInputStepsProps) => {
  const { at, size, disabled, labels, limits, onStep } = props;
  const { fields } = useTesseraStrings();
  const [decreaseLabel, increaseLabel] = labels ?? [fields.decrease, fields.increase];
  const [atMin, atMax] = limits ?? [false, false];
  if (at === 'stack') {
    return (
      <div className="number-input__spin">
        <NumberInputButton
          className="number-input__btn"
          mark={<Icon name="chevron-up" size={SPIN_GLYPH_SIZES[size]} className="number-input__chevron" />}
          label={increaseLabel}
          disabled={disabled || atMax}
          onStep={() => onStep(1)}
        />
        <NumberInputButton
          className="number-input__btn"
          mark={<Icon name="chevron-down" size={SPIN_GLYPH_SIZES[size]} className="number-input__chevron" />}
          label={decreaseLabel}
          disabled={disabled || atMin}
          onStep={() => onStep(-1)}
        />
      </div>
    );
  }
  const down = at === 'start';
  return (
    <NumberInputButton
      className="number-input__side"
      mark={down ? <Glyph name="minus" size={SIDE_GLYPH_SIZES[size]} /> : <Icon name="plus" size={SIDE_GLYPH_SIZES[size]} className="number-input__plus" />}
      label={down ? decreaseLabel : increaseLabel}
      disabled={disabled || (down ? atMin : atMax)}
      onStep={() => onStep(down ? -1 : 1)}
    />
  );
};

export { NumberInputSteps };
