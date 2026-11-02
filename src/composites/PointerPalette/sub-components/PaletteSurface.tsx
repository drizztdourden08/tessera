/* @layer renderer-components @kind component */
import { useMemo, useRef } from 'react';
import { Floating } from '../../../primitives/Floating';
import { ChoiceGrid } from '../../ChoiceGrid';
import { DEFAULT_COLUMNS } from '../PointerPalette.constants';
import type { PaletteSurfaceProps } from '../PointerPalette.type';
import { paletteAnchor } from '../behavior/palette-anchor';
import { paletteChoices } from '../behavior/palette-choices';
import { paletteItems } from '../behavior/palette-items';
import { useFocusEntry } from '../behavior/useFocusEntry';
import { useHold } from '../behavior/useHold';
import { usePaletteDismiss } from '../behavior/usePaletteDismiss';
import { PaletteCell } from './PaletteCell';

const PaletteSurface = (props: PaletteSurfaceProps) => {
  const { at, sections, value, columns = DEFAULT_COLUMNS, holding = false, label, className, origin, onPick, onClose } = props;
  const surface = useRef<HTMLDivElement>(null);
  const held = useHold(holding);
  const choices = useMemo(() => paletteChoices(sections), [sections]);
  const items = useMemo(() => paletteItems(sections), [sections]);
  const placement = paletteAnchor(at, { width: window.innerWidth, height: window.innerHeight });
  usePaletteDismiss(surface, onClose);
  useFocusEntry(surface, origin);

  return (
    <Floating ref={surface} placement={placement} className={className ? `pointer-palette ${className}` : 'pointer-palette'}>
      <ChoiceGrid
        label={label}
        role="listbox"
        value={value}
        sections={choices}
        columns={columns}
        pickOnRelease={held}
        onChange={(id) => {
          onPick(id);
          onClose();
        }}
        renderCell={(cell, state) => {
          const item = items.get(cell.value);
          return item ? <PaletteCell item={item} props={state.props} /> : null;
        }}
      />
    </Floating>
  );
};

export { PaletteSurface };
