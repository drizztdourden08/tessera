/* @layer renderer-components @kind component */
import { Glyph } from '../Glyph';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { EXTERNAL_LINK } from './Link.constants';
import type { LinkProps } from './Link.type';
import './Link.css';

const Link = (props: LinkProps) => {
  const { tone = 'primary', variant = 'inline', external = false, className, children, ...rest } = props;
  const { navigation } = useTesseraStrings();
  return (
    <a {...(external ? EXTERNAL_LINK : undefined)} {...rest} className={className ? `link ${className}` : 'link'} data-tone={tone} data-variant={variant}>
      {children}
      {external && (
        <Glyph
          name="external"
          size={12}
          className={children ? 'link__external link__external--spaced' : 'link__external'}
          role="img"
          aria-hidden={false}
          aria-label={navigation.opensInNewTab}
        />
      )}
    </a>
  );
};

export { Link };
