/* @layer stories @kind component */
import { Box, Button, Flex, Text } from '../../../src/primitives';
import type { ButtonVariant } from '../../../src/primitives/Button/Button.type';
import { BUTTON_PIXEL_PALETTES, BUTTON_PIXEL_VARIANTS } from './button-pixel.constants';

const PixelRow = (props: { variant: ButtonVariant }) => {
  const { variant } = props;
  return (
    <Flex gap="md" align="center" wrap>
      <Button look="pixel" variant={variant}>Press start</Button>
      <Button look="pixel" variant={variant} loading>Press start</Button>
      <Button look="pixel" variant={variant} disabled>Press start</Button>
      <Button look="pixel" variant={variant} size="lg">Press start</Button>
      <Button look="pixel" variant={variant} size="sm">Press start</Button>
      <Button look="pixel" variant={variant} size="xs">Press start</Button>
    </Flex>
  );
};

const ButtonPixel = () => (
  <Box className="story-column button-pixel-demo">
    {BUTTON_PIXEL_PALETTES.map((palette) => (
      <Box key={palette} data-palette={palette} className="button-pixel-demo__ground">
        <Text variant="caption">{palette}</Text>
        {BUTTON_PIXEL_VARIANTS.map((variant) => <PixelRow key={variant} variant={variant} />)}
      </Box>
    ))}
  </Box>
);

export { ButtonPixel };
