/* @layer renderer-components @kind component */
import { HelpTip } from '../../field-control/HelpTip';
import { Link } from '../../Link';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import { Small, Span } from '../../text-elements';
import type { ToggleTextProps } from '../Toggle.type';

const ToggleText = (props: ToggleTextProps) => {
  const { label, labelId, description, help, link } = props;
  const { fields } = useTesseraStrings();
  if (![label, description].some(Boolean)) return null;
  const name = label ? <Span id={labelId} className="toggle__label">{label}</Span> : null;
  return (
    <span className="toggle__text">
      {name && labelId ? <span className="toggle__head">{name}<HelpTip help={help} /></span> : name}
      {description && (
        <Small tone="dim" className="toggle__description">
          {description}
          {link && (
            <Link
              className="toggle__link"
              href={link}
              external
              onClick={(e) => e.stopPropagation()}
              title={fields.learnMore}
              aria-label={fields.learnMore}
            />
          )}
        </Small>
      )}
    </span>
  );
};

export { ToggleText };
