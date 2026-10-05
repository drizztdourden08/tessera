/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
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
        <Icon name="plus" size={glyph} className="inline-create-form__mark" />
      </IconButton>
      {onCancel && (
        <IconButton size={size} label={cancel} title={cancel} onClick={onCancel}>
          <Icon name="x" size={glyph} className="inline-create-form__mark" />
        </IconButton>
      )}
    </Box>
  );
};

export { InlineCreateCompactRow };
