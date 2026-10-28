/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DropdownMenu } from '../../DropdownMenu';
import { overflowItems } from '../behavior/overflow-items';
import { useAnchorMenu } from '../behavior/useAnchorMenu';
import type { FilterOverflowProps } from './FilterOverflow.type';

const FilterOverflow = (props: FilterOverflowProps) => {
  const { folded, index, onRemove } = props;
  const menu = useAnchorMenu<HTMLButtonElement>('.dropdown-menu');
  const { filters } = useTesseraStrings();
  const items = overflowItems({ folded, index, strings: filters, onRemove });

  return (
    <>
      <Button
        ref={menu.anchorRef}
        variant="tertiary"
        size="sm"
        className="filter-bar__add filter-bar__more"
        aria-haspopup="menu"
        aria-expanded={menu.open}
        aria-label={filters.moreFilters(folded.length)}
        title={filters.moreFilters(folded.length)}
        onClick={menu.toggle}
      >
        {`+${String(folded.length)}`}
      </Button>
      {menu.open && items.length > 0 && (
        <DropdownMenu groups={[{ id: 'folded', items }]} anchorRef={menu.anchorRef} onClose={menu.close} />
      )}
    </>
  );
};

export { FilterOverflow };
