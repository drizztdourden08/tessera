/* @layer renderer-components @kind types */
interface HeaderTabItem {
  id: string;
  label: string;
  badge?: string | number;
}

interface HeaderTabsProps {
  items: readonly HeaderTabItem[];
  activeId: string;
  onSelect: (id: string) => void;
  ariaLabel: string;
  className?: string;
}

export type { HeaderTabItem, HeaderTabsProps };
