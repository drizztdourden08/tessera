/* @layer stories @kind component */
import { Box, SectionHeader, Span } from '../../../src/primitives';
import type { PreviewListProps } from './preview-shared.type';

const PreviewList = ({ title, lines }: PreviewListProps) => (
  <Box className="preview-list">
    <SectionHeader title={title} level={4} />
    <Box as="ul" className="preview-list__lines">
      {lines.map((line) => <Box as="li" key={line}><Span>{line}</Span></Box>)}
    </Box>
  </Box>
);

export { PreviewList };
