/* @layer renderer-components @kind types */
interface OpenSetEntryProps {
  draft: string;
  label: string;
  disabled?: boolean;
  onDraft: (draft: string) => void;
  onCommit: () => void;
}

export type { OpenSetEntryProps };
