/* @layer stories @kind component */
import { CodeBlock } from '../../../src/composites';
import type { JsonText } from './json-text.type';

const JsonField = ({ json, label }: { json: JsonText; label?: string }) => (
  <CodeBlock editable language="json" value={json.text} onChange={json.edit} invalid={json.problem !== null} problemLine={json.problem?.line} aria-label={label} />
);

export { JsonField };
