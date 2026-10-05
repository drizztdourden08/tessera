/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { toSchemaIndex } from '../../../data/schema/build-schema';
import { DropdownMenu } from '../../DropdownMenu';
import { addFilterItems } from '../behavior/add-filter-items';
import { createClauseForField } from '../behavior/filter-clause-defaults';
import { useAnchorMenu } from '../behavior/useAnchorMenu';
import { FieldKindIcon } from './FieldKindIcon';
import type { AddFilterButtonProps } from './AddFilterButton.type';

const AddFilterButton = (props: AddFilterButtonProps) => {
  const { schema, fields, excludePaths = [], onAdd } = props;
  const menu = useAnchorMenu<HTMLButtonElement>('.dropdown-menu');
  const { filters, fieldKinds } = useTesseraStrings();
  const taken = useMemo(() => new Set(excludePaths), [excludePaths]);
  const items = addFilterItems(toSchemaIndex(schema).roots(), {
    fields,
    taken,
    onPick: (field) => {
      onAdd(createClauseForField(field));
      menu.close();
    },
    look: (field) => ({ icon: <FieldKindIcon kind={field.kind} />, description: fieldKinds[field.kind] }),
  });

  return (
    <>
      <Button
        ref={menu.anchorRef}
        variant="tertiary"
        size="sm"
        className="filter-bar__add"
        icon={<Icon name="plus" />}
        aria-haspopup="menu"
        aria-expanded={menu.open}
        aria-label={filters.addFilter}
        title={filters.addFilter}
        onClick={menu.toggle}
      >
        {excludePaths.length === 0 ? filters.addFilter : null}
      </Button>
      {menu.open && items.length > 0 && (
        <DropdownMenu groups={[{ id: 'fields', label: filters.filterBy, items }]} anchorRef={menu.anchorRef} onClose={menu.close} />
      )}
    </>
  );
};

export { AddFilterButton };
