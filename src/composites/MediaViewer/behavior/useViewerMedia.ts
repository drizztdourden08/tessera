/* @layer renderer-components @kind hook */
import { useRef, useState } from 'react';
import { useCarouselIndex } from '../../Carousel/behavior/useCarouselIndex';
import type { NaturalSize, ViewerMedia, ViewerMediaParams } from '../MediaViewer.type';
import { useFitScale } from './useFitScale';
import { useViewerKeys } from './useViewerKeys';
import { useZoom } from './useZoom';

const useViewerMedia = ({ open, items, index, defaultIndex, onIndexChange }: ViewerMediaParams): ViewerMedia => {
  const stageRef = useRef<HTMLElement>(null);
  const { current, go } = useCarouselIndex(items.length, index, defaultIndex, onIndexChange);
  const item = items.at(current);
  const id = item?.id ?? '';
  const [measured, setMeasured] = useState<{ id: string; size: NaturalSize } | null>(null);
  const natural = measured?.id === id ? measured.size : null;
  const zoom = useZoom(stageRef, useFitScale(stageRef, natural, open), id);
  const step = (by: number) => go(current + by);
  useViewerKeys(stageRef, open, item?.kind === 'image' ? zoom : null, step);
  return { stageRef, current, item, natural, zoom, step, measure: (size: NaturalSize) => setMeasured({ id, size }) };
};

export { useViewerMedia };
