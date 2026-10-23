/* @layer stories @kind component */
import { BRAND_FAMILY, BrandMark, PixelWordmark } from '../../../src/brand';
import { Box, Button, Card, Paragraph, Stack } from '../../../src/primitives';
import { GroundContext } from '../../../src/primitives/ground/ground-context';
import { SITE_TEXT } from './site-samples.constants';

const SiteSignIn = () => (
  <Box className="site-story__gate" data-palette="rotp">
    <Stack gap="sm" align="center">
      <GroundContext.Provider value="dark">
        <BrandMark app="rotp" size="xl" />
      </GroundContext.Provider>
      <PixelWordmark text={SITE_TEXT.wordmark} colors={BRAND_FAMILY.rotp.wordmark.colors} size="md" />
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
