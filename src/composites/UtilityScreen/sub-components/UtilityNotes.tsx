/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../../primitives/Box';
import { ScrollArea } from '../../../primitives/ScrollArea';
import { Text } from '../../../primitives/Text';
import type { UtilityNotesProps } from './UtilityNotes.type';

const UtilityNotes = (props: UtilityNotesProps) => {
  const { title, children } = props.notes;
  const titleId = useId();
  return (
    <Box as="section" className="utility-screen__notes" aria-labelledby={titleId}>
      <Text as="h3" id={titleId} className="utility-screen__notes-title">{title}</Text>
      <ScrollArea className="utility-screen__notes-body">{children}</ScrollArea>
    </Box>
  );
};

export { UtilityNotes };
