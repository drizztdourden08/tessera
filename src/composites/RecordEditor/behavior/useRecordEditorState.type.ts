/* @layer renderer-components @kind types */
interface RecordEditorStateParams<T> {
  record: T;
  onSave?: (next: T) => Promise<void>;
}

export type { RecordEditorStateParams };
