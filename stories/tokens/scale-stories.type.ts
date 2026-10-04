/* @layer stories @kind types */
type Specimen = 'shadow' | 'z' | 'duration' | 'easing' | 'transition';

interface ScaleStoriesParams {
  name: string;
  description: string;
  points: readonly string[];
  instead?: string;
  specimen: Specimen;
  tokens: readonly string[];
}

interface ScaleSampleProps {
  token: string;
  specimen: Specimen;
}

export type { ScaleSampleProps, ScaleStoriesParams, Specimen };
