/* @layer renderer-components @kind component */
import './ColorSwatch.css';
import { useControlSize } from '../field-control/useControlSize';
import { Span } from '../text-elements';
import type { ColorSwatchProps } from './ColorSwatch.type';

const ColorSwatch = (props: ColorSwatchProps) => {
  const { color, caption, selected = false, edited = false, transparent = false, size, className = '', ...rest } = props;
  const controlSize = useControlSize(size);
  const classes = [
    'color-swatch',
    `color-swatch--${controlSize}`,
    selected ? 'color-swatch--selected' : '',
    edited ? 'color-swatch--edited' : '',
    transparent ? 'color-swatch--transparent' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button type="button" className={classes} style={transparent ? undefined : { background: color }} {...rest}>
      {caption !== undefined && <Span className="color-swatch__caption">{caption}</Span>}
    </button>
  );
};

export { ColorSwatch };
