/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { Floating } from '../../../primitives/Floating';
import { Glyph } from '../../../primitives/Icon';
import { Portal, useAnchorTracking } from '../../../primitives/Portal';
import { toSchemaIndex } from '../../../data/schema/build-schema';
import { createClauseForField } from '../behavior/filter-clause-defaults';
import { useAnchorMenu } from '../behavior/useAnchorMenu';
import { FieldPicker } from '../../DataTable';
import type { AddFilterButtonProps } from './AddFilterButton.type';
import '../../../theme/filter-bar.css';

const AddFilterButton = (props: AddFilterButtonProps) => {
  const { schema, excludePaths, onAdd } = props;
  const menu = useAnchorMenu<HTMLButtonElement>('.filter-bar__add-picker');
  const index = toSchemaIndex(schema);

  const { position: pos } = useAnchorTracking({
    active: menu.open,
    anchorRef: menu.anchorRef,
    compute: (rect) => ({ top: rect.bottom, left: rect.left }),
    onOutOfView: menu.close,
  });

  const handlePick = (path: string): void => {
    const field = index.byPath(path);
    if (!field) return;
    onAdd(createClauseForField(field));
    menu.close();
  };

  return (
    <>
      <Button
        ref={menu.anchorRef}
        variant="tertiary"
        size="sm"
        className="filter-bar__add"
        aria-haspopup="menu"
        aria-expanded={menu.open}
        onClick={menu.toggle}
      >
        <Glyph name="plus" /> Add filter
      </Button>
      {menu.open && (
        <Portal layer="overlay">
          <Floating className="filter-bar__add-picker" placement={pos}>
            <FieldPicker schema={index.roots()} excludePaths={excludePaths} onPick={handlePick} />
          </Floating>
        </Portal>
      )}
    </>
  );
};

export { AddFilterButton };
