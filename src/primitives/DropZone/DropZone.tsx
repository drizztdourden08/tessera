/* @layer renderer-components @kind component */
import '../../theme/control-size.css';
import './DropZone.css';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import { useControlSize } from '../field-control/useControlSize';
import { Glyph } from '../Glyph';
import { Span } from '../text-elements';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import type { DropZoneProps } from './DropZone.type';
import { acceptAttribute } from './behavior/accept-list';
import { dropZoneClass } from './behavior/drop-zone-class';
import { inlineButtonProps } from './behavior/inline-button-props';
import { useDropZone } from './behavior/useDropZone';
import { DropZoneHints } from './sub-components/DropZoneHints';

const DropZone = (props: DropZoneProps) => {
  const { fields } = useTesseraStrings();
  const {
    accept,
    label = fields.dropFiles,
    hint,
    disabled = false,
    variant = 'block',
    size,
    icon,
    status,
    onDrop,
  } = props;
  const zone = useDropZone(accept, !disabled, onDrop);
  const controlSize = useControlSize(size);
  const { invalid } = useFieldControl();
  const inline = variant === 'inline';

  return (
    <div
      ref={zone.zoneRef}
      className={dropZoneClass(controlSize, { inline, active: zone.active, disabled, status: status?.tone })}
      data-invalid={invalid ? '' : undefined}
      {...zone.dragHandlers}
      {...zone.pasteHandlers}
      onClick={zone.handleClick}
      {...inlineButtonProps(inline, disabled, hint, zone.handleKeyDown)}
    >
      <span className="dropzone__icon" aria-hidden={inline || undefined}>{icon ?? <Glyph name="box" />}</span>
      <Span className="dropzone__label">{label}</Span>
      {!inline && <DropZoneHints hint={hint} status={status} />}
      <input
        ref={zone.inputRef}
        type="file"
        accept={acceptAttribute(accept)}
        style={{ display: 'none' }}
        onChange={zone.handleFileInput}
      />
    </div>
  );
};

export {
  DropZone,
};
