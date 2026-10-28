/* @layer renderer-components @kind component */
import { useState } from 'react';
import { Box } from '../../primitives/Box';
import { Pressable } from '../../primitives/Pressable';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { foldSegments } from './behavior/fold-segments';
import { pathTextOf } from './behavior/path-text-of';
import { useSegmentDrop } from './behavior/useSegmentDrop';
import { BreadcrumbEdit } from './sub-components/BreadcrumbEdit';
import { BreadcrumbItem } from './sub-components/BreadcrumbItem';
import { BreadcrumbOverflow } from './sub-components/BreadcrumbOverflow';
import type { BreadcrumbsProps } from './Breadcrumbs.type';
import './Breadcrumbs.css';

const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { segments, onNavigate, maxVisible, onDropOn, canDrop, path, onPathSubmit, trailing, label, className } = props;
  const { navigation } = useTesseraStrings();
  const [editing, setEditing] = useState(false);
  const drop = useSegmentDrop(onDropOn, canDrop);
  const { head, hidden, tail } = foldSegments(segments, maxVisible);
  const lastId = segments[segments.length - 1]?.id;
  const item = (segment: (typeof segments)[number], first: boolean) => (
    <BreadcrumbItem key={segment.id} segment={segment} current={segment.id === lastId} first={first} drop={drop} onNavigate={onNavigate} />
  );

  if (editing && onPathSubmit !== undefined) {
    const finish = (): void => setEditing(false);
    return (
      <Box as="nav" aria-label={label ?? navigation.breadcrumbs} className={['breadcrumbs', 'breadcrumbs--editing', className].filter(Boolean).join(' ')}>
        <BreadcrumbEdit initial={pathTextOf(segments, path)} onSubmit={(next) => { finish(); onPathSubmit(next); }} onCancel={finish} />
      </Box>
    );
  }

  return (
    <Box as="nav" aria-label={label ?? navigation.breadcrumbs} className={['breadcrumbs', className].filter(Boolean).join(' ')}>
      <Box as="ol" className="breadcrumbs__trail">
        {head.map((segment, at) => item(segment, at === 0))}
        {hidden.length > 0 && <BreadcrumbOverflow hidden={hidden} onNavigate={onNavigate} />}
        {tail.map((segment) => item(segment, false))}
      </Box>
      {onPathSubmit !== undefined && (
        <Pressable className="breadcrumbs__fill focus-ring-inset" aria-label={navigation.editPath} title={navigation.editPath} onClick={() => setEditing(true)} />
      )}
      {trailing !== undefined && <Box className="breadcrumbs__trailing">{trailing}</Box>}
    </Box>
  );
};

export { Breadcrumbs };
