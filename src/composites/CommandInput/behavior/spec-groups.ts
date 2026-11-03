/* @layer renderer-components @kind logic */
import type { MenuGroup, MenuNode } from '../../DropdownMenu';
import type { CommandSpec } from '../CommandInput.type';

const specGroups = (specs: readonly CommandSpec[], onPick: (id: string) => void): MenuGroup[] => {
  const groups = new Map<string, MenuNode[]>();
  specs.forEach((spec) => {
    const items = groups.get(spec.group ?? '') ?? [];
    items.push({ id: spec.id, label: spec.label, icon: spec.icon, description: spec.description, onSelect: () => onPick(spec.id) });
    groups.set(spec.group ?? '', items);
  });
  return [...groups].map(([label, items]) => ({ id: `group-${label}`, label: label === '' ? undefined : label, items }));
};

export { specGroups };
