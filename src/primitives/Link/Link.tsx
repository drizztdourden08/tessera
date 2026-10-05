/* @layer renderer-components @kind component */
import { Icon } from '../Icon';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { navigateClick } from './behavior/navigate-click';
import { EXTERNAL_LINK } from './Link.constants';
import type { LinkProps } from './Link.type';
import './Link.css';

const Link = (props: LinkProps) => {
  const { tone = 'primary', variant = 'inline', external = false, navigate, onClick, className, children, ...rest } = props;
  const { navigation } = useTesseraStrings();
  return (
    <a {...(external ? EXTERNAL_LINK : undefined)} {...rest} onClick={navigateClick(rest.href, navigate, onClick)} className={className ? `link ${className}` : 'link'} data-tone={tone} data-variant={variant}>
      {children}
      {external && (
        <Icon
          name="external-link"
          size={12}
          className={children ? 'link__external link__external--spaced' : 'link__external'}
          label={navigation.opensInNewTab}
        />
      )}
    </a>
  );
};

export { Link };
