/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { SearchInput } from '../../primitives/SearchInput';
import { Tabs } from '../../primitives/Tabs';
import { Toggle } from '../../primitives/Toggle';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { FormGroupTabsProps } from './FormGroupTabs.type';
import './FormGroupTabs.css';

const FormGroupTabs = (props: FormGroupTabsProps) => {
  const { tabs, activeTab, onTabChange, query, onQueryChange, searchPlaceholder, advanced = false, onAdvancedChange, advancedCount, className } = props;
  const { options } = useTesseraStrings();
  const placeholder = searchPlaceholder ?? options.searchOptions;
  const items = tabs.map((tab) => ({ id: tab.id, label: options.groupChanged(tab.label, tab.changed ?? 0), badge: tab.count }));
  return (
    <Box className={['form-group-tabs', className].filter(Boolean).join(' ')}>
      {(onQueryChange !== undefined || onAdvancedChange !== undefined) && (
        <Box className="form-group-tabs__tools">
          {onQueryChange && (
            <Box className="form-group-tabs__search">
              <SearchInput value={query ?? ''} onChange={onQueryChange} placeholder={placeholder} aria-label={placeholder} />
            </Box>
          )}
          {onAdvancedChange && (
            <Toggle checked={advanced} onChange={onAdvancedChange} label={options.showAdvanced(advancedCount)} />
          )}
        </Box>
      )}
      <Tabs tabs={items} activeTab={activeTab} onTabChange={onTabChange} />
    </Box>
  );
};

export { FormGroupTabs };
