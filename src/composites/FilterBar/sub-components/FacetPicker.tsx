/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { Checkbox } from '../../../primitives/Checkbox';
import { Anchored } from '../../../primitives/Anchored';
import { Glyph } from '../../../primitives/Glyph';
import { useAnchorTracking } from '../../../primitives/Portal';
import { useAnchorMenu } from '../behavior/useAnchorMenu';
import type { FacetPickerProps } from './FacetPicker.type';
import '../../../theme/filter-bar.css';

const FacetPicker = ({ facet }: FacetPickerProps) => {
  const menu = useAnchorMenu<HTMLButtonElement>('.filter-bar__facet-panel');

  const { position: pos } = useAnchorTracking({
    active: menu.open,
    anchorRef: menu.anchorRef,
    compute: (rect, view) => ({ top: rect.bottom, right: view.innerWidth - rect.right }),
    onOutOfView: menu.close,
  });

  return (
    <>
      <Button
        ref={menu.anchorRef}
        variant="tertiary"
        size="sm"
        className="filter-bar__facet-trigger"
        aria-haspopup="menu"
        aria-expanded={menu.open}
        onClick={menu.toggle}
      >
        {facet.label} <Glyph name="chevronDown" />
      </Button>
      {menu.open && (
        <Anchored anchorRef={menu.anchorRef} placement="bottom-end" layer="overlay" fallback={pos} className="filter-bar__facet-panel">
            {facet.options.map((option) => (
              <Checkbox
                key={option.id}
                size="sm"
                className="filter-bar__facet-row"
                checked={!facet.hidden.has(option.id)}
                onChange={() => facet.onToggle(option.id)}
                label={option.label}
              />
            ))}
        </Anchored>
      )}
    </>
  );
};

export { FacetPicker };
