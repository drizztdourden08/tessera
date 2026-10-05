/* @layer renderer-components @kind types */
interface ActionData<Tone extends string = string> {
  label: string;
  onSelect: () => void;
  tone?: Tone;
  disabled?: boolean;
  confirm?: string;
}

interface BackAction {
  onSelect: () => void;
  label?: string;
}

export type { ActionData, BackAction };
