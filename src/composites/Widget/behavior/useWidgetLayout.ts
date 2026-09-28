/* @layer renderer-components @kind hook */
import { useState, useCallback, useEffect, useRef } from 'react';
import type { WidgetDefinition, WidgetLayout, WidgetState } from '../Widget.type';
import { createDefaultWidgetState } from './create-default-widget-state';
import { getWidgetDefinition } from './get-widget-definition';
import { loadLayoutForProfile } from './load-layout-for-profile';
import { loadLayoutLocal } from './load-layout-local';
import { saveLayoutForProfile } from './save-layout-for-profile';
import { saveLayoutLocal } from './save-layout-local';
import { startingLayout } from './starting-layout';
import { updateWidget } from './update-widget';
import type { UseWidgetLayoutParams } from './useWidgetLayout.type';

const applyStartupWidgets = (layout: WidgetLayout, ids: string[], definitions: readonly WidgetDefinition[]): WidgetLayout => {
  if (ids.length === 0) return layout;
  return {
    widgets: layout.widgets.map((w) => (ids.includes(w.id)
      ? { ...w, visible: true, mode: 'docked', exclusive: true, side: getWidgetDefinition(definitions, w.id)?.defaultSide ?? w.side }
      : w)),
  };
};

const useWidgetLayout = (params: UseWidgetLayoutParams) => {
  const { definitions, profileId, io, startup, storageKey, preset } = params;
  const [layout, setLayoutRaw] = useState<WidgetLayout>(() => {
    const base = startup?.fresh ? startingLayout(definitions, preset) : loadLayoutLocal(definitions, storageKey, preset);
    return applyStartupWidgets(base, startup?.widgets ?? [], definitions);
  });
  const presetRef = useRef(preset);
  presetRef.current = preset;
  const profileIdRef = useRef(profileId);
  profileIdRef.current = profileId;
  const ioRef = useRef(io);
  ioRef.current = io;
  const definitionsRef = useRef(definitions);
  definitionsRef.current = definitions;

  useEffect(() => {
    if (!profileId || startup?.fresh) return;
    const fallback = { storageKey, preset: presetRef.current };
    void loadLayoutForProfile(profileId, ioRef.current, definitionsRef.current, fallback).then((loaded) => {
      const next = applyStartupWidgets(loaded, startup?.widgets ?? [], definitionsRef.current);
      setLayoutRaw(next);
      saveLayoutLocal(next, storageKey);
    });
  }, [profileId]);

  const setLayout = useCallback((updater: (prev: WidgetLayout) => WidgetLayout) => {
    setLayoutRaw((prev) => {
      const next = updater(prev);
      if (startup?.fresh) return next;
      saveLayoutLocal(next, storageKey);
      if (profileIdRef.current) {
        void saveLayoutForProfile(profileIdRef.current, next, ioRef.current);
      }
      return next;
    });
  }, []);

  const update = useCallback((id: string, patch: Partial<WidgetState>) => {
    setLayout((prev) => updateWidget(prev, id, patch));
  }, [setLayout]);

  const close = useCallback((id: string) => {
    setLayout((prev) => updateWidget(prev, id, { visible: false }));
  }, [setLayout]);

  const open = useCallback((id: string) => {
    setLayout((prev) => updateWidget(prev, id, { visible: true }));
  }, [setLayout]);

  const toggle = useCallback((id: string) => {
    setLayout((prev) => {
      const w = prev.widgets.find((x) => x.id === id);
      if (!w) {
        const def = getWidgetDefinition(definitionsRef.current, id);
        if (!def) return prev;
        return { widgets: [...prev.widgets, { ...createDefaultWidgetState(def, prev.widgets.length), visible: true }] };
      }
      return updateWidget(prev, id, { visible: !w.visible });
    });
  }, [setLayout]);

  const reset = useCallback(() => {
    setLayout(() => startingLayout(definitionsRef.current, presetRef.current));
  }, [setLayout]);

  return { layout, update, close, open, toggle, reset };
};

export { useWidgetLayout };
