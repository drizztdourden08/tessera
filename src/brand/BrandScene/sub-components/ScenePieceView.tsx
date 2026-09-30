/* @layer renderer-components @kind component */
import { Svg, SvgGroup } from '../../../primitives/Svg';
import { BrandPaths } from '../../BrandPaths';
import { turnTransform } from '../../scene/turn-transform';
import type { ScenePieceViewProps } from './ScenePieceView.type';

const ScenePieceView = (props: ScenePieceViewProps) => {
  const { node } = props;
  const { piece } = node;
  return (
    <SvgGroup transform={turnTransform(node)}>
      <Svg width={node.width} height={node.height} viewBox={`0 0 ${piece.w} ${piece.h}`} preserveAspectRatio="none" overflow="visible">
        <BrandPaths paths={piece.paths} />
      </Svg>
    </SvgGroup>
  );
};

export { ScenePieceView };
