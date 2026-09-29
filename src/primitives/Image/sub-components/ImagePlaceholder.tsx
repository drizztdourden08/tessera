/* @layer renderer-components @kind component */
import { Glyph } from '../../Glyph';
import { PathIcon } from '../../PathIcon';
import {
  BROKEN_BADGE_STROKE,
  IMAGE_GLYPH_CIRCLES,
  IMAGE_GLYPH_PATHS,
  IMAGE_GLYPH_STROKE,
  IMAGE_GLYPH_VIEWBOX,
} from '../Image.constants';
import type { ImagePlaceholderProps } from '../Image.type';
import './ImagePlaceholder.css';

const ImagePlaceholder = (props: ImagePlaceholderProps) => {
  const { status } = props;
  return (
    <span className={`image-placeholder image-placeholder--${status}`} aria-hidden>
      <PathIcon
        className="image-placeholder__icon"
        viewBox={IMAGE_GLYPH_VIEWBOX}
        paths={IMAGE_GLYPH_PATHS}
        circles={IMAGE_GLYPH_CIRCLES}
        fill="none"
        stroke="currentColor"
        strokeWidth={IMAGE_GLYPH_STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      />
      {status === 'broken' ? (
        <span className="image-placeholder__badge">
          <Glyph name="close" className="image-placeholder__cross" strokeWidth={BROKEN_BADGE_STROKE} focusable="false" />
        </span>
      ) : null}
    </span>
  );
};

export { ImagePlaceholder };
