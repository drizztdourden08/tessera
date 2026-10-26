/* @layer stories @kind component */
import { Hero } from '../../../src/composites';
import { Box, Card, PageRoot, Text } from '../../../src/primitives';
import './ScrollingPage.css';

const SECTIONS = ['Randomizer', 'Race rooms', 'Seed library', 'Tracker', 'Community', 'Rules'];

const ScrollingPage = () => (
  <PageRoot className="scrolling-page">
    <Hero size="full" eyebrow="Relic of the Past" title="The page scrolls with the document" />
    <Box className="scrolling-page__sections">
      {SECTIONS.map((name) => (
        <Card key={name} title={name}>
          <Text>Scroll the window and this card moves with the page, not inside a pane.</Text>
        </Card>
      ))}
    </Box>
  </PageRoot>
);

export { ScrollingPage };
