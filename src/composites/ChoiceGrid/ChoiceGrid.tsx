/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { choiceGroups } from './behavior/choice-groups';
import { useChoiceGrid } from './behavior/useChoiceGrid';
import { ChoiceSectionView } from './sub-components/ChoiceSectionView';
import './ChoiceGrid.css';
import type { ChoiceGridProps } from './ChoiceGrid.type';

const ChoiceGrid = <T extends string>(props: ChoiceGridProps<T>) => {
  const { label, value, onChange, cells, sections, columns, role = 'radiogroup', pickOnRelease = false, renderCell, footer, className = '' } = props;
  const groups = choiceGroups(cells, sections);
  const grid = useChoiceGrid({ groups, value, columns, role, pickOnRelease, onChange });

  return (
    <Box className={className ? `choice-grid ${className}` : 'choice-grid'}>
      <Box ref={grid.rootRef} role={role} aria-label={label} className="choice-grid__groups" onKeyDown={grid.onKeyDown}>
        {groups.map((group) => (
          <ChoiceSectionView
            key={group.id}
            group={group}
            columns={columns}
            state={(entry) => ({ selected: grid.selected(entry), props: grid.cellProps(entry) })}
            renderCell={renderCell}
          />
        ))}
      </Box>
      {footer !== undefined && <Box className="choice-grid__footer">{footer}</Box>}
    </Box>
  );
};

export { ChoiceGrid };
