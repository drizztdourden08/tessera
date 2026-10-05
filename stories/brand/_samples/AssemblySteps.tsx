/* @layer stories @kind component */
import { BrandScene } from '../../../src/brand/BrandScene';
import type { BrandSceneData } from '../../../src/brand';
import { Demonstrator } from '../../_template/Demonstrator';
import { BREAKDOWN_SCALE } from './mascot-brands.constants';

interface AssemblyStepsProps {
  scene: BrandSceneData;
}

const COLUMNS = [{ key: 'step', label: 'This step' }, { key: 'sofar', label: 'So far' }] as const;

const AssemblySteps = (props: AssemblyStepsProps) => {
  const { scene } = props;
  const steps = scene.nodes.map((node, i) => ({ key: String(i), label: `${i + 1}. ${node.label}` }));
  return (
    <Demonstrator
      rows={steps}
      columns={COLUMNS}
      cell={(key, column) => {
        const at = Number(key);
        const nodes = column === 'step' ? scene.nodes.slice(at, at + 1) : scene.nodes.slice(0, at + 1);
        return <BrandScene scene={{ ...scene, nodes }} scale={BREAKDOWN_SCALE.scene} className="mascot-breakdown__frame" />;
      }}
    />
  );
};

export { AssemblySteps };
