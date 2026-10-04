/* @layer renderer-components @kind types */
interface FormGroupTab {
  id: string;
  label: string;
  count: number;
  changed?: number;
}

interface FormGroupTabsProps {
  tabs: readonly FormGroupTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  query?: string;
  onQueryChange?: (query: string) => void;
  searchPlaceholder?: string;
  advanced?: boolean;
  onAdvancedChange?: (shown: boolean) => void;
  advancedCount?: number;
  className?: string;
}

export type { FormGroupTab, FormGroupTabsProps };
