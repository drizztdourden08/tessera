/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { controllerGeometry } from './behavior/controller-geometry';
import { fallbackRows, heldLines, placedIds } from './behavior/controller-rows';
import { tagSource } from './behavior/tag-source';
import { ControllerHeld } from './sub-components/ControllerHeld';
import { ControllerRows } from './sub-components/ControllerRows';
import { ControllerSilhouette } from './sub-components/ControllerSilhouette';
import { ControllerTag } from './sub-components/ControllerTag';
import type { ControllerExtra, ControllerLayoutProps } from './ControllerLayout.type';
import './ControllerLayout.css';

const NO_EXTRAS: readonly ControllerExtra[] = [];

const ControllerLayout = (props: ControllerLayoutProps) => {
  const { variant, slots, extras = NO_EXTRAS, label, className = '' } = props;
  const { controller } = useTesseraStrings();
  const geometry = controllerGeometry(variant);
  const placed = useMemo(() => placedIds(geometry), [geometry]);
  const rows = fallbackRows(slots, placed, extras, controller);

  return (
    <Box
      as="figure"
      aria-label={label ?? controller.controller}
      className={`controller-layout${className ? ` ${className}` : ''}`}
      data-variant={variant}
    >
      <Box className="controller-layout__stage">
        <ControllerSilhouette geometry={geometry} slots={slots} />
        <Box className="controller-layout__tags" aria-hidden="true">
          {geometry.places.map((place) => {
            const source = tagSource(place, slots);
            return <ControllerTag key={place.id} place={place} state={source.state} active={source.active} />;
          })}
        </Box>
      </Box>
      <ControllerHeld lines={heldLines(slots, extras, controller)} label={controller.held} empty={controller.nothingHeld} />
      <ControllerRows rows={rows} label={controller.otherInputs} />
    </Box>
  );
};

export { ControllerLayout };
