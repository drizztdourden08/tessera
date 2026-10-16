/* @layer renderer-components @kind types */
interface UseHighlightParams {
  onHighlight?: () => void;
  disabled?: boolean;
  active?: boolean;
}

interface HighlightHandlers {
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

type HighlightSource = 'pointer' | 'focus' | 'active';

export type { HighlightHandlers, HighlightSource, UseHighlightParams };
