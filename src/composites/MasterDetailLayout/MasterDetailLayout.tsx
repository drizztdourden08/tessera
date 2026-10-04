/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { SplitDivider } from '../SplitPane/sub-components/SplitDivider';
import { layoutClass } from './behavior/layout-class';
import { layoutOptionsOf } from './behavior/layout-options-of';
import { useListWidth } from './behavior/useListWidth';
import { MasterDetailBack } from './sub-components/MasterDetailBack';
import type { MasterDetailLayoutProps } from './MasterDetailLayout.type';
import './MasterDetailLayout.css';

const MasterDetailLayout = (props: MasterDetailLayoutProps) => {
  const { list, detail, detailEmpty = false, onBack, className } = props;
  const { navigation } = useTesseraStrings();
  const { width: limits, view, resizable } = layoutOptionsOf(props);
  const { width, dragging, handlers } = useListWidth(limits);
  const columns = resizable ? `${width}px auto minmax(0, 1fr)` : `${width}px minmax(0, 1fr)`;

  return (
    <Box className={layoutClass(resizable, dragging, className)}>
      <Box className="master-detail__panes" data-view={view} style={{ gridTemplateColumns: columns }}>
        <Box className="master-detail__list">{list}</Box>
        {resizable && (
          <SplitDivider
            collapsed="none"
            orientation="horizontal"
            value={width}
            valueRange={{ min: limits.min, max: limits.max }}
            startLabel={props.listLabel ?? navigation.listPane}
            endLabel={props.detailLabel ?? navigation.detailPane}
            handlers={handlers}
          />
        )}
        <Box className={`master-detail__detail${detailEmpty ? ' master-detail__detail--empty' : ''}`}>
          {onBack && !detailEmpty && <MasterDetailBack label={props.backLabel ?? navigation.back} onBack={onBack} />}
          {detail}
        </Box>
      </Box>
    </Box>
  );
};

export { MasterDetailLayout };
