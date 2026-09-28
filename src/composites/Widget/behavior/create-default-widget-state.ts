/* @layer renderer-components @kind logic */
import type { WidgetDefinition, WidgetState } from '../Widget.type';

const createDefaultWidgetState = (def: WidgetDefinition, order = 0): WidgetState => {
  return {
    id: def.id,
    mode: 'docked',
    side: def.defaultSide,
    order,
    opacity: 0.92,
    visibility: def.defaultVisibility,
    visible: false,
    x: 100 + order * 30,
    y: 100 + order * 30,
    width: def.defaultFloatingSize.width,
    height: def.defaultFloatingSize.height,
    dockedSize: def.defaultDockedSize,
    exclusive: false,
  };
};

export { createDefaultWidgetState };
