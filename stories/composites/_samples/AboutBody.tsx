/* @layer stories @kind component */
import { FactsPanel } from '../../../src/composites';
import { Box, Button, SectionHeader, useCopy, useTesseraStrings } from '../../../src/primitives';
import { ABOUT_DEBUG, ABOUT_FACTS } from './about-facts';

const AboutBody = () => {
  const { copied, copy } = useCopy();
  const { common } = useTesseraStrings();
  return (
    <Box as="section" className="info-screen-story__section">
      <SectionHeader
        title="This build"
        action={<Button variant="secondary" size="sm" onClick={() => void copy(ABOUT_DEBUG)}>{copied ? common.copied : 'Copy debug info'}</Button>}
      />
      <FactsPanel label="This build" groups={ABOUT_FACTS} />
    </Box>
  );
};

export { AboutBody };
