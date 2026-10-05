/* @layer stories @kind types */
import type { RowGridDensity } from '../../../src/composites';

type StoryWidth = 'full' | '1024' | '768' | '512' | '384';

type RowSet = 'three' | 'six' | 'invalid' | 'none';

type RowGridArgs = {
  width: StoryWidth;
  rows: RowSet;
  density: RowGridDensity;
  numbered: boolean;
};

interface RowGridFrameProps {
  width: StoryWidth;
  rows?: RowSet;
  density?: RowGridDensity;
  numbered?: boolean;
}

export type { RowGridFrameProps, RowGridArgs, RowSet, StoryWidth };
