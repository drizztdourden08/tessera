/* @layer renderer-components @kind types */
type ArmedIconName = 'load-state' | 'save-state' | 'trash-2';

type ArmedIconPartName = 'platform' | 'ripple' | 'streaks' | 'arrow' | 'lid' | 'can';

interface ArmedIconPart {
  part: ArmedIconPartName;
  d: readonly string[];
  thin?: boolean;
  armedOnly?: boolean;
}

type ArmedIconDrawing = readonly ArmedIconPart[];

interface ArmedIconProps {
  name: ArmedIconName;
  armed?: boolean;
  size?: number | string;
  className?: string;
}

export type { ArmedIconDrawing, ArmedIconName, ArmedIconPart, ArmedIconProps };
