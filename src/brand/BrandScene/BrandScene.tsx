/* @layer renderer-components @kind component */
import { Svg } from '../../primitives/Svg';
import { markLabelProps } from '../BrandMark/behavior/mark-label-props';
import type { BrandSceneProps } from './BrandScene.type';
import { SceneNodeView } from './sub-components/SceneNodeView';
import './BrandScene.css';

const BrandScene = (props: BrandSceneProps) => {
  const { scene, scale, title = '', className = '', ref } = props;
  const { width, height, nodes } = scene;
  return (
    <Svg
      ref={ref}
      className={['brand-scene', className].filter(Boolean).join(' ')}
      viewBox={`0 0 ${width} ${height}`}
      width={scale === undefined ? undefined : width * scale}
      height={scale === undefined ? undefined : height * scale}
      shapeRendering={scene.smooth ? undefined : 'crispEdges'}
      {...markLabelProps(title)}
    >
      {nodes.map((node, i) => <SceneNodeView key={`${node.label}-${i}`} node={node} />)}
    </Svg>
  );
};

export { BrandScene };
