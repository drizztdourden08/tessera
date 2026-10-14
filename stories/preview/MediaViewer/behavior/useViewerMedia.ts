/* @layer stories @kind hook */
import { useRef, useState } from 'react';
import { useCarouselIndex } from '../../Carousel/behavior/useCarouselIndex';
import type { MediaViewerProps, NaturalSize } from '../MediaViewer.type';
import { useFitScale } from './useFitScale';
import { useViewerKeys } from './useViewerKeys';
import { useZoom } from './useZoom';

type ViewerMediaParams = Pick<MediaViewerProps, 'open' | 'items' | 'index' | 'onIndexChange'> & { defaultIndex: number };

const useViewerMedia = ({ open, items, index, defaultIndex, onIndexChange }: ViewerMediaParams) => {
  const stageRef = useRef<HTMLElement>(null);
  const { current, go } = useCarouselIndex(items.length, index, defaultIndex, onIndexChange);
  const item = items.at(current);
  const id = item?.id ?? '';
  const [measured, setMeasured] = useState<{ id: string; size: NaturalSize } | null>(null);
  const natural = measured?.id === id ? measured.size : null;
  const zoom = useZoom(stageRef, useFitScale(stageRef, natural, open), id);
  const step = (by: number) => { if (items.length > 1) go(current + by); };
  useViewerKeys(stageRef, open, zoom, step);
  return { stageRef, current, item, natural, zoom, step, measure: (size: NaturalSize) => setMeasured({ id, size }) };
};

export { useViewerMedia };
