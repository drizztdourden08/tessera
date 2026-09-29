/* @layer renderer-components @kind component */
import { Portal } from '../../Portal';
import { ScrollArea } from '../../ScrollArea';
import { SelectOptionList } from './SelectOptionList';
import type { SelectPanelProps } from './SelectPanel.type';

const SelectPanel = (props: SelectPanelProps) => {
  const { dropdown, searchable, inline, value, groups, allOptions, renderOption } = props;
  const { pos } = dropdown;

  const panel = (
    <div
      ref={dropdown.contentRef}
      className={`select-content${inline ? ' select-content--inline' : ''}`}
      data-drop-up={pos?.dropUp ? 'true' : undefined}
      style={pos ? { top: pos.top, left: pos.left, width: pos.width } : undefined}
      role="listbox"
      onKeyDown={dropdown.handleKeyDown}
    >
      {searchable && (
        <div className="select-search">
          <input
            ref={dropdown.searchRef}
            className="select-search__input"
            type="text"
            placeholder="Search..."
            value={dropdown.search}
            onChange={(e) => { dropdown.setSearch(e.target.value); dropdown.setHighlightIdx(0); }}
            onKeyDown={dropdown.handleKeyDown}
          />
        </div>
      )}

      <ScrollArea className="select-content__list">
        <SelectOptionList
          dropdown={dropdown}
          value={value}
          groups={groups}
          allOptions={allOptions}
          renderOption={renderOption}
        />
      </ScrollArea>
    </div>
  );

  return inline ? panel : <Portal layer="popover">{panel}</Portal>;
};

export { SelectPanel };
