/* @layer stories @kind types */
import type { RowGridDensity } from '../RowGrid.type';

type StoryWidth = 'full' | '1024' | '768' | '512' | '384';

type RowSet = 'three' | 'six' | 'invalid' | 'none';

type RowGridArgs = {
  width: StoryWidth;
  rows: RowSet;
  density: RowGridDensity;
  numbered: boolean;
};

interface FramedGridProps {
  width: StoryWidth;
  rows?: RowSet;
  density?: RowGridDensity;
  numbered?: boolean;
}

export type { FramedGridProps, RowGridArgs, RowSet, StoryWidth };
