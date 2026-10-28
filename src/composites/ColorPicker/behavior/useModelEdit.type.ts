/* @layer renderer-components @kind types */
interface ModelEditInput<M> {
  value: string;
  onChange: (hex: string) => void;
  toModel: (hex: string) => M;
  toHex: (model: M) => string;
}

interface ModelEdit<M> {
  model: M;
  edit: (patch: Partial<M>) => void;
}

export type { ModelEdit, ModelEditInput };
