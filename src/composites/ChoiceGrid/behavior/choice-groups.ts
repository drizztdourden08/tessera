/* @layer renderer-components @kind logic */
import type { ChoiceCell, ChoiceSection } from '../ChoiceGrid.type';
import { FLAT_ID } from './choice-groups.constants';
import type { ChoiceGroup } from './choice-layout.type';

const choiceGroups = <T extends string>(cells: readonly ChoiceCell<T>[] | undefined, sections: readonly ChoiceSection<T>[] | undefined): ChoiceGroup<T>[] => {
  const source: readonly Pick<ChoiceSection<T>, 'id' | 'label' | 'cells'>[] = sections ?? [{ id: FLAT_ID, cells: cells ?? [] }];
  let index = 0;
  return source.map((section) => ({
    id: section.id,
    label: section.label,
    entries: section.cells.map((cell, position) => {
      const entry = { cell, index, position };
      index += 1;
      return entry;
    }),
  }));
};

export { choiceGroups };
