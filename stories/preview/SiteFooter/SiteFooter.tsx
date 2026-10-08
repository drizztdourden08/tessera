/* @layer stories @kind component */
import { Box, Link, Span } from '../../../src/primitives';
import { SITE_FOOTER_STRINGS } from './site-footer-strings.constants';
import type { SiteFooterProps } from './SiteFooter.type';
import './SiteFooter.css';

const SiteFooter = (props: SiteFooterProps) => {
  const { brand, note, links = [], navigate, label = SITE_FOOTER_STRINGS.links, className } = props;
  return (
    <Box as="footer" className={['site-footer', className].filter(Boolean).join(' ')}>
      <Box className="site-footer__lead">
        {brand}
        {note !== undefined && <Span tone="dim" className="site-footer__note">{note}</Span>}
      </Box>
      {links.length > 0 && (
        <Box as="nav" className="site-footer__links" aria-label={label}>
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
