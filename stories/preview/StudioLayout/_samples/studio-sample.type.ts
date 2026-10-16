/* @layer stories @kind types */
interface StudioActionProps {
  label: string;
  hint: string;
  primary?: boolean;
}

interface SpriteStudioSampleProps {
  folded?: boolean;
}

export type { SpriteStudioSampleProps, StudioActionProps };
