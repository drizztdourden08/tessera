/* @layer stories @kind component */
import { Markdown } from '../../../src/composites';
import { Card, ScrollArea } from '../../../src/primitives';
import { LONG_NOTE } from './markdown-notes.constants';

const NarrowNoteDialog = () => (
  <Card title="What is new in 0.15.0" level={3} className="markdown-story__dialog">
    <ScrollArea className="markdown-story__dialog-body">
      <Markdown source={LONG_NOTE} size="sm" headingOffset={2} hideTitle />
    </ScrollArea>
  </Card>
);

export { NarrowNoteDialog };
