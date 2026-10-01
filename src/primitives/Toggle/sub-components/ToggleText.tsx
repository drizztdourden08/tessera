/* @layer renderer-components @kind component */
import { Glyph } from '../../Glyph';
import { Link } from '../../Link';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import { Small, Span } from '../../text-elements';
import type { ToggleTextProps } from '../Toggle.type';

const ToggleText = (props: ToggleTextProps) => {
  const { label, description, link } = props;
  const { fields } = useTesseraStrings();
  if (![label, description].some(Boolean)) return null;
  return (
    <span className="toggle__text">
      {label && <Span className="toggle__label">{label}</Span>}
      {description && (
        <Small tone="dim" className="toggle__description">
          {description}
          {link && (
            <Link
              className="toggle__link"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title={fields.learnMore}
            >
              <Glyph name="external" size={12} />
            </Link>
          )}
        </Small>
      )}
    </span>
  );
};

export { ToggleText };
