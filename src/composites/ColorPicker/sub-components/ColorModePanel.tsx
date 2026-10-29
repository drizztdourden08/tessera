/* @layer renderer-components @kind component */
import { HsvPanel } from './HsvPanel';
import type { ModeSwitchProps } from './ModePanel.type';
import { OklchPanel } from './OklchPanel';
import { RgbPanel } from './RgbPanel';

const ColorModePanel = ({ mode, ...panel }: ModeSwitchProps) => {
  if (mode === 'oklch') return <OklchPanel {...panel} />;
  if (mode === 'rgb') return <RgbPanel {...panel} />;
  return <HsvPanel {...panel} />;
};

export { ColorModePanel };
