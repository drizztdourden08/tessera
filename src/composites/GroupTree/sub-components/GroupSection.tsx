/* @layer renderer-components @kind component */
import { useState } from 'react';
import { Box, Glyph, Pressable, Text } from '../../../primitives';
import { MAX_DEPTH_CLASS } from './GroupSection.constants';
import type { GroupSectionProps } from './GroupSection.type';

const GroupSection = <T,>(props: GroupSectionProps<T>) => {
  const { node, depth, expandToDepth, renderItems, expandedKeys, onToggle } = props;
  const [localExpanded, setLocalExpanded] = useState(depth <= expandToDepth);
  const controlled = expandedKeys !== undefined;
  const expanded = controlled ? expandedKeys.has(node.key) : localExpanded;
  const toggle = () => {
    if (controlled) onToggle?.(node.key);
    else setLocalExpanded((v) => !v);
  };

  return (
    <Box className={`group-tree__group group-tree__group--depth-${Math.min(depth, MAX_DEPTH_CLASS)}`}>
      <Pressable className="group-tree__header focus-ring-inset" onClick={toggle} aria-expanded={expanded}>
        <Text className="group-tree__chevron"><Glyph name={expanded ? 'chevronDown' : 'chevronRight'} /></Text>
        <Text className="group-tree__name">{node.label}</Text>
        {node.meta !== undefined && <Text className="group-tree__meta">{node.meta}</Text>}
      </Pressable>
      {expanded && (
        <Box className="group-tree__content">
          {node.children.length > 0
            ? node.children.map((child) => (
              <GroupSection
                key={child.key}
                node={child}
                depth={depth + 1}
                expandToDepth={expandToDepth}
                renderItems={renderItems}
                expandedKeys={expandedKeys}
                onToggle={onToggle}
              />
            ))
            : renderItems(node.items)}
        </Box>
      )}
    </Box>
  );
};

export { GroupSection };
