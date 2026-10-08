/* @layer stories @kind component */
import { Logo } from '../../../../src/brand';
import { Box, Button, Card, Paragraph, Stack } from '../../../../src/primitives';
import { SiteFooter } from '../../SiteFooter/SiteFooter';
import { SiteHeader } from '../SiteHeader';
import { hookshopBrand } from './hookshop-brand';
import { FOOTER_LINKS, PUBLIC_LINKS, SITE_TEXT } from './site-samples.constants';
import type { SiteFrameProps } from './site-story.type';

const SignInPage = ({ phone = false }: SiteFrameProps) => (
  <Box className={`site-story__site${phone ? ' site-story__site--phone' : ''}`} data-palette="rotp">
    <SiteHeader brand={hookshopBrand()} links={PUBLIC_LINKS} activeId="home" navigate={() => undefined} />
    <Box className="site-story__center">
      <Card title={SITE_TEXT.signInTitle} className="site-story__gate">
        <Stack gap="sm" align="stretch">
          <Paragraph tone="dim">{SITE_TEXT.signIn}</Paragraph>
          {SITE_TEXT.providers.map((provider) => <Button key={provider} variant="secondary" fullWidth>{provider}</Button>)}
        </Stack>
      </Card>
    </Box>
    <SiteFooter brand={<Logo brand="rotp" size="sm" />} note={SITE_TEXT.footerNote} links={FOOTER_LINKS} navigate={() => undefined} />
  </Box>
);

export { SignInPage };
