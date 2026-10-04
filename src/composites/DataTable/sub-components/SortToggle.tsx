/* @layer renderer-components @kind component */
import { Glyph } from '../../../primitives/Glyph';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { CARETS } from './SortToggle.constants';
import type { SortToggleProps } from './SortToggle.type';

const SortToggle = ({ label, sortDir, onToggle }: SortToggleProps) => {
  const { table } = useTesseraStrings();

  return (
    <IconButton
      size="xs"
      className={sortDir ? 'data-table__sort' : 'data-table__sort data-table__sort--off'}
      label={table.sortByNamed(label)}
      onClick={onToggle}
    >
      <Glyph name={CARETS[sortDir ?? 'none']} />
    </IconButton>
  );
};

export { SortToggle };
