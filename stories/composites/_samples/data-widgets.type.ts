/* @layer stories @kind types */
import type { WidgetDefinition } from '../../../src/composites';

type DemoContext = 'session' | 'race';

interface DemoWidgetDefinition extends WidgetDefinition {
  context?: DemoContext;
}

export type { DemoContext, DemoWidgetDefinition };
