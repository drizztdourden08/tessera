/* @layer stories @kind hook */
import { useState } from 'react';
import type { ReorderItem } from '../../../src/composites';
import { moveInList } from './move-in-list';

const useLayers = (initial: readonly ReorderItem[]) => {
  const [layers, setLayers] = useState(initial);
  const [selectedId, setSelectedId] = useState(initial[0]?.id);
  return {
    layers,
    selectedId,
    select: setSelectedId,
    move: (from: number, to: number) => setLayers((list) => moveInList(list, from, to)),
    toggle: (itemId: string, toggleId: string, next: boolean) => setLayers((list) => list.map((layer) => (
      layer.id === itemId ? { ...layer, toggles: { ...layer.toggles, [toggleId]: next } } : layer
    ))),
  };
};

export { useLayers };
