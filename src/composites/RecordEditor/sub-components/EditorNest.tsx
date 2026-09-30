/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import { Span } from '../../../primitives/text-elements';
import { kitFor } from '../behavior/kit-for';
import { EditorRow } from './EditorRow';
import { FieldLabel } from './FieldLabel';
import { PositionFieldEditor } from './PositionFieldEditor';
import type { EditorNestProps } from './EditorNest.type';

const EditorNest = ({ field, value, plan, pair, binding, depth }: EditorNestProps) => (
  <Box className="record-editor__nest" data-depth={depth}>
    <Span tone="dim" className="record-editor__nest-label"><FieldLabel field={field} /></Span>
    {plan.note != null && <Text variant="caption" className="record-editor__note">{plan.note}</Text>}
    {pair && <PositionFieldEditor field={field} pair={pair} binding={binding} />}
    {plan.fields.length > 0 && (
      <Box className="record-editor__nested">
        {plan.fields.map((child) => (
          <EditorRow key={child.path} field={child} binding={binding} depth={depth + 1} />
        ))}
      </Box>
    )}
    {!pair && plan.fields.length === 0 && (
      <Box className="record-editor__fallback">{kitFor(field.kind).renderCell(value, field)}</Box>
    )}
  </Box>
);

export { EditorNest };
