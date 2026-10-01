/* @layer renderer-components @kind component */
import './DropZone.css';
import { Glyph } from '../Glyph';
import { Span } from '../text-elements';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import type { DropZoneProps } from './DropZone.type';
import { acceptAttribute } from './behavior/accept-list';
import { dropZoneClass } from './behavior/drop-zone-class';
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
    icon,
    onDrop,
  } = props;
  const zone = useDropZone(accept, onDrop);
  const inline = variant === 'inline';

  return (
    <div
      className={dropZoneClass(inline, zone.active, disabled)}
      onDragEnter={zone.handleDragEnter}
      onDragLeave={zone.handleDragLeave}
      onDragOver={zone.handleDragOver}
      onDrop={zone.handleDrop}
      onClick={zone.handleClick}
      {...(inline ? { role: 'button', tabIndex: disabled ? -1 : 0, title: hint, onKeyDown: zone.handleKeyDown } : {})}
    >
      <span className="dropzone__icon" aria-hidden={inline || undefined}>{icon ?? <Glyph name="box" />}</span>
      <Span className="dropzone__label">{label}</Span>
      {!inline && <DropZoneHints hint={hint} />}
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
