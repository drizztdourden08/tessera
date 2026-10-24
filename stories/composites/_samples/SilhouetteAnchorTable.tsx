/* @layer stories @kind component */
import { CONTROLLER_SILHOUETTE_ANCHORS } from '../../../src/composites';
import type { ControllerSilhouetteAnchorId, ControllerSilhouetteVariant } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';

interface SilhouetteAnchorTableProps {
  variant: ControllerSilhouetteVariant;
}

const SilhouetteAnchorTable = ({ variant }: SilhouetteAnchorTableProps) => {
  const anchors = CONTROLLER_SILHOUETTE_ANCHORS[variant];
  const ids = Object.keys(anchors) as ControllerSilhouetteAnchorId[];

  return (
    <Box className="silhouette-table">
      {ids.map((id) => {
        const anchor = anchors[id];
        if (!anchor) return null;
        const radius = anchor.r ? `, r ${anchor.r}` : '';
        return <Text key={id} className="silhouette-table__row">{`${id}: ${anchor.x}, ${anchor.y}${radius}`}</Text>;
      })}
    </Box>
  );
};

export { SilhouetteAnchorTable };
