/* @layer stories @kind component */
import { BRAND_FAMILY, BrandMark, PixelWordmark } from '../../../src/brand';
import { Box, Button, Card, Paragraph, Stack } from '../../../src/primitives';
import { SITE_TEXT } from './site-samples.constants';
import type { SignInPageProps } from './site-story.type';

const SiteSignIn = ({ ground }: SignInPageProps) => (
  <Box className={`site-story__gate site-story__gate--${ground}`} data-palette="rotp">
    <Stack gap="sm" align="center">
      <BrandMark app="rotp" size="xl" ground={ground} />
      <PixelWordmark text={SITE_TEXT.wordmark} colors={BRAND_FAMILY.rotp.wordmark.colors} size="md" rim={ground === 'light' ? 'dark' : 'none'} />
    </Stack>
    <Card title={SITE_TEXT.signInTitle} className="site-story__gate-card">
      <Stack gap="sm" align="stretch">
        <Paragraph tone="dim">{SITE_TEXT.signIn}</Paragraph>
        {SITE_TEXT.providers.map((provider) => <Button key={provider} variant="secondary" fullWidth>{provider}</Button>)}
      </Stack>
    </Card>
  </Box>
);

export { SiteSignIn };
