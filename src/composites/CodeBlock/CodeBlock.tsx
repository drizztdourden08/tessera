/* @layer renderer-components @kind component */
import { CodeView } from '../../primitives/code-view/CodeView';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { CopyButton } from '../CopyButton';
import type { CodeBlockProps } from './CodeBlock.type';
import './CodeBlock.css';

const CodeBlock = (props: CodeBlockProps) => {
  const { copyable = false, ...view } = props;
  const { fields } = useTesseraStrings();
  const copy = copyable ? <CopyButton text={view.code.trimEnd()} label={fields.copyCode} className="code-block__copy" /> : undefined;
  return <CodeView {...view} copy={copy} />;
};

export { CodeBlock };
