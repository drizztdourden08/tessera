/* @layer stories @kind types */
interface ScriptToolsProps {
  count?: number;
  label?: string;
  compact?: boolean;
}

interface ScriptFrameProps {
  toolbar?: boolean;
  padded?: boolean;
}

export type { ScriptFrameProps, ScriptToolsProps };
