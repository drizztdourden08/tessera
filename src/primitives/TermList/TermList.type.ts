/* @layer renderer-components @kind types */
interface TermListItem {
  term: string;
  detail: string;
}

interface TermListProps {
  items: readonly TermListItem[];
  className?: string;
}

export type { TermListItem, TermListProps };
