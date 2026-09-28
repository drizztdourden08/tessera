/* @layer renderer-components @kind component */
import { Pressable } from '../../../primitives/Pressable';
import { Text } from '../../../primitives/Text';
import { Glyph } from '../../../primitives/Glyph';
import { CARETS } from './SortToggle.constants';
import type { SortToggleProps } from './SortToggle.type';

const SortToggle = ({ label, sortDir, onToggle }: SortToggleProps) => (
  <Pressable className="data-table__sort" aria-label={`Sort by ${label}`} onClick={onToggle}>
    <Text className={sortDir ? 'data-table__caret' : 'data-table__caret data-table__caret--off'}>
      <Glyph name={CARETS[sortDir ?? 'none']} />
    </Text>
  </Pressable>
);

export { SortToggle };
