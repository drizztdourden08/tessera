/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { counterShown } from '../behavior/counter-shown';
import { counterTone } from '../behavior/counter-tone';
import type { MarkdownEditorCounterProps } from '../MarkdownEditor.type';

const MarkdownEditorCounter = ({ value, max, count }: MarkdownEditorCounterProps) => {
  const { dynamicInput } = useTesseraStrings();
  const counted = count ? count(value) : value.length;
  if (!counterShown(counted, max)) return null;
  return (
    <Span tone={counterTone(counted, max)} className="markdown-editor__counter" aria-label={dynamicInput.counterLabel(counted, max)}>
      {dynamicInput.counter(counted, max)}
    </Span>
  );
};

export { MarkdownEditorCounter };
