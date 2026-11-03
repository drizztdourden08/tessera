/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';
import type { HoveredCell, HoveredCellParams } from '../PixelPlayer.type';
import { cellAt } from './cell-at';

const useHoveredCell = (params: HoveredCellParams): HoveredCell => {
  const { cells, zoom, canvasRef, onCellHover } = params;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const report = useCallback((id: string | null) => {
    if (id === hoveredId) return;
    setHoveredId(id);
    onCellHover?.(id);
  }, [hoveredId, onCellHover]);
  const onPointerMove = useCallback((event: { clientX: number; clientY: number }) => {
    const box = canvasRef.current?.getBoundingClientRect();
    if (!box || cells.length === 0) return;
    report(cellAt(cells, (event.clientX - box.left) / zoom, (event.clientY - box.top) / zoom)?.id ?? null);
  }, [canvasRef, cells, zoom, report]);
  const onPointerLeave = useCallback(() => report(null), [report]);
  return { cell: cells.find((cell) => cell.id === hoveredId) ?? null, onPointerMove, onPointerLeave };
};

export { useHoveredCell };
