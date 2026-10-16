/* @layer stories @kind types */
type PreviewCardTone = 'neutral' | 'success' | 'warning' | 'info';

interface PreviewCardEntry {
  name: string;
  text: string;
  badge: string;
  tone?: PreviewCardTone;
}

interface PreviewCardsProps {
  entries: readonly PreviewCardEntry[];
}

export type { PreviewCardEntry, PreviewCardsProps };
