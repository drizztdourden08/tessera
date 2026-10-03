/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import { guideOffset } from '../behavior/guide-offset';
import type { GroupTreeGuidesProps } from './GroupTreeGuides.type';

const GroupTreeGuides = ({ ancestors, activeBranch }: GroupTreeGuidesProps) => (
  <>
    {ancestors.map((key, level) => (
      <Span
        key={key}
        aria-hidden
        className={activeBranch.has(key) ? 'group-tree__guide group-tree__guide--active' : 'group-tree__guide'}
        style={{ insetInlineStart: guideOffset(level) }}
      />
    ))}
  </>
);

export { GroupTreeGuides };
