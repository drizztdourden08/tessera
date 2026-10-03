/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { FieldControlContext } from '../../../primitives/field-control/field-control-context';
import { Glyph } from '../../../primitives/Glyph';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { COMPACT_CONTROL } from '../InlineCreateForm.constants';
import type { InlineCreateCompactRowProps } from './InlineCreateCompactRow.type';

const InlineCreateCompactRow = (props: InlineCreateCompactRowProps) => {
  const { ready, onSubmit, onCancel, submitLabel, cancelLabel, children } = props;
  const { common } = useTesseraStrings();
  const submit = submitLabel ?? common.create;
  const cancel = cancelLabel ?? common.cancel;
  return (
    <FieldControlContext.Provider value={COMPACT_CONTROL}>
      <Box className="inline-create-form__row">
        {children}
        <IconButton variant="primary" label={submit} title={submit} disabled={!ready} onClick={onSubmit}>
          <Glyph name="plus" size={13} strokeWidth={1.8} />
        </IconButton>
        {onCancel && (
          <IconButton label={cancel} title={cancel} onClick={onCancel}>
            <Glyph name="close" size={13} strokeWidth={1.8} />
          </IconButton>
        )}
      </Box>
    </FieldControlContext.Provider>
  );
};

export { InlineCreateCompactRow };
