/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { WidgetLayout } from '../Widget.type';
import { createDefaultLayout } from './create-default-layout';
import { loadLayoutForProfile } from './load-layout-for-profile';
import { loadLayoutLocal } from './load-layout-local';
import { openStartupWidgets } from './open-startup-widgets';
import { saveLayoutForProfile } from './save-layout-for-profile';
import { saveLayoutLocal } from './save-layout-local';
import type { LayoutUpdater, UseWidgetLayoutParams } from './useWidgetLayout.type';

const usePersistedLayout = (params: UseWidgetLayoutParams) => {
  const { definitions, profileId, io, startup, storageKey, preset } = params;
  const fresh = startup?.fresh ?? false;
  const forced = startup?.widgets;
  const [layout, setLayoutRaw] = useState<WidgetLayout>(() => {
    const base = fresh ? preset ?? createDefaultLayout() : loadLayoutLocal(storageKey, preset);
    return openStartupWidgets(base, forced ?? [], definitions);
  });
  const latest = useRef({ definitions, profileId, io, preset, forced });
  latest.current = { definitions, profileId, io, preset, forced };

  useEffect(() => {
    if (!profileId || fresh) return;
    const { io: store, preset: fallback } = latest.current;
    void loadLayoutForProfile(profileId, store, { storageKey, preset: fallback }).then((loaded) => {
      const next = openStartupWidgets(loaded, latest.current.forced ?? [], latest.current.definitions);
      setLayoutRaw(next);
      saveLayoutLocal(next, storageKey);
    });
  }, [profileId, fresh, storageKey]);

  const change = useCallback((updater: LayoutUpdater) => {
    setLayoutRaw((prev) => {
      const next = updater(prev);
      if (fresh || next === prev) return next;
      saveLayoutLocal(next, storageKey);
      const { profileId: id, io: store } = latest.current;
      if (id) void saveLayoutForProfile(id, next, store);
      return next;
    });
  }, [fresh, storageKey]);

  return { layout, change, latest };
};

export { usePersistedLayout };
