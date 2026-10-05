/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import {
  BROKEN_BADGE_STROKE,
  BROKEN_CROSS_PATHS,
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
      <Icon
        className="image-placeholder__icon"
        path={{ d: IMAGE_GLYPH_PATHS, circles: IMAGE_GLYPH_CIRCLES, viewBox: IMAGE_GLYPH_VIEWBOX }}
        fill="none"
        stroke="currentColor"
        strokeWidth={IMAGE_GLYPH_STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      />
      {status === 'broken' ? (
        <span className="image-placeholder__badge">
          <Icon
            className="image-placeholder__cross"
            path={{ d: BROKEN_CROSS_PATHS }}
            fill="none"
            stroke="currentColor"
            strokeWidth={BROKEN_BADGE_STROKE}
            strokeLinecap="round"
            strokeLinejoin="round"
            focusable="false"
          />
        </span>
      ) : null}
    </span>
  );
};

export { ImagePlaceholder };
