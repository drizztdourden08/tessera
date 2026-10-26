/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { MarkdownEditorCounterProps } from '../MarkdownEditor.type';

const MarkdownEditorCounter = ({ count, max }: MarkdownEditorCounterProps) => {
  const { dynamicInput } = useTesseraStrings();
  return (
    <Span tone={count >= max ? 'warning' : 'muted'} className="markdown-editor__counter" aria-label={dynamicInput.counterLabel(count, max)}>
      {dynamicInput.counter(count, max)}
    </Span>
  );
};

export { MarkdownEditorCounter };
