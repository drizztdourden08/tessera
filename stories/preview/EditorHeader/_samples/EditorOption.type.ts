/* @layer stories @kind types */
type EditorOption = 'bar' | 'header' | 'foot';

interface PresetEditorPageProps {
  option: EditorOption;
  narrow?: boolean;
}

interface EditorPageBodyProps {
  withName?: { name: string; onChange: (name: string) => void; error?: string };
}

export type { EditorOption, EditorPageBodyProps, PresetEditorPageProps };
