/* @layer renderer-components @kind component */
import { useRef, useState } from 'react';
import { ColorSwatch } from '../../../primitives/ColorSwatch';
import { Span } from '../../../primitives/text-elements';
import { ColorPickerPopover } from '../../ColorPickerPopover';
import type { SettingsColorProps } from './SettingsColor.type';

const SettingsColor = (props: SettingsColorProps) => {
  const { value, onChange, label, disabled, strings } = props;
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <Span ref={anchorRef} className="settings-row__color">
      <Span className="settings-row__code">{value}</Span>
      <ColorSwatch color={value} disabled={disabled} aria-label={strings.pickColour(label)} aria-expanded={open} onClick={() => setOpen(!open)} />
      <ColorPickerPopover open={open} anchorRef={anchorRef} value={value} onChange={onChange} onClose={() => setOpen(false)} title={label} disableAlpha />
    </Span>
  );
};

export { SettingsColor };
