/* @layer stories @kind types */
interface StudioActionProps {
  label: string;
  hint: string;
  primary?: boolean;
}

interface SpriteStudioSampleProps {
  folded?: boolean;
  bar?: boolean;
  resizable?: boolean;
  compact?: boolean;
}

interface SpriteViewSwitchProps {
  value: string;
  onChange: (value: string) => void;
}

export type { SpriteStudioSampleProps, SpriteViewSwitchProps, StudioActionProps };
