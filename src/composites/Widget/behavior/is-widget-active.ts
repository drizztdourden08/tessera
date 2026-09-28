/* @layer renderer-components @kind logic */
import type { WidgetState } from '../Widget.type';
import { getWidgetDefinition } from './get-widget-definition';
import type { WidgetActivityContext } from './is-widget-active.type';

const contextAllows = (w: WidgetState, ctx: WidgetActivityContext, forced: boolean): boolean => {
  if (w.visibility !== 'context-only') return true;
  if (ctx.pageOpen) return false;
  return ctx.contextActive || forced;
};

const devAllows = (w: WidgetState, ctx: WidgetActivityContext, forced: boolean): boolean =>
  !getWidgetDefinition(ctx.definitions, w.id)?.devOnly || ctx.developerToolsEnabled || forced;

const isWidgetActive = (w: WidgetState, ctx: WidgetActivityContext): boolean => {
  if (!w.visible) return false;
  const forced = ctx.forcedIds.includes(w.id);
  return contextAllows(w, ctx, forced) && devAllows(w, ctx, forced);
};

export { isWidgetActive };
