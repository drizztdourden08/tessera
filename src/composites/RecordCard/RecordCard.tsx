/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { Card } from '../../primitives/Card';
import { Text } from '../../primitives/Text';
import { useOpenState } from '../ViewControls/behavior/useOpenState';
import { recordCardClass } from './behavior/record-card-class';
import type { RecordCardProps } from './RecordCard.type';
import { RecordCardHeader } from './sub-components/RecordCardHeader';
import './RecordCard.css';

const RecordCard = (props: RecordCardProps) => {
  const { title, icon, code, content, menu, children, open, defaultOpen = false, onOpenChange, density = 'card', className, 'aria-label': label } = props;
  const state = useOpenState(open, defaultOpen, onOpenChange);
  const bodyId = useId();
  const expandable = children != null && children !== false;
  const expanded = expandable && state.open;

  return (
    <Card flush className={recordCardClass(density, className)} aria-label={label} role={label ? 'group' : undefined}>
      <Box className="record-card__inner">
        <RecordCardHeader title={title} icon={icon} code={code} content={content} menu={menu} expandable={expandable} expanded={expanded} bodyId={bodyId} onToggle={() => state.setOpen(!state.open)} />
        {expandable && (
          <Box id={bodyId} className="record-card__body" hidden={!expanded}>
            <Text variant="label">{title}</Text>
            {children}
          </Box>
        )}
      </Box>
    </Card>
  );
};

export { RecordCard };
