/* @layer stories @kind component */
import { Box, Button, Icon } from '../../../src/primitives';
import { BUTTON_CTA_PALETTES } from './button-cta.constants';
import { CtaGround } from './cta-ground';

const ButtonGradient = () => (
  <Box className="story-column button-cta-demo">
    {BUTTON_CTA_PALETTES.map((palette) => (
      <CtaGround key={palette} palette={palette}>
        <Button
          variant="primary"
          fill="gradient"
          size="lg"
          width="wide"
          icon={<Icon name="download" />}
          caption="v1.4.2, Windows 64-bit"
          href="#download"
        >
          Download
        </Button>
      </CtaGround>
    ))}
  </Box>
);

export { ButtonGradient };
