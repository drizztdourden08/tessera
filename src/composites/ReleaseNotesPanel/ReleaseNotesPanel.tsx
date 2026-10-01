/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { ScrollArea } from '../../primitives/ScrollArea';
import { Text } from '../../primitives/Text';
import { Paragraph } from '../../primitives/text-elements';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ReleaseNotesPanelProps } from './ReleaseNotesPanel.type';
import './ReleaseNotesPanel.css';

const ReleaseNotesPanel = (props: ReleaseNotesPanelProps) => {
  const { panels } = useTesseraStrings();
  const { title = panels.releaseNotes, children, className = '' } = props;
  const body = typeof children === 'string'
    ? <Paragraph tone="dim" className="release-notes-panel__text">{children}</Paragraph>
    : children;

  return (
    <Box as="section" className={`release-notes-panel${className ? ` ${className}` : ''}`}>
      <Text as="h4" className="release-notes-panel__title">{title}</Text>
      <ScrollArea className="release-notes-panel__content">{body}</ScrollArea>
    </Box>
  );
};

export { ReleaseNotesPanel };
