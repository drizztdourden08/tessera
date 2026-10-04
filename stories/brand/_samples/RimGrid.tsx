/* @layer stories @kind component */
import { BRAND_APPS } from '../../../src/brand';
import { RIM_COLUMNS } from './RimGrid.constants';
import type { RimGridProps } from './RimGrid.type';
import { VariantGroups } from './VariantGroups';

const RimGrid = (props: RimGridProps) => {
  const { draw, min } = props;
  const groups = BRAND_APPS.map((app) => ({
    key: app,
    label: app,
    items: RIM_COLUMNS.map((column) => ({ key: column.key, label: column.label, ground: column.ground, node: draw(app, column.rim) })),
  }));
  return <VariantGroups groups={groups} min={min} rowsOf={3} />;
};

export { RimGrid };
