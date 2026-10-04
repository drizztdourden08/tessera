/* @layer stories @kind component */
import { CopyButton, FactsPanel } from '../../../src/composites';
import { Box, SectionHeader } from '../../../src/primitives';
import { ABOUT_DEBUG, ABOUT_FACTS } from './about-facts';

const AboutBody = () => (
  <Box as="section" className="info-screen-story__section">
    <SectionHeader
      title="This build"
      action={<CopyButton text={ABOUT_DEBUG} label="Copy debug info" showLabel variant="secondary" />}
    />
    <FactsPanel label="This build" groups={ABOUT_FACTS} />
  </Box>
);

export { AboutBody };
