/* @layer stories @kind component */
import { Box, CodeBlock, Text } from '../../../src/primitives';
import { PROVIDER_SETUP_CODE } from './provider-setup-code';
import './ProviderPart.css';

const FullSetup = () => (
  <Box className="provider-part">
    <Text as="p" className="provider-part__note">
      Every override in one place. Keep the object a module constant. A provider inside another one keeps the outer overrides and replaces only the ones it names.
    </Text>
    <CodeBlock code={PROVIDER_SETUP_CODE} language="tsx" showLineNumbers copyable />
  </Box>
);

export { FullSetup };
