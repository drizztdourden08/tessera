/* @layer renderer-components @kind types */
import type { RenderContext } from '../behavior/renderers.type';

interface SettingsColorProps extends RenderContext {
  value: string;
  onChange: (value: string) => void;
}

export type { SettingsColorProps };
