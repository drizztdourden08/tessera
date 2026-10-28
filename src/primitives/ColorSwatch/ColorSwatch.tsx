/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import './ColorSwatch.css';
import { Span } from '../text-elements';
import { captionClass } from './behavior/caption-class';
import { isTranslucent } from './behavior/is-translucent';
import { markClass } from './behavior/mark-class';
import { swatchClasses } from './behavior/swatch-classes';
import { swatchMarks } from './behavior/swatch-marks';
import { swatchStyle } from './behavior/swatch-style';
import { useSwatchSize } from './behavior/useSwatchSize';
import type { ColorSwatchProps } from './ColorSwatch.type';

const ColorSwatch = forwardRef<HTMLButtonElement, ColorSwatchProps>((props, ref) => {
  const {
    color, caption, selected = false, edited = false, transparent = false, unused = false, mixed = false,
    marks, focusRing = 'inset', fill, size, className = '', ...rest
  } = props;
  const translucent = isTranslucent(color, transparent);
  const classes = swatchClasses({ size: useSwatchSize(size), selected, edited, transparent, translucent, unused, mixed, focusRing, fill, className });

  return (
    <button ref={ref} type="button" className={classes} style={swatchStyle(color, transparent, translucent)} {...rest}>
      {caption !== undefined && <Span className={captionClass(color, transparent)}>{caption}</Span>}
      {swatchMarks(marks).map((mark) => (
        <Span key={mark.corner} className={markClass(mark, color, transparent)}>{mark.content}</Span>
      ))}
      {mixed && <Span className="color-swatch__mixed" aria-hidden />}
    </button>
  );
});

ColorSwatch.displayName = 'ColorSwatch';

export { ColorSwatch };
