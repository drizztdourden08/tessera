/* @layer renderer-components @kind component */
import { SvgFeColorMatrix, SvgFeGaussianBlur, SvgFilter } from '../../../primitives/Svg';
import { GOO_COLOURS, GOO_MATRIX, GOO_REGION } from '../../scene/goo.constants';
import type { SceneGooFilterProps } from './SceneGooFilter.type';

const SceneGooFilter = (props: SceneGooFilterProps) => {
  const { id, blur } = props;
  return (
    <SvgFilter id={id} {...GOO_REGION} colorInterpolationFilters={GOO_COLOURS}>
      <SvgFeGaussianBlur stdDeviation={blur} />
      <SvgFeColorMatrix values={GOO_MATRIX} />
    </SvgFilter>
  );
};

export { SceneGooFilter };
