/* @layer renderer-components @kind types */
import type { HTMLAttributes, ReactNode } from 'react';

type TileCorner = 'topStart' | 'topEnd' | 'bottomStart' | 'bottomEnd';

type TileCorners = Partial<Record<TileCorner, ReactNode>>;

interface TileProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  media: ReactNode;
  name?: ReactNode;
  corners?: TileCorners;
  selected?: boolean;
  focused?: boolean;
}

interface TileCornerSlotsProps {
  corners: TileCorners;
}

export type { TileCorner, TileCorners, TileCornerSlotsProps, TileProps };
