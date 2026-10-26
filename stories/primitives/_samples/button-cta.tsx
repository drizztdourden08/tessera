/* @layer stories @kind component */
import { Box, Button, Flex, Icon, Text } from '../../../src/primitives';
import { BUTTON_CTA_PALETTES } from './button-cta.constants';

const ButtonCta = () => (
  <Box className="story-column button-cta-demo">
    {BUTTON_CTA_PALETTES.map((palette) => (
      <Box key={palette} data-palette={palette} className="button-cta-demo__ground">
        <Text variant="caption">{palette}</Text>
        <Flex gap="md" align="center" wrap>
          <Button
            look="pixel"
            fill="solid"
            variant="primary"
            size="lg"
            icon={<Icon name="download" />}
            caption="v1.4.2, Windows 64-bit"
            href="#download"
            className="button-cta-demo__cta"
          >
            Download
          </Button>
          <Button look="pixel" fill="solid" variant="primary" size="lg" caption="v1.4.2, Windows 64-bit" href="#download" loading>Download</Button>
          <Button look="pixel" fill="solid" variant="primary" size="lg" caption="v1.4.2, Windows 64-bit" href="#download" disabled>Download</Button>
        </Flex>
        <Flex gap="md" align="center" wrap>
          <Button look="pixel" fill="solid" variant="primary">Press start</Button>
          <Button look="pixel" fill="solid" variant="primary" size="sm">Press start</Button>
          <Button look="pixel" fill="solid" variant="primary" size="xs">Press start</Button>
          <Button look="pixel" size="lg" variant="secondary">Press start</Button>
          <Button fill="solid" variant="primary" size="lg" caption="Free">Play</Button>
        </Flex>
      </Box>
    ))}
  </Box>
);

export { ButtonCta };
