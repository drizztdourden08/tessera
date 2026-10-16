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
}

export type { SpriteStudioSampleProps, StudioActionProps };
