/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { Card } from '../../primitives/Card';
import { Text } from '../../primitives/Text';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { RecordHeader } from '../RecordHeader';
import { useOpenState } from '../ViewControls/behavior/useOpenState';
import { recordCardChevron } from './behavior/record-card-chevron';
import { recordCardClass } from './behavior/record-card-class';
import type { RecordCardProps } from './RecordCard.type';
import './RecordCard.css';

const RecordCard = (props: RecordCardProps) => {
  const { title, icon, code, content, menu, children, open, defaultOpen = false, onOpenChange, density = 'card', className, name, edge, edgeTone, variant, fill, 'aria-label': label } = props;
  const { navigation } = useTesseraStrings();
  const state = useOpenState(open, defaultOpen, onOpenChange);
  const bodyId = useId();
  const expandable = children != null && children !== false;
  const expanded = expandable && state.open;
  const named = { expand: navigation.expandItemNamed, collapse: navigation.collapseItemNamed };
  const chevron = recordCardChevron({ expandable, expanded, bodyId, name: name ?? label, named, onToggle: () => state.setOpen(!state.open) });

  return (
    <Card flush fill={fill} variant={variant} edge={edge} edgeTone={edgeTone} className={recordCardClass(density, className)} aria-label={label} role={label ? 'group' : undefined}>
      <Box className="record-card__inner">
        <RecordHeader title={expanded ? undefined : title} icon={icon} code={code} content={content} menu={menu} density={density} chevron={chevron} />
        {expanded && (
          <Box id={bodyId} className="record-card__body">
            <Text variant="label">{title}</Text>
            {children}
          </Box>
        )}
      </Box>
    </Card>
  );
};

export { RecordCard };
