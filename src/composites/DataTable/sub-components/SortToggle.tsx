/* @layer renderer-components @kind component */
import { Glyph } from '../../../primitives/Glyph';
import { Icon } from '../../../primitives/Icon';
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
      {sortDir ? <Icon name={CARETS[sortDir]} /> : <Glyph name="sortBoth" />}
    </IconButton>
  );
};

export { SortToggle };
