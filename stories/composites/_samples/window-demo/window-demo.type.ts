/* @layer stories @kind types */
import type { ReactNode } from 'react';

type WindowArgs = {
  title: string;
  subtitle: string;
  withExtra: boolean;
  withFloating: boolean;
  withHeader: boolean;
  withBack: boolean;
  titleRow: boolean;
  withIcon: boolean;
  cornerTitle: boolean;
  movable: boolean;
  square: boolean;
  phone?: boolean;
};

type WindowTop = { withHeader: boolean; players: boolean; subtitle: string; extra: ReactNode; goBack?: () => void };

interface WindowListProps {
  players: boolean;
  padded: boolean;
}

export type { WindowArgs, WindowListProps, WindowTop };
