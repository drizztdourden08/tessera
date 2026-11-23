/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { Card } from '../../primitives/Card';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useOpenState } from '../ViewControls/behavior/useOpenState';
import { recordCardChevron } from './behavior/record-card-chevron';
import { recordCardClass } from './behavior/record-card-class';
import type { RecordCardProps } from './RecordCard.type';
import { RecordCardInner } from './sub-components/RecordCardInner';
import './RecordCard.css';

const RecordCard = (props: RecordCardProps) => {
  const { title, icon, code, content, end, menu, children, open, defaultOpen, onOpenChange, chevronOnIcon, className, name, edge, edgeTone, variant, fill, 'aria-label': label } = props;
  const { navigation } = useTesseraStrings();
  const state = useOpenState(open, defaultOpen === true, onOpenChange);
  const density = props.density ?? 'card';
  const bodyId = useId();
  const expandable = children != null && children !== false;
  const expanded = expandable && state.open;
  const named = { expand: navigation.expandItemNamed, collapse: navigation.collapseItemNamed };
  const chevron = recordCardChevron({ expandable, expanded, bodyId, name: name ?? label, named, onToggle: () => state.setOpen(!state.open) });

  return (
    <Card flush fill={fill} variant={variant} edge={edge} edgeTone={edgeTone} className={recordCardClass(density, className)} aria-label={label} role={label ? 'group' : undefined}>
      <Box className="record-card__inner">
        <RecordCardInner density={density} expanded={expanded} bodyId={bodyId} chevron={chevron} title={title} icon={icon} code={code} content={content} end={end} menu={menu} chevronOnIcon={chevronOnIcon}>
          {children}
        </RecordCardInner>
      </Box>
    </Card>
  );
};

export { RecordCard };
