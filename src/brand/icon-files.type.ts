/* @layer renderer-components @kind types */
type IconArtKind = 'icon' | 'mark' | 'mascot';

interface IconSizes {
  ladder: readonly number[];
  ico: readonly number[];
  crisp: readonly number[];
}

interface IconArtFiles {
  kind: IconArtKind;
  label: string;
  ladder: (size: number) => string;
  ico: string | null;
}

export type { IconArtFiles, IconArtKind, IconSizes };
