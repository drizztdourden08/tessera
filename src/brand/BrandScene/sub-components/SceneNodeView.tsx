/* @layer renderer-components @kind component */
import { useId } from 'react';
import { SvgClipPath, SvgGroup, SvgPolygon } from '../../../primitives/Svg';
import { turnTransform } from '../../scene/turn-transform';
import { ScenePieceView } from './ScenePieceView';
import type { SceneNodeViewProps } from './SceneNodeView.type';

const SceneNodeView = (props: SceneNodeViewProps) => {
  const { node } = props;
  const clipId = `scene-clip-${useId().replace(/[^\w-]/g, '')}`;
  if (node.kind === 'piece') return <ScenePieceView node={node} />;
  const { clip, turn, children } = node;
  return (
    <>
      {clip && (
        <SvgClipPath id={clipId}>
          <SvgPolygon points={clip.map((p) => p.join(',')).join(' ')} />
        </SvgClipPath>
      )}
      <SvgGroup transform={turn && turnTransform(turn)} clipPath={clip && `url(#${clipId})`}>
        {children.map((child, i) => <SceneNodeView key={`${child.label}-${i}`} node={child} />)}
      </SvgGroup>
    </>
  );
};

export { SceneNodeView };
