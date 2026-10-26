/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import './ColorSwatch.css';
import { useControlSize } from '../field-control/useControlSize';
import { Span } from '../text-elements';
import { captionClass } from './behavior/caption-class';
import { isTranslucent } from './behavior/is-translucent';
import { swatchClasses } from './behavior/swatch-classes';
import { swatchStyle } from './behavior/swatch-style';
import type { ColorSwatchProps } from './ColorSwatch.type';

const ColorSwatch = forwardRef<HTMLButtonElement, ColorSwatchProps>((props, ref) => {
  const { color, caption, selected = false, edited = false, transparent = false, size, className = '', ...rest } = props;
  const translucent = isTranslucent(color, transparent);
  const classes = swatchClasses({ size: useControlSize(size), selected, edited, transparent, translucent, className });

  return (
    <button ref={ref} type="button" className={classes} style={swatchStyle(color, transparent, translucent)} {...rest}>
      {caption !== undefined && <Span className={captionClass(color, transparent)}>{caption}</Span>}
    </button>
  );
});

ColorSwatch.displayName = 'ColorSwatch';

export { ColorSwatch };
