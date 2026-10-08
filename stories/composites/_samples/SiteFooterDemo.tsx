/* @layer stories @kind component */
import { Logo } from '../../../src/brand';
import { SiteFooter } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { FOOTER_LINKS, SITE_TEXT } from './site-samples.constants';
import type { SiteFooterArgs } from './site-story.type';

const SiteFooterDemo = (args: Partial<SiteFooterArgs>) => (
  <Box className={`site-story__header-frame${args.width === 'phone' ? ' site-story__header-frame--phone' : ''}`} data-palette="rotp">
    <SiteFooter
      logo={args.logo === false ? undefined : <Logo brand="rotp" size="sm" />}
      note={args.note === false ? undefined : SITE_TEXT.footerNote}
      links={args.links === false ? undefined : FOOTER_LINKS}
      navigate={() => undefined}
    />
  </Box>
);

export { SiteFooterDemo };
