/* @layer renderer-components @kind component */
import { CodeView } from '../../primitives/code-view/CodeView';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { CopyButton } from '../CopyButton';
import type { CodeBlockProps } from './CodeBlock.type';
import { CodeEditor } from './sub-components/CodeEditor';
import './CodeBlock.css';

const CodeBlock = (props: CodeBlockProps) => {
  const { fields } = useTesseraStrings();
  if (props.editable === true) return <CodeEditor {...props} />;
  const copy = props.copyable === true ? <CopyButton text={props.code.trimEnd()} label={fields.copyCode} className="code-block__copy" /> : undefined;
  return <CodeView {...props} copy={copy} />;
};

export { CodeBlock };
