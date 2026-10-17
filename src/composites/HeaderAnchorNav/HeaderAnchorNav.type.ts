/* @layer renderer-components @kind types */
interface HeaderAnchorNavItem {
  id: string;
  label: string;
  badge?: string | number;
}

interface HeaderAnchorNavProps {
  items: readonly HeaderAnchorNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  ariaLabel: string;
  hideZero?: boolean;
  className?: string;
}

export type { HeaderAnchorNavItem, HeaderAnchorNavProps };
