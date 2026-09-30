/* @layer renderer-components @kind component */
import { Glyph } from '../../Glyph';
import type { ComboboxChipProps } from './ComboboxChip.type';

const ComboboxChip = (props: ComboboxChipProps) => {
  const { label, removable, onRemove } = props;
  return (
    <span className="combobox__chip">
      <span className="combobox__chip-label">{label}</span>
      {removable && (
        <button type="button" className="combobox__chip-remove" tabIndex={-1} aria-label={`Remove ${label}`} onClick={onRemove}>
          <Glyph name="close" size={12} />
        </button>
      )}
    </span>
  );
};

export { ComboboxChip };
