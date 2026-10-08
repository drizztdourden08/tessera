/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Link } from '../../primitives/Link';
import { Span } from '../../primitives/text-elements';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { SiteFooterProps } from './SiteFooter.type';
import './SiteFooter.css';

const SiteFooter = (props: SiteFooterProps) => {
  const { logo, note, links = [], navigate, label, className } = props;
  const { navigation } = useTesseraStrings();
  return (
    <Box as="footer" className={['site-footer', className].filter(Boolean).join(' ')}>
      <Box className="site-footer__lead">
        {logo}
        {note !== undefined && <Span tone="dim" className="site-footer__note">{note}</Span>}
      </Box>
      {links.length > 0 && (
        <Box as="nav" className="site-footer__links" aria-label={label ?? navigation.siteFooterLinks}>
          {links.map((link) => (
            <Link key={link.id} href={link.href} navigate={navigate} external={link.external} tone="secondary" variant="subtle" className="site-footer__link">
              {link.label}
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
};

export { SiteFooter };
