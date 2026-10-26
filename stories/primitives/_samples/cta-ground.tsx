/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Box, Text } from '../../../src/primitives';

const CtaGround = ({ palette, children }: { palette: string; children: ReactNode }) => (
  <Box data-palette={palette} className="button-cta-demo__ground">
    <Text variant="caption">{palette}</Text>
    {children}
  </Box>
);

export { CtaGround };
