/* @layer stories @kind component */
import { Box, Card, Paragraph, Status } from '../../../src/primitives';
import type { PreviewCardsProps } from './preview-card.type';
import './PreviewCards.css';

const PreviewCards = ({ entries }: PreviewCardsProps) => (
  <Box className="preview-cards">
    {entries.map((entry) => (
      <Card
        key={entry.name}
        title={entry.name}
        tone={entry.tone ?? 'neutral'}
        actions={<Status tone={entry.tone ?? 'neutral'} variant="pill">{entry.badge}</Status>}
      >
        <Paragraph tone="dim" className="preview-cards__text">{entry.text}</Paragraph>
      </Card>
    ))}
  </Box>
);

export { PreviewCards };
