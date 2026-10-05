/* @layer stories @kind component */
import { ControlMenu, ControlMenuRow } from '../../../../src/composites';
import { SegmentedControl, Slider, Toggle } from '../../../../src/primitives';

interface LabOptions {
  walk: 'move' | 'move-wobble';
  autonomy: boolean;
  hideExtras: boolean;
  speed: number;
  height: number;
}

const times = (n: number): string => `${n.toFixed(2)}×`;

const StageLabOptions = (props: { value: LabOptions; onChange: (next: LabOptions) => void }) => {
  const { value, onChange } = props;
  const set = <K extends keyof LabOptions>(key: K) => (next: LabOptions[K]) => onChange({ ...value, [key]: next });
  return (
    <ControlMenu trigger={{ label: 'Stage options', icon: 'sliders-horizontal' }}>
      <ControlMenuRow label="Walk">
        <SegmentedControl size="sm" aria-label="Walk" value={value.walk} options={[{ value: 'move', label: 'move' }, { value: 'move-wobble', label: 'wobble' }]} onChange={set('walk')} />
      </ControlMenuRow>
      <ControlMenuRow label="Autonomous">
        <Toggle size="sm" checked={value.autonomy} onChange={set('autonomy')} aria-label="Autonomous" />
      </ControlMenuRow>
      <ControlMenuRow label="Hide extras">
        <Toggle size="sm" checked={value.hideExtras} onChange={set('hideExtras')} aria-label="Hide extras" />
      </ControlMenuRow>
      <ControlMenuRow label="Speed">
        <Slider size="sm" aria-label="Speed" value={value.speed} min={0.1} max={3} step={0.05} showValue formatValue={times} onChange={set('speed')} />
      </ControlMenuRow>
      <ControlMenuRow label="Stage height">
        <Slider size="sm" aria-label="Stage height" value={value.height} min={80} max={320} step={10} showValue formatValue={(n) => `${n} px`} onChange={set('height')} />
      </ControlMenuRow>
    </ControlMenu>
  );
};

export { StageLabOptions };
export type { LabOptions };
