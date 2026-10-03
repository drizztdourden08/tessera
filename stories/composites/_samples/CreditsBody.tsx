/* @layer stories @kind component */
import { Box, Card, SectionHeader, Span, Tag, Text } from '../../../src/primitives';
import { CREDITS } from './credits';

const CreditsBody = () => (
  <>
    {CREDITS.map((section) => (
      <Box as="section" key={section.id} className="info-screen-story__section">
        <SectionHeader title={section.title} />
        <Box className="info-screen-story__grid">
          {section.entries.map((entry) => (
            <Card key={entry.name} className="info-screen-story__entry">
              <Box className="info-screen-story__entry-head">
                <Text as="h4" className="info-screen-story__name">{entry.name}</Text>
                <Tag>{entry.usage}</Tag>
              </Box>
              <Span tone="muted">{entry.role}</Span>
            </Card>
          ))}
        </Box>
      </Box>
    ))}
  </>
);

export { CreditsBody };
