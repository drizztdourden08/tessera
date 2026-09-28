/* @layer renderer-components @kind types */
import type { WidgetDefinition } from '../Widget.type';

interface WidgetActivityContext {
  definitions: readonly WidgetDefinition[];
  contextActive: boolean;
  pageOpen: boolean;
  developerToolsEnabled: boolean;
  forcedIds: readonly string[];
}

export type { WidgetActivityContext };
