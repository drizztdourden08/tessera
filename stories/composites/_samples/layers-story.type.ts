/* @layer stories @kind types */
type LayerSet = 'six' | 'forty' | 'none';

type LayersArgs = {
  layers: LayerSet;
  toggles: boolean;
};

interface LayersListProps {
  layers?: LayerSet;
  toggles?: boolean;
  tall?: boolean;
}

export type { LayerSet, LayersArgs, LayersListProps };
