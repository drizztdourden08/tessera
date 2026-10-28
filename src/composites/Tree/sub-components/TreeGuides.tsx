/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import { guideOffset } from '../behavior/guide-offset';
import type { TreeGuidesProps } from './TreeGuides.type';

const TreeGuides = ({ ancestors, activeBranch }: TreeGuidesProps) => (
  <>
    {ancestors.map((key, level) => (
      <Span
        key={key}
        aria-hidden
        className={activeBranch.has(key) ? 'tree__guide tree__guide--active' : 'tree__guide'}
        style={{ insetInlineStart: guideOffset(level) }}
      />
    ))}
  </>
);

export { TreeGuides };
