/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Glyph } from '../../../primitives/Glyph';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { COMPACT_GLYPH_SIZES } from '../InlineCreateForm.constants';
import type { InlineCreateCompactRowProps } from './InlineCreateCompactRow.type';

const InlineCreateCompactRow = (props: InlineCreateCompactRowProps) => {
  const { ready, size, onSubmit, onCancel, submitLabel, cancelLabel, children } = props;
  const { common } = useTesseraStrings();
  const submit = submitLabel ?? common.create;
  const cancel = cancelLabel ?? common.cancel;
  const glyph = COMPACT_GLYPH_SIZES[size];
  return (
    <Box className="inline-create-form__row">
      {children}
      <IconButton variant="primary" size={size} label={submit} title={submit} disabled={!ready} onClick={onSubmit}>
        <Glyph name="plus" size={glyph} strokeWidth={1.8} />
      </IconButton>
      {onCancel && (
        <IconButton size={size} label={cancel} title={cancel} onClick={onCancel}>
          <Glyph name="close" size={glyph} strokeWidth={1.8} />
        </IconButton>
      )}
    </Box>
  );
};

export { InlineCreateCompactRow };
