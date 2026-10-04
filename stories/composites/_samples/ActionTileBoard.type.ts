/* @layer stories @kind types */
type ActionTileSet = 'session' | 'storage' | 'small';

interface ActionTileBoardProps {
  set: ActionTileSet;
}

export type { ActionTileBoardProps, ActionTileSet };
