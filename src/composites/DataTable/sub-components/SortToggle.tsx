/* @layer renderer-components @kind component */
import { Pressable } from '../../../primitives/Pressable';
import { Text } from '../../../primitives/Text';
import { Glyph } from '../../../primitives/Glyph';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { CARETS } from './SortToggle.constants';
import type { SortToggleProps } from './SortToggle.type';

const SortToggle = ({ label, sortDir, onToggle }: SortToggleProps) => {
  const { table } = useTesseraStrings();

  return (
    <Pressable className="data-table__sort" aria-label={table.sortByNamed(label)} onClick={onToggle}>
      <Text className={sortDir ? 'data-table__caret' : 'data-table__caret data-table__caret--off'}>
        <Glyph name={CARETS[sortDir ?? 'none']} />
      </Text>
    </Pressable>
  );
};

export { SortToggle };
